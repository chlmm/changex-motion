// git status 命令的不同场景配置
import { RemotionTerminalLine } from '../../components/Terminal';

// 场景1：干净的工作区
export const gitStatusClean: RemotionTerminalLine[] = [
  { type: 'input', content: 'git status', delay: 0 },
  { type: 'output', content: 'On branch main', delay: 15 },
  { type: 'output', content: 'Your branch is up to date with \'origin/main\'.', delay: 5 },
  { type: 'output', content: '', delay: 3 },
  { type: 'output', content: 'nothing to commit, working tree clean', delay: 3 },
];

// 场景2：有未暂存的修改
export const gitStatusModified: RemotionTerminalLine[] = [
  { type: 'input', content: 'git status', delay: 0 },
  { type: 'output', content: 'On branch main', delay: 15 },
  { type: 'output', content: 'Changes not staged for commit:', delay: 5 },
  { type: 'output', content: '  (use "git add <file>..." to update what will be committed)', delay: 3 },
  { type: 'output', content: '  (use "git restore <file>..." to discard changes in working directory)', delay: 3 },
  { type: 'output', content: '        modified:   index.html', delay: 3 },
  { type: 'output', content: '', delay: 2 },
  { type: 'output', content: 'no changes added to commit (use "git add" and/or "git commit -a")', delay: 3 },
];

// 场景3：有已暂存的文件
export const gitStatusStaged: RemotionTerminalLine[] = [
  { type: 'input', content: 'git status', delay: 0 },
  { type: 'output', content: 'On branch main', delay: 15 },
  { type: 'output', content: 'Changes to be committed:', delay: 5 },
  { type: 'output', content: '  (use "git restore --staged <file>..." to unstage)', delay: 3 },
  { type: 'output', content: '        new file:   feature.js', delay: 3 },
  { type: 'output', content: '        modified:   index.html', delay: 3 },
];
