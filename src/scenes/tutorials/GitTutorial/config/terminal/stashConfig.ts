// git stash 暂存操作配置
import { RemotionTerminalLine } from '../../components/Terminal';

// 暂存当前修改
export const stashChanges: RemotionTerminalLine[] = [
  { type: 'input', content: 'git status', delay: 0 },
  { type: 'output', content: 'On branch main', delay: 15 },
  { type: 'output', content: 'Changes not staged for commit:', delay: 5 },
  { type: 'output', content: '  (use "git add <file>..." to update what will be committed)', delay: 3 },
  { type: 'output', content: '        modified:   src/index.js', delay: 3 },
  { type: 'input', content: 'git stash', delay: 30 },
  { type: 'output', content: 'Saved working directory and index state WIP on main: a1b2c3d Last commit', delay: 15 },
];

// 查看暂存列表
export const stashList: RemotionTerminalLine[] = [
  { type: 'input', content: 'git stash list', delay: 0 },
  { type: 'output', content: 'stash@{0}: WIP on main: a1b2c3d Last commit', delay: 15 },
  { type: 'output', content: 'stash@{1}: WIP on feature: d4e5f6g Feature work', delay: 5 },
];

// 恢复暂存
export const stashPop: RemotionTerminalLine[] = [
  { type: 'input', content: 'git stash pop', delay: 0 },
  { type: 'output', content: 'On branch main', delay: 15 },
  { type: 'output', content: 'Changes not staged for commit:', delay: 5 },
  { type: 'output', content: '  (use "git add <file>..." to update what will be committed)', delay: 3 },
  { type: 'output', content: '        modified:   src/index.js', delay: 3 },
  { type: 'output', content: '', delay: 2 },
  { type: 'output', content: 'Dropped stash@{0} (abc123def456)', delay: 3 },
];

// 应用暂存（保留 stash）
export const stashApply: RemotionTerminalLine[] = [
  { type: 'input', content: 'git stash apply', delay: 0 },
  { type: 'output', content: 'On branch main', delay: 15 },
  { type: 'output', content: 'Changes not staged for commit:', delay: 5 },
  { type: 'output', content: '        modified:   src/index.js', delay: 3 },
];
