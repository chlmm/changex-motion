// git merge 合并操作配置
import { RemotionTerminalLine } from '../../components/Terminal';

// 快进合并
export const mergeFastForward: RemotionTerminalLine[] = [
  { type: 'input', content: 'git checkout main', delay: 0 },
  { type: 'output', content: "Switched to branch 'main'", delay: 15 },
  { type: 'input', content: 'git merge feature', delay: 30 },
  { type: 'output', content: 'Updating a1b2c3d..d4e5f6g', delay: 10 },
  { type: 'output', content: 'Fast-forward', delay: 5 },
  { type: 'output', content: ' src/feature.js | 50 ++++++++++++++++++++++++++++++++++++++++++++++++', delay: 5 },
  { type: 'output', content: ' 1 file changed, 50 insertions(+)', delay: 5 },
];

// 合并冲突
export const mergeConflict: RemotionTerminalLine[] = [
  { type: 'input', content: 'git merge feature', delay: 0 },
  { type: 'output', content: 'Auto-merging src/index.js', delay: 15 },
  { type: 'output', content: 'CONFLICT (content): Merge conflict in src/index.js', delay: 10 },
  { type: 'output', content: 'Automatic merge failed; fix conflicts and then commit the result.', delay: 5 },
  { type: 'input', content: 'git status', delay: 30 },
  { type: 'output', content: 'On branch main', delay: 15 },
  { type: 'output', content: 'You have unmerged paths.', delay: 5 },
  { type: 'output', content: '  (fix conflicts and run "git commit")', delay: 3 },
  { type: 'output', content: '', delay: 2 },
  { type: 'output', content: 'Unmerged paths:', delay: 3 },
  { type: 'output', content: '  (use "git add <file>..." to mark resolution)', delay: 3 },
  { type: 'output', content: '        both modified:   src/index.js', delay: 3 },
];

// 解决冲突后提交
export const mergeResolved: RemotionTerminalLine[] = [
  { type: 'input', content: 'git add src/index.js', delay: 0 },
  { type: 'input', content: 'git commit', delay: 30 },
  { type: 'output', content: '[main d4e5f6g] Merge branch \'feature\'', delay: 15 },
];
