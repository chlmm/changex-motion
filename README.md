# changex-motion-ts

基于 Remotion + Three.js 的交互式教程视频制作项目，可生成编程教程、教育视频等内容。

## 特性

- 🎬 基于 Remotion 视频框架
- 🌲 支持 3D 场景渲染（Three.js）
- 📚 交互式终端教程（Git、Docker）
- 🌿 教育视频（光合作用等）
- 👤 人物角色系统与动画
- ✨ 粒子和魔法特效
- 📦 开箱即用的预设组件

## 技术栈

| 技术 | 用途 |
|------|------|
| Remotion | React 视频框架 |
| Three.js | 3D 渲染引擎 |
| @react-three/fiber | React Three.js 绑定 |
| @react-three/drei | Three.js 辅助组件 |
| TypeScript | 类型安全 |

## 项目结构

```
src/
├── index.ts                      # 入口文件
├── Root.tsx                      # Remotion 入口，注册所有 Composition
├── base/                         # 基础组件
│   ├── 2d/                       # 2D 组件（TerminalUI 等）
│   └── 3d/                       # 3D 组件（Character、Environment 等）
├── scenes/
│   ├── tutorials/                # 教程视频
│   │   ├── GitTutorial/          # Git 教程
│   │   ├── DockerTutorial/       # Docker 教程
│   │   └── Photosynthesis/       # 光合作用教育视频
│   ├── demos/                    # 演示场景
│   └── characters/               # 人物场景
└── utils/
    └── animations.ts             # 动画工具函数

public/
└── models/                       # 3D 模型文件（GLB）
```

## 快速开始

```bash
# 安装依赖
npm install

# 启动 Remotion Studio（实时预览）
npm run start

# 渲染视频
npm run build
```

## 视频列表

### 教育视频

| 视频 | 时长 | 描述 |
|------|------|------|
| Photosynthesis | 25秒 | 光合作用生物教学视频 |
| GitTutorial | ~2分钟 | Git 命令行教程 |
| DockerTutorial | ~78秒 | Docker 入门教程 |

### 演示场景

| 视频 | 时长 | 描述 |
|------|------|------|
| Simple3D | 5秒 | 简单 3D 测试场景 |
| Scene3D | 10秒 | 完整 3D 场景 |
| ProceduralScene | 15秒 | 程序化生成场景 |
| CharacterScene | 10秒 | 人物角色展示 |

## 功能模块

### Git 教程

完整的 Git 命令行交互式教程，包含：
- 🎬 标题动画与 Git 简介
- 📦 初始化与基本命令
- 🌿 分支操作与管理
- 🔗 远程仓库操作
- 🔀 合并与冲突解决
- ⏪ 撤销与回退操作
- 📋 Stash、Tag、Rebase 等高级操作
- 💡 最佳实践建议

### Docker 教程

Docker 入门教程，包含：
- 🐳 Docker 鲸鱼动画标题
- 📦 镜像操作（pull、build、push）
- 📦 容器操作（run、exec、logs）
- 📝 Dockerfile 编写
- 🔗 Docker Compose 使用
- 🌐 网络管理
- 💾 数据卷管理
- 💡 最佳实践

### 光合作用教育视频

生物教学视频，包含：
- ⚗️ 化学方程式动态展示
- 🌿 叶绿体 3D 模型
- 🧬 分子动画（CO₂、H₂O、葡萄糖、O₂）
- 📊 光反应和暗反应解析

### 人物系统

- 可配置的人物模型（颜色、大小、位置）
- 预设角色：主角、女主、反派、NPC
- 动画状态：idle、walk、talk

## 命令说明

| 命令 | 说明 |
|------|------|
| `npm run start` | 启动 Remotion Studio 本地预览 |
| `npm run build` | 渲染 GitTutorial 视频 |
| `npm run build:photosynthesis` | 渲染光合作用视频 |

## 依赖管理

本项目使用 **npm** 作为包管理器。

```bash
# 安装依赖
npm install

# 添加新依赖
npm install <package>

# 添加开发依赖
npm install -D <package>
```

## 许可证

MIT
