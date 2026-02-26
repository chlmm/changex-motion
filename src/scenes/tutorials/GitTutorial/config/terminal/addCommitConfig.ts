// git add 和 git commit 操作配置
import { RemotionTerminalLine } from '../../components/Terminal';

// ========== git add 场景 ==========

// 添加单个文件
export const addSingleFile: RemotionTerminalLine[] = [
  { type: 'input', content: 'git add src/index.js', delay: 0 },
  { type: 'input', content: 'git status', delay: 20 },
  { type: 'output', content: 'On branch main', delay: 15 },
  { type: 'output', content: 'Changes to be committed:', delay: 5 },
  { type: 'output', content: '  (use "git restore --staged <file>..." to unstage)', delay: 3 },
  { type: 'output', content: '        new file:   src/index.js', delay: 3 },
];

// 添加多个文件
export const addMultipleFiles: RemotionTerminalLine[] = [
  { type: 'input', content: 'git add src/index.js src/app.js src/utils.js', delay: 0 },
  { type: 'input', content: 'git status', delay: 20 },
  { type: 'output', content: 'On branch main', delay: 15 },
  { type: 'output', content: 'Changes to be committed:', delay: 5 },
  { type: 'output', content: '        new file:   src/index.js', delay: 3 },
  { type: 'output', content: '        new file:   src/app.js', delay: 2 },
  { type: 'output', content: '        new file:   src/utils.js', delay: 2 },
];

// 添加所有文件
export const addAllFiles: RemotionTerminalLine[] = [
  { type: 'input', content: 'git add .', delay: 0 },
  { type: 'input', content: 'git status', delay: 20 },
  { type: 'output', content: 'On branch main', delay: 15 },
  { type: 'output', content: 'Changes to be committed:', delay: 5 },
  { type: 'output', content: '        new file:   src/index.js', delay: 3 },
  { type: 'output', content: '        new file:   src/styles.css', delay: 2 },
  { type: 'output', content: '        modified:   README.md', delay: 2 },
];

// 添加所有修改和删除的文件（不包括新建）
export const addUpdate: RemotionTerminalLine[] = [
  { type: 'input', content: 'git add -u', delay: 0 },
  { type: 'input', content: 'git status', delay: 20 },
  { type: 'output', content: 'On branch main', delay: 15 },
  { type: 'output', content: 'Changes to be committed:', delay: 5 },
  { type: 'output', content: '        modified:   src/index.js', delay: 3 },
  { type: 'output', content: '        deleted:    old-file.js', delay: 2 },
];

// 使用通配符添加文件
export const addWildcard: RemotionTerminalLine[] = [
  { type: 'input', content: 'git add src/*.js', delay: 0 },
  { type: 'input', content: 'git status', delay: 20 },
  { type: 'output', content: 'On branch main', delay: 15 },
  { type: 'output', content: 'Changes to be committed:', delay: 5 },
  { type: 'output', content: '        new file:   src/index.js', delay: 3 },
  { type: 'output', content: '        new file:   src/app.js', delay: 2 },
  { type: 'output', content: '        new file:   src/utils.js', delay: 2 },
];

// 交互式添加
export const addInteractive: RemotionTerminalLine[] = [
  { type: 'input', content: 'git add -p', delay: 0 },
  { type: 'output', content: 'diff --git a/src/index.js b/src/index.js', delay: 15 },
  { type: 'output', content: 'index abc1234..def5678 100644', delay: 3 },
  { type: 'output', content: '--- a/src/index.js', delay: 3 },
  { type: 'output', content: '+++ b/src/index.js', delay: 3 },
  { type: 'output', content: '@@ -1,5 +1,6 @@', delay: 3 },
  { type: 'output', content: ' function hello() {', delay: 3 },
  { type: 'output', content: '+  console.log("Hello");', delay: 3 },
  { type: 'output', content: '   return true;', delay: 3 },
  { type: 'output', content: ' }', delay: 3 },
  { type: 'output', content: '(1/1) Stage this hunk [y,n,q,a,d,e,?]? y', delay: 5 },
];

// ========== git commit 场景 ==========

