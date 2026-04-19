# Asciinema 终端录制渲染方案

## 背景

项目需要在校程视频中展示终端操作场景（git、docker、vim 等）。当前的 `TerminalUI` 组件（`src/base/2d/TerminalUI.tsx`）是纯 React 模拟，通过逐行文本 + 打字动画实现，仅支持 `input/output/error` 三种行类型。

**痛点**：无法真实还原 TUI 程序（vim、htop、nano 等），因为 TUI 依赖光标定位、全屏重绘、ANSI 转义序列，手工模拟成本极高且不可扩展。

## 方案选型：asciinema 录制

使用 asciinema 录制真实终端操作，生成 `.cast` 文件，在 Remotion 中解析并渲染。

- `.cast` 文件本质是 JSONL，每行格式：`[timestamp, event_type, data]`
- `event_type`：`"o"` = 输出，`"i"` = 输入
- `data`：包含 ANSI 转义序列的原始字符流
- 录制命令：`asciinema rec demo.cast`

**覆盖范围**：任何标准终端中能运行的东西都能录制——命令行、全屏 TUI、彩色输出、进度条、光标定位。

## 渲染方案：双轨制

### 方案 A：ansi-to-html（轻量）

**原理**：ANSI 转义序列 → HTML `<span>` + inline style

**适用场景**：非交互/行式输出
- `git add .`、`git commit -m "xxx"`
- `docker build -t app .`
- `ls -la`、`npm install`
- `echo "hello"`

**判断标准**：输出不依赖光标定位重绘屏幕

**限制**：
- 不支持光标定位（`\x1b[H`），全屏 TUI 会渲染乱码
- 不理解终端状态，只是流式文本着色
- 覆盖约 90-95% 的常见 ANSI 序列

**性能**：~1-3ms/帧（万字符级），纯字符串操作，无状态

### 方案 B：xterm.js 离屏状态机（完整）

**原理**：利用 xterm.js 的 VT 状态机解析 ANSI，维护虚拟屏幕 buffer，自行渲染到 DOM

**适用场景**：全屏 TUI / 交互式
- `vim`、`nano`
- `htop`、`top`
- `less`、`more`
- 任何依赖光标定位重绘的程序

**判断标准**：输出依赖光标定位重绘屏幕

**性能**：~5-15ms/帧（无缓存），~2-5ms/帧（有快照缓存）

### 选择逻辑

```
终端输出是否依赖光标定位？
  ├── 否 → ansi-to-html
  └── 是 → xterm.js
```

**两个方案共存**，统一暴露相同组件接口，按场景选用。

## xterm.js 适配 Remotion 的核心设计

### 问题

xterm.js 设计上是实时交互组件，自己管理渲染循环（requestAnimationFrame）。但 Remotion 是帧驱动的——每帧必须确定性输出，同一帧号必须产出同一画面。

### 解法：离屏状态机

将 xterm.js 仅用作 **ANSI 状态机 + 虚拟 buffer**，不走它的自渲染循环：

1. 创建 xterm.js 实例，**不挂载到 DOM**
2. 维护"已喂到第几个 cast 事件"的指针
3. 每帧根据 `frame / fps` 计算目标时间
4. 将目标时间之前的 cast 事件喂入 xterm.js
5. 从 xterm.js 的内部 buffer（`_core.buffer`）读取虚拟屏幕内容
6. 将 buffer 内容转为自定义 DOM 渲染

```ts
// 伪代码
function getTerminalStateAtFrame(term: Terminal, cast: CastEvent[], frame: number, fps: number) {
  const targetTime = frame / fps;
  // 喂入 cast 数据到目标时间
  for (const event of cast) {
    if (event[0] > targetTime) break;
    if (event[1] === 'o') {
      term.write(event[2]);
    }
  }
  // 读取虚拟屏幕 buffer
  return readBuffer(term);
}
```

### 帧间重置问题

Remotion 支持随机帧访问（拖进度条、并行渲染），渲染第 N 帧时需要从头回放所有 cast 事件。

