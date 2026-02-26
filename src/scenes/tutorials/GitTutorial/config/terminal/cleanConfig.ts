// git clean 清理未跟踪文件配置
import { RemotionTerminalLine } from '../../components/Terminal';

// 预览将要删除的文件（干运行）
export const cleanDryRun: RemotionTerminalLine[] = [
  { type: 'input', content: 'git clean -n', delay: 0 },
  { type: 'output', content: 'Would remove debug.log', delay: 15 },
  { type: 'output', content: 'Would remove temp/', delay: 5 },
  { type: 'output', content: 'Would remove notes.txt', delay: 5 },
];

// 删除未跟踪的文件
export const cleanFiles: RemotionTerminalLine[] = [
  { type: 'input', content: 'git clean -f', delay: 0 },
  { type: 'output', content: 'Removing debug.log', delay: 15 },
  { type: 'output', content: 'Removing notes.txt', delay: 5 },
];

// 删除未跟踪的文件和目录
export const cleanDirectories: RemotionTerminalLine[] = [
  { type: 'input', content: 'git clean -fd', delay: 0 },
  { type: 'output', content: 'Removing debug.log', delay: 15 },
  { type: 'output', content: 'Removing temp/', delay: 5 },
  { type: 'output', content: 'Removing notes.txt', delay: 5 },
];

// 删除被忽略的文件
export const cleanIgnored: RemotionTerminalLine[] = [
  { type: 'input', content: 'git clean -fX', delay: 0 },
  { type: 'output', content: 'Removing .env', delay: 15 },
  { type: 'output', content: 'Removing node_modules/.cache/', delay: 5 },
  { type: 'output', content: 'Removing *.log', delay: 5 },
];

// 删除所有未跟踪文件（包括被忽略的）
export const cleanAll: RemotionTerminalLine[] = [
  { type: 'input', content: 'git clean -fdx', delay: 0 },
  { type: 'output', content: 'Removing debug.log', delay: 15 },
  { type: 'output', content: 'Removing .env', delay: 5 },
  { type: 'output', content: 'Removing temp/', delay: 5 },
  { type: 'output', content: 'Removing node_modules/', delay: 5 },
];

// 交互式清理
export const cleanInteractive: RemotionTerminalLine[] = [
  { type: 'input', content: 'git clean -i', delay: 0 },
  { type: 'output', content: 'Would remove the following items:', delay: 15 },
  { type: 'output', content: '  debug.log', delay: 5 },
  { type: 'output', content: '  temp/', delay: 5 },
  { type: 'output', content: '  notes.txt', delay: 5 },
  { type: 'output', content: '', delay: 2 },
  { type: 'output', content: '*** Commands ***', delay: 5 },
  { type: 'output', content: '    1: clean               2: filter by pattern', delay: 3 },
  { type: 'output', content: '    3: select by numbers   4: ask each', delay: 3 },
  { type: 'output', content: '    5: quit                6: help', delay: 3 },
  { type: 'output', content: 'What now> 1', delay: 10 },
  { type: 'output', content: 'Removing debug.log', delay: 5 },
  { type: 'output', content: 'Removing temp/', delay: 5 },
  { type: 'output', content: 'Removing notes.txt', delay: 5 },
];

// 仅清理特定路径
export const cleanPath: RemotionTerminalLine[] = [
  { type: 'input', content: 'git clean -fd temp/', delay: 0 },
  { type: 'output', content: 'Removing temp/cache/', delay: 15 },
  { type: 'output', content: 'Removing temp/build/', delay: 5 },
];

// 排除特定模式
export const cleanExclude: RemotionTerminalLine[] = [
  { type: 'input', content: 'git clean -fd -e "*.md"', delay: 0 },
  { type: 'output', content: 'Removing debug.log', delay: 15 },
  { type: 'output', content: 'Removing temp/', delay: 5 },
  { type: 'output', content: '# 注意: *.md 文件被保留', delay: 5 },
];

// 详细显示删除过程
export const cleanVerbose: RemotionTerminalLine[] = [
  { type: 'input', content: 'git clean -fdv', delay: 0 },
  { type: 'output', content: 'Removing debug.log', delay: 15 },
  { type: 'output', content: 'Removing temp/cache/file1.js', delay: 5 },
  { type: 'output', content: 'Removing temp/cache/file2.js', delay: 5 },
  { type: 'output', content: 'Removing notes.txt', delay: 5 },
];

// 清理前后的状态对比
export const cleanWorkflow: RemotionTerminalLine[] = [
  { type: 'input', content: 'git status', delay: 0 },
  { type: 'output', content: 'On branch main', delay: 15 },
  { type: 'output', content: 'Untracked files:', delay: 5 },
  { type: 'output', content: '  (use "git add <file>..." to include in what will be committed)', delay: 3 },
  { type: 'output', content: '        debug.log', delay: 3 },
  { type: 'output', content: '        temp/', delay: 3 },
  { type: 'input', content: 'git clean -fd', delay: 30 },
  { type: 'output', content: 'Removing debug.log', delay: 15 },
  { type: 'output', content: 'Removing temp/', delay: 5 },
  { type: 'input', content: 'git status', delay: 20 },
  { type: 'output', content: 'On branch main', delay: 15 },
  { type: 'output', content: 'nothing to commit, working tree clean', delay: 5 },
];