// 基本提交
export const commitBasic: RemotionTerminalLine[] = [
  { type: 'input', content: 'git commit -m "Add new feature"', delay: 0 },
  { type: 'output', content: '[main d4e5f6g] Add new feature', delay: 20 },
  { type: 'output', content: ' 2 files changed, 50 insertions(+)', delay: 5 },
  { type: 'output', content: ' create mode 100644 src/feature.js', delay: 3 },
];

// 添加并提交（已跟踪文件）
export const commitAmendAdd: RemotionTerminalLine[] = [
  { type: 'input', content: 'git commit -am "Fix bug in login"', delay: 0 },
  { type: 'output', content: '[main e5f6g7h] Fix bug in login', delay: 20 },
  { type: 'output', content: ' 1 file changed, 5 insertions(+), 2 deletions(-)', delay: 5 },
];

// 多行提交信息
export const commitMultiLine: RemotionTerminalLine[] = [
  { type: 'input', content: 'git commit -m "Add user authentication"', delay: 0 },
  { type: 'input', content: '  - Add login form', delay: 15 },
  { type: 'input', content: '  - Add session management', delay: 10 },
  { type: 'input', content: '  - Add logout functionality"', delay: 10 },
  { type: 'output', content: '[main f6g7h8i] Add user authentication', delay: 20 },
  { type: 'output', content: ' 4 files changed, 200 insertions(+)', delay: 5 },
];

// 修改上次提交信息
export const commitAmend: RemotionTerminalLine[] = [
  { type: 'input', content: 'git commit --amend -m "Add user authentication module"', delay: 0 },
  { type: 'output', content: '[main f6g7h8i] Add user authentication module', delay: 20 },
  { type: 'output', content: ' Date: Mon Jan 15 10:30:00 2024 +0800', delay: 5 },
  { type: 'output', content: ' 4 files changed, 200 insertions(+)', delay: 5 },
];

// 允许空提交
export const commitEmpty: RemotionTerminalLine[] = [
  { type: 'input', content: 'git commit --allow-empty -m "Trigger CI build"', delay: 0 },
  { type: 'output', content: '[main g7h8i9j] Trigger CI build', delay: 20 },
];

// 提交时添加作者信息
export const commitWithAuthor: RemotionTerminalLine[] = [
  { type: 'input', content: 'git commit -m "Fix security issue" --author="Security Bot <bot@example.com>"', delay: 0 },
  { type: 'output', content: '[main h8i9j0k] Fix security issue', delay: 20 },
  { type: 'output', content: ' Author: Security Bot <bot@example.com>', delay: 5 },
  { type: 'output', content: ' 1 file changed, 3 insertions(+), 1 deletion(-)', delay: 5 },
];

// 签名提交
export const commitSigned: RemotionTerminalLine[] = [
  { type: 'input', content: 'git commit -S -m "Add critical feature"', delay: 0 },
  { type: 'output', content: '[main i9j0k1l] Add critical feature', delay: 20 },
  { type: 'output', content: ' 2 files changed, 100 insertions(+)', delay: 5 },
  { type: 'output', content: ' gpg: Signature made Mon Jan 15 11:00:00 2024 +0800', delay: 3 },
  { type: 'output', content: ' gpg:                using RSA key ABC123DEF456', delay: 3 },
  { type: 'output', content: ' gpg: Good signature from "User <user@example.com>"', delay: 3 },
];

// ========== 组合工作流场景 ==========

// 完整的添加提交流程
export const addCommitWorkflow: RemotionTerminalLine[] = [
  { type: 'input', content: 'git status', delay: 0 },
  { type: 'output', content: 'On branch main', delay: 15 },
  { type: 'output', content: 'Changes not staged for commit:', delay: 5 },
  { type: 'output', content: '        modified:   src/index.js', delay: 3 },
  { type: 'output', content: '', delay: 2 },
  { type: 'output', content: 'Untracked files:', delay: 3 },
  { type: 'output', content: '        src/utils.js', delay: 3 },
  { type: 'input', content: 'git add .', delay: 30 },
  { type: 'input', content: 'git commit -m "Add utilities and update index"', delay: 20 },
  { type: 'output', content: '[main j0k1l2m] Add utilities and update index', delay: 20 },
  { type: 'output', content: ' 2 files changed, 80 insertions(+)', delay: 5 },
];
