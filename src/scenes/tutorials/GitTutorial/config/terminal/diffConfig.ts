// git diff 差异查看配置
import { RemotionTerminalLine } from '../../components/Terminal';

// 工作区与暂存区差异
export const diffWorkingDir: RemotionTerminalLine[] = [
  { type: 'input', content: 'git diff', delay: 0 },
  { type: 'output', content: 'diff --git a/src/index.js b/src/index.js', delay: 15 },
  { type: 'output', content: 'index abc1234..def5678 100644', delay: 3 },
  { type: 'output', content: '--- a/src/index.js', delay: 3 },
  { type: 'output', content: '+++ b/src/index.js', delay: 3 },
  { type: 'output', content: '@@ -1,5 +1,6 @@', delay: 3 },
  { type: 'output', content: ' function hello() {', delay: 3 },
  { type: 'output', content: '+  console.log("Hello, World!");', delay: 3 },
  { type: 'output', content: '   return "Hello";', delay: 3 },
  { type: 'output', content: ' }', delay: 3 },
  { type: 'output', content: '', delay: 2 },
  { type: 'output', content: ' function goodbye() {', delay: 3 },
  { type: 'output', content: '-  return "Goodbye";', delay: 3 },
  { type: 'output', content: '+  return "Bye!";', delay: 3 },
  { type: 'output', content: ' }', delay: 3 },
];

// 暂存区与最新提交差异
export const diffStaged: RemotionTerminalLine[] = [
  { type: 'input', content: 'git diff --staged', delay: 0 },
  { type: 'output', content: 'diff --git a/src/app.js b/src/app.js', delay: 15 },
  { type: 'output', content: 'index 1234567..89abcde 100644', delay: 3 },
  { type: 'output', content: '--- a/src/app.js', delay: 3 },
  { type: 'output', content: '+++ b/src/app.js', delay: 3 },
  { type: 'output', content: '@@ -0,0 +1,10 @@', delay: 3 },
  { type: 'output', content: '+function App() {', delay: 3 },
  { type: 'output', content: '+  return <div>Hello App</div>;', delay: 3 },
  { type: 'output', content: '+}', delay: 3 },
  { type: 'output', content: '+', delay: 2 },
  { type: 'output', content: '+export default App;', delay: 3 },
];

// 查看特定文件差异
export const diffFile: RemotionTerminalLine[] = [
  { type: 'input', content: 'git diff src/index.js', delay: 0 },
  { type: 'output', content: 'diff --git a/src/index.js b/src/index.js', delay: 15 },
  { type: 'output', content: 'index abc1234..def5678 100644', delay: 3 },
  { type: 'output', content: '--- a/src/index.js', delay: 3 },
  { type: 'output', content: '+++ b/src/index.js', delay: 3 },
  { type: 'output', content: '@@ -10,7 +10,8 @@', delay: 3 },
  { type: 'output', content: ' const config = {', delay: 3 },
  { type: 'output', content: '   name: "app",', delay: 3 },
  { type: 'output', content: '   version: "1.0.0",', delay: 3 },
  { type: 'output', content: '+  debug: true,', delay: 3 },
  { type: 'output', content: ' };', delay: 3 },
];

// 两个提交之间的差异
export const diffCommits: RemotionTerminalLine[] = [
  { type: 'input', content: 'git diff HEAD~2 HEAD', delay: 0 },
  { type: 'output', content: 'diff --git a/src/feature.js b/src/feature.js', delay: 15 },
  { type: 'output', content: 'new file mode 100644', delay: 3 },
  { type: 'output', content: 'index 0000000..abc1234', delay: 3 },
  { type: 'output', content: '--- /dev/null', delay: 3 },
  { type: 'output', content: '+++ b/src/feature.js', delay: 3 },
  { type: 'output', content: '@@ -0,0 +1,20 @@', delay: 3 },
  { type: 'output', content: '+export function feature() {', delay: 3 },
  { type: 'output', content: '+  return "New Feature";', delay: 3 },
  { type: 'output', content: '+}', delay: 3 },
];

// 分支间差异
export const diffBranches: RemotionTerminalLine[] = [
  { type: 'input', content: 'git diff main..feature', delay: 0 },
  { type: 'output', content: 'diff --git a/src/login.js b/src/login.js', delay: 15 },
  { type: 'output', content: 'new file mode 100644', delay: 3 },
  { type: 'output', content: 'index 0000000..def5678', delay: 3 },
  { type: 'output', content: '--- /dev/null', delay: 3 },
  { type: 'output', content: '+++ b/src/login.js', delay: 3 },
  { type: 'output', content: '@@ -0,0 +1,15 @@', delay: 3 },
  { type: 'output', content: '+export function login(user, pass) {', delay: 3 },
  { type: 'output', content: '+  // Authentication logic', delay: 3 },
  { type: 'output', content: '+  return true;', delay: 3 },
  { type: 'output', content: '+}', delay: 3 },
];

