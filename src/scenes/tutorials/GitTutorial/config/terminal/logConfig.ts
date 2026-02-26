// git log 历史查看配置
import { RemotionTerminalLine } from '../../components/Terminal';

// 简洁历史
export const logOneline: RemotionTerminalLine[] = [
  { type: 'input', content: 'git log --oneline', delay: 0 },
  { type: 'output', content: 'd4e5f6g (HEAD -> main, origin/main) Add feature', delay: 15 },
  { type: 'output', content: 'c3d4e5f Fix bug in login', delay: 5 },
  { type: 'output', content: 'b2c3d4e Update README', delay: 5 },
  { type: 'output', content: 'a1b2c3d Initial commit', delay: 5 },
];

// 详细历史
export const logDetail: RemotionTerminalLine[] = [
  { type: 'input', content: 'git log', delay: 0 },
  { type: 'output', content: 'commit d4e5f6g7h8i9j0k1l2m3', delay: 15 },
  { type: 'output', content: 'Author: User <user@example.com>', delay: 5 },
  { type: 'output', content: 'Date:   Mon Jan 15 10:00:00 2024 +0800', delay: 5 },
  { type: 'output', content: '', delay: 2 },
  { type: 'output', content: '    Add feature', delay: 3 },
  { type: 'output', content: '', delay: 2 },
  { type: 'output', content: 'commit c3d4e5f6g7h8i9j0k1l2', delay: 3 },
  { type: 'output', content: 'Author: User <user@example.com>', delay: 3 },
  { type: 'output', content: 'Date:   Sun Jan 14 15:30:00 2024 +0800', delay: 3 },
  { type: 'output', content: '', delay: 2 },
  { type: 'output', content: '    Fix bug in login', delay: 3 },
];

// 图形化历史
export const logGraph: RemotionTerminalLine[] = [
  { type: 'input', content: 'git log --oneline --graph --all', delay: 0 },
  { type: 'output', content: '* d4e5f6g (HEAD -> main) Add feature', delay: 15 },
  { type: 'output', content: '| * c3d4e5f (feature) Feature work', delay: 5 },
  { type: 'output', content: '|/', delay: 3 },
  { type: 'output', content: '* b2c3d4e Update README', delay: 5 },
  { type: 'output', content: '* a1b2c3d Initial commit', delay: 5 },
];

// 查看文件历史
export const logFile: RemotionTerminalLine[] = [
  { type: 'input', content: 'git log --oneline src/index.js', delay: 0 },
  { type: 'output', content: 'd4e5f6g Update index styles', delay: 15 },
  { type: 'output', content: 'b2c3d4e Add initial index file', delay: 5 },
];

// 查看差异
export const diffShow: RemotionTerminalLine[] = [
  { type: 'input', content: 'git show d4e5f6g', delay: 0 },
  { type: 'output', content: 'commit d4e5f6g7h8i9j0k1l2m3', delay: 15 },
  { type: 'output', content: 'Author: User <user@example.com>', delay: 5 },
  { type: 'output', content: 'Date:   Mon Jan 15 10:00:00 2024 +0800', delay: 5 },
  { type: 'output', content: '', delay: 2 },
  { type: 'output', content: '    Add feature', delay: 3 },
  { type: 'output', content: '', delay: 2 },
  { type: 'output', content: 'diff --git a/src/feature.js b/src/feature.js', delay: 3 },
  { type: 'output', content: 'new file mode 100644', delay: 3 },
  { type: 'output', content: 'index 0000000..abc1234', delay: 3 },
  { type: 'output', content: '--- /dev/null', delay: 3 },
  { type: 'output', content: '+++ b/src/feature.js', delay: 3 },
  { type: 'output', content: '@@ -0,0 +1,10 @@', delay: 3 },
  { type: 'output', content: '+function feature() {', delay: 3 },
  { type: 'output', content: '+  return "Hello Feature";', delay: 3 },
  { type: 'output', content: '+}', delay: 3 },
];
