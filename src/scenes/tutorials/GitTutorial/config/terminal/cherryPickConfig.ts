// git cherry-pick 选择性合并配置
import { RemotionTerminalLine } from '../../components/Terminal';

// 基本挑选提交
export const cherryPickBasic: RemotionTerminalLine[] = [
  { type: 'input', content: 'git log --oneline -3 feature', delay: 0 },
  { type: 'output', content: 'f6g7h8i Add important fix', delay: 15 },
  { type: 'output', content: 'e5f6g7h Add feature B', delay: 5 },
  { type: 'output', content: 'd4e5f6g Add feature A', delay: 5 },
  { type: 'input', content: 'git cherry-pick f6g7h8i', delay: 30 },
  { type: 'output', content: '[main g7h8i9j] Add important fix', delay: 20 },
  { type: 'output', content: ' Date: Mon Jan 15 10:00:00 2024 +0800', delay: 5 },
  { type: 'output', content: ' 2 files changed, 25 insertions(+)', delay: 5 },
];

// 挑选多个提交
export const cherryPickMultiple: RemotionTerminalLine[] = [
  { type: 'input', content: 'git cherry-pick d4e5f6g e5f6g7h', delay: 0 },
  { type: 'output', content: '[main h8i9j0k] Add feature A', delay: 20 },
  { type: 'output', content: ' 3 files changed, 50 insertions(+)', delay: 5 },
  { type: 'output', content: '[main i9j0k1l] Add feature B', delay: 15 },
  { type: 'output', content: ' 1 file changed, 20 insertions(+)', delay: 5 },
];

// 挑选提交范围
export const cherryPickRange: RemotionTerminalLine[] = [
  { type: 'input', content: 'git cherry-pick d4e5f6g..f6g7h8i', delay: 0 },
  { type: 'output', content: '[main j0k1l2m] Add feature A', delay: 20 },
  { type: 'output', content: ' 3 files changed, 50 insertions(+)', delay: 5 },
  { type: 'output', content: '[main k1l2m3n] Add feature B', delay: 15 },
  { type: 'output', content: ' 1 file changed, 20 insertions(+)', delay: 5 },
  { type: 'output', content: '[main l2m3n4o] Add important fix', delay: 15 },
  { type: 'output', content: ' 2 files changed, 25 insertions(+)', delay: 5 },
];

// 仅应用更改但不提交
export const cherryPickNoCommit: RemotionTerminalLine[] = [
  { type: 'input', content: 'git cherry-pick -n f6g7h8i', delay: 0 },
  { type: 'output', content: '', delay: 15 },
  { type: 'input', content: 'git status', delay: 20 },
  { type: 'output', content: 'On branch main', delay: 15 },
  { type: 'output', content: 'Changes to be committed:', delay: 5 },
  { type: 'output', content: '  (use "git restore --staged <file>..." to unstage)', delay: 3 },
  { type: 'output', content: '        modified:   src/index.js', delay: 3 },
  { type: 'output', content: '        modified:   src/utils.js', delay: 3 },
];

// 挑选时冲突处理
export const cherryPickConflict: RemotionTerminalLine[] = [
  { type: 'input', content: 'git cherry-pick f6g7h8i', delay: 0 },
  { type: 'output', content: 'Auto-merging src/index.js', delay: 15 },
  { type: 'output', content: 'CONFLICT (content): Merge conflict in src/index.js', delay: 10 },
  { type: 'output', content: 'error: could not apply f6g7h8i... Add important fix', delay: 5 },
  { type: 'output', content: 'hint: After resolving the conflicts, mark them with', delay: 5 },
  { type: 'output', content: 'hint: "git add <paths>" and run "git cherry-pick --continue".', delay: 5 },
  { type: 'output', content: 'hint: To discard this commit, use "git cherry-pick --abort".', delay: 5 },
];

// 解决冲突后继续
export const cherryPickContinue: RemotionTerminalLine[] = [
  { type: 'input', content: '# 解决冲突后', delay: 0 },
  { type: 'input', content: 'git add src/index.js', delay: 15 },
  { type: 'input', content: 'git cherry-pick --continue', delay: 20 },
  { type: 'output', content: '[main m3n4o5p] Add important fix', delay: 20 },
  { type: 'output', content: ' 1 file changed, 15 insertions(+)', delay: 5 },
];

// 放弃挑选
export const cherryPickAbort: RemotionTerminalLine[] = [
  { type: 'input', content: 'git cherry-pick --abort', delay: 0 },
  { type: 'output', content: '', delay: 15 },
];

// 跳过当前提交继续下一个
export const cherryPickSkip: RemotionTerminalLine[] = [
  { type: 'input', content: 'git cherry-pick --skip', delay: 0 },
  { type: 'output', content: '[main n4o5p6q] Next commit', delay: 15 },
  { type: 'output', content: ' 2 files changed, 30 insertions(+)', delay: 5 },
];

// 挑选并自定义提交信息
export const cherryPickEdit: RemotionTerminalLine[] = [
  { type: 'input', content: 'git cherry-pick f6g7h8i -e', delay: 0 },
  { type: 'output', content: '# 编辑器打开，可修改提交信息', delay: 15 },
  { type: 'output', content: '[main o5p6q7r] Custom commit message for picked changes', delay: 10 },
  { type: 'output', content: ' 2 files changed, 25 insertions(+)', delay: 5 },
];

// 挑选合并提交
export const cherryPickMerge: RemotionTerminalLine[] = [
  { type: 'input', content: 'git log --oneline -3 --graph', delay: 0 },
  { type: 'output', content: '*   f6g7h8i Merge branch \'feature\'', delay: 15 },
  { type: 'output', content: '|\\', delay: 3 },
  { type: 'output', content: '| * e5f6g7h Feature commit', delay: 3 },
  { type: 'output', content: '|/', delay: 3 },
  { type: 'output', content: '* d4e5f6g Base commit', delay: 3 },
  { type: 'input', content: 'git cherry-pick -m 1 f6g7h8i', delay: 30 },
  { type: 'output', content: '[main p6q7r8s] Merge branch \'feature\'', delay: 20 },
  { type: 'output', content: ' 3 files changed, 60 insertions(+)', delay: 5 },
];

// 保留原始作者信息
export const cherryPickKeepAuthor: RemotionTerminalLine[] = [
  { type: 'input', content: 'git cherry-pick f6g7h8i', delay: 0 },
  { type: 'output', content: '[main q7r8s9t] Add important fix', delay: 20 },
  { type: 'output', content: ' Author: Original Author <original@example.com>', delay: 5 },
  { type: 'output', content: ' Date:   Sun Jan 14 15:00:00 2024 +0800', delay: 5 },
  { type: 'output', content: ' 2 files changed, 25 insertions(+)', delay: 5 },
];