### 快照缓存优化

每 N 帧存一个 xterm.js buffer 快照，渲染时从最近快照恢复 + 增量回放：

```ts
const SNAP_INTERVAL = 50; // 每50帧存一个快照
const snapshotCache = new Map<number, SerializedBuffer>(); // frame → serialized buffer

function getTerminalAtFrame(frame: number, fps: number) {
  const snapFrame = Math.floor(frame / SNAP_INTERVAL) * SNAP_INTERVAL;

  // 从最近快照恢复
  const snapshot = snapshotCache.get(snapFrame);
  const term = restoreFromSnapshot(snapshot);

  // 增量回放 snapFrame → frame 之间的 cast 事件
  const startTime = snapFrame / fps;
  const targetTime = frame / fps;
  feedCastRange(term, cast, startTime, targetTime);

  return readBuffer(term);
}
```

## 组件架构

### 目录结构

```
src/base/2d/
├── TerminalUI.tsx              # 现有：纯展示组件（保留，简单场景继续用）
├── AsciinemaPlayer/            # 新增：asciinema 回放组件
│   ├── index.tsx               # 统一入口，根据模式分发
│   ├── AnsiToHtmlRenderer.tsx  # 方案 A 渲染器
│   ├── XtermRenderer.tsx       # 方案 B 渲染器
│   ├── parseCast.ts            # .cast 文件解析
│   ├── types.ts                # 类型定义
│   └── snapshotCache.ts        # 快照缓存（xterm.js 专用）
```

### 统一接口

```ts
interface AsciinemaPlayerProps {
  src: string;                  // .cast 文件路径
  mode?: 'auto' | 'ansi-html' | 'xterm';
  width?: number;
  height?: number;
  cols?: number;                // 终端列数（需与录制时一致）
  rows?: number;                // 终端行数
  theme?: 'dark' | 'light' | TerminalTheme;
  title?: string;
  frameOffset?: number;         // 帧偏移
  speed?: number;               // 播放速度倍数
}
```

- `mode: 'auto'` 时，解析 cast 内容，检测是否包含光标定位序列，自动选择渲染器
- `mode: 'ansi-html'` 强制使用 ansi-to-html
- `mode: 'xterm'` 强制使用 xterm.js

### 使用方式

```tsx
// 简单命令行场景
<AsciinemaPlayer src={gitAddCast} mode="ansi-html" />

// TUI 场景
<AsciinemaPlayer src={vimCast} mode="xterm" />

// 自动检测
<AsciinemaPlayer src={someCast} mode="auto" />
```

### 与现有 Terminal 组件的关系

- `TerminalUI` / `Terminal`（现有）：保留，用于**纯手工编排**的简单终端场景（无需录制）
- `AsciinemaPlayer`（新增）：用于**真实终端录制**回放场景

两者互不替代，按需选用。

## 录制工作流

1. 在真实终端中执行：`asciinema rec --cols=80 --rows=24 demo.cast`
2. 执行目标操作（git 命令、vim 编辑等）
3. `Ctrl+D` 或 `exit` 结束录制
4. 将 `.cast` 文件放入项目的 `public/` 或 `static/` 目录
5. 在 Remotion 组件中引用

**注意**：录制时务必指定 `--cols` 和 `--rows`，确保终端尺寸与回放一致。

## 实现优先级

1. **parseCast.ts** — .cast 文件解析器
2. **AnsiToHtmlRenderer.tsx** — 方案 A，快速可用，覆盖大部分非 TUI 场景
3. **XtermRenderer.tsx** — 方案 B，TUI 场景核心
4. **snapshotCache.ts** — 快照缓存，性能优化
5. **index.tsx** — 统一入口 + auto 模式检测
6. **TerminalTheme 适配** — 将 xterm.js 主题与项目现有主题系统对齐

## 依赖

- `ansi-to-html`：方案 A 渲染
- `@xterm/xterm`：方案 B 状态机（注意用新包名，不是旧版 `xterm`）
- `asciinema`：录制工具（开发时全局安装，非项目依赖）