// 仅显示文件名变更
export const diffNameOnly: RemotionTerminalLine[] = [
  { type: 'input', content: 'git diff --name-only', delay: 0 },
  { type: 'output', content: 'src/index.js', delay: 15 },
  { type: 'output', content: 'src/utils.js', delay: 5 },
  { type: 'output', content: 'package.json', delay: 5 },
];

// 显示统计信息
export const diffStat: RemotionTerminalLine[] = [
  { type: 'input', content: 'git diff --stat', delay: 0 },
  { type: 'output', content: ' src/index.js    | 10 +++++++++-', delay: 15 },
  { type: 'output', content: ' src/utils.js    |  5 +++++', delay: 5 },
  { type: 'output', content: ' package.json    |  2 +-', delay: 5 },
  { type: 'output', content: ' 3 files changed, 14 insertions(+), 3 deletions(-)', delay: 5 },
];

// 简洁差异（显示变化的行）
export const diffShortStat: RemotionTerminalLine[] = [
  { type: 'input', content: 'git diff --shortstat', delay: 0 },
  { type: 'output', content: ' 3 files changed, 14 insertions(+), 3 deletions(-)', delay: 15 },
];

// 显示单词差异
export const diffWord: RemotionTerminalLine[] = [
  { type: 'input', content: 'git diff --word-diff', delay: 0 },
  { type: 'output', content: 'diff --git a/README.md b/README.md', delay: 15 },
  { type: 'output', content: 'index abc1234..def5678 100644', delay: 3 },
  { type: 'output', content: '--- a/README.md', delay: 3 },
  { type: 'output', content: '+++ b/README.md', delay: 3 },
  { type: 'output', content: '@@ -1 +1 @@', delay: 3 },
  { type: 'output', content: '# [-Project-]{+Awesome Project+}', delay: 3 },
];

// 忽略空白字符差异
export const diffIgnoreSpace: RemotionTerminalLine[] = [
  { type: 'input', content: 'git diff -w', delay: 0 },
  { type: 'output', content: 'diff --git a/src/code.js b/src/code.js', delay: 15 },
  { type: 'output', content: 'index abc1234..def5678 100644', delay: 3 },
  { type: 'output', content: '--- a/src/code.js', delay: 3 },
  { type: 'output', content: '+++ b/src/code.js', delay: 3 },
  { type: 'output', content: '// No significant changes when ignoring whitespace', delay: 5 },
];

// 比较暂存区和工作目录（所有差异）
export const diffAll: RemotionTerminalLine[] = [
  { type: 'input', content: 'git diff HEAD', delay: 0 },
  { type: 'output', content: 'diff --git a/src/index.js b/src/index.js', delay: 15 },
  { type: 'output', content: 'index abc1234..def5678 100644', delay: 3 },
  { type: 'output', content: '--- a/src/index.js', delay: 3 },
  { type: 'output', content: '+++ b/src/index.js', delay: 3 },
  { type: 'output', content: '@@ -1,5 +1,7 @@', delay: 3 },
  { type: 'output', content: ' function main() {', delay: 3 },
  { type: 'output', content: '+  init();', delay: 3 },
  { type: 'output', content: '+  run();', delay: 3 },
  { type: 'output', content: '   cleanup();', delay: 3 },
  { type: 'output', content: ' }', delay: 3 },
];

// 查看合并冲突标记
export const diffConflict: RemotionTerminalLine[] = [
  { type: 'input', content: 'git diff', delay: 0 },
  { type: 'output', content: 'diff --cc src/index.js', delay: 15 },
  { type: 'output', content: 'index abc1234,def5678..789abcd 100644', delay: 3 },
  { type: 'output', content: '--- a/src/index.js', delay: 3 },
  { type: 'output', content: '+++ b/src/index.js', delay: 3 },
  { type: 'output', content: '@@@ -1,5 -1,5 +1,11 @@@', delay: 3 },
  { type: 'output', content: '++<<<<<<< HEAD', delay: 3 },
  { type: 'output', content: ' +function main() {', delay: 3 },
  { type: 'output', content: '++=======', delay: 3 },
  { type: 'output', content: '+ function app() {', delay: 3 },
  { type: 'output', content: '++>>>>>>> feature', delay: 3 },
  { type: 'output', content: '   }', delay: 3 },
];
