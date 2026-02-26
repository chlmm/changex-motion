// git 撤销操作配置
import { RemotionTerminalLine } from '../../components/Terminal';

// 撤销工作区修改
export const restoreFile: RemotionTerminalLine[] = [
  { type: 'input', content: 'git status', delay: 0 },
  { type: 'output', content: 'On branch main', delay: 15 },
  { type: 'output', content: 'Changes not staged for commit:', delay: 5 },
  { type: 'output', content: '        modified:   src/index.js', delay: 3 },
  { type: 'input', content: 'git restore src/index.js', delay: 30 },
  { type: 'input', content: 'git status', delay: 20 },
  { type: 'output', content: 'On branch main', delay: 15 },
  { type: 'output', content: 'nothing to commit, working tree clean', delay: 5 },
];

// 撤销暂存
export const unstageFile: RemotionTerminalLine[] = [
  { type: 'input', content: 'git status', delay: 0 },
  { type: 'output', content: 'On branch main', delay: 15 },
  { type: 'output', content: 'Changes to be committed:', delay: 5 },
  { type: 'output', content: '        modified:   src/index.js', delay: 3 },
  { type: 'input', content: 'git restore --staged src/index.js', delay: 30 },
  { type: 'input', content: 'git status', delay: 20 },
  { type: 'output', content: 'On branch main', delay: 15 },
  { type: 'output', content: 'Changes not staged for commit:', delay: 5 },
  { type: 'output', content: '        modified:   src/index.js', delay: 3 },
];

// 修改最后一次提交
export const amendCommit: RemotionTerminalLine[] = [
  { type: 'input', content: 'git commit --amend -m "Fix: correct commit message"', delay: 0 },
  { type: 'output', content: '[main d4e5f6g] Fix: correct commit message', delay: 15 },
  { type: 'output', content: ' Date: Mon Jan 15 10:00:00 2024 +0800', delay: 5 },
  { type: 'output', content: ' 1 file changed, 5 insertions(+), 2 deletions(-)', delay: 5 },
];

// 回退到上一次提交
export const resetSoft: RemotionTerminalLine[] = [
  { type: 'input', content: 'git log --oneline -3', delay: 0 },
  { type: 'output', content: 'd4e5f6g (HEAD -> main) Third commit', delay: 15 },
  { type: 'output', content: 'c3d4e5f Second commit', delay: 5 },
  { type: 'output', content: 'b2c3d4e First commit', delay: 5 },
  { type: 'input', content: 'git reset --soft HEAD~1', delay: 30 },
  { type: 'input', content: 'git status', delay: 20 },
  { type: 'output', content: 'On branch main', delay: 15 },
  { type: 'output', content: 'Changes to be committed:', delay: 5 },
  { type: 'output', content: '  (use "git restore --staged <file>..." to unstage)', delay: 3 },
  { type: 'output', content: '        modified:   src/index.js', delay: 3 },
];

// 完全回退（丢弃修改）
export const resetHard: RemotionTerminalLine[] = [
  { type: 'input', content: 'git reset --hard HEAD~1', delay: 0 },
  { type: 'output', content: 'HEAD is now at c3d4e5f Second commit', delay: 15 },
];
