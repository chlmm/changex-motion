// git revert 安全撤销配置
import { RemotionTerminalLine } from '../../components/Terminal';

// 基本撤销提交
export const revertBasic: RemotionTerminalLine[] = [
  { type: 'input', content: 'git log --oneline -3', delay: 0 },
  { type: 'output', content: 'e5f6g7h (HEAD -> main) Add buggy feature', delay: 15 },
  { type: 'output', content: 'd4e5f6g Update README', delay: 5 },
  { type: 'output', content: 'c3d4e5f Initial commit', delay: 5 },
  { type: 'input', content: 'git revert e5f6g7h', delay: 30 },
  { type: 'output', content: '[main f6g7h8i] Revert "Add buggy feature"', delay: 20 },
  { type: 'output', content: ' 1 file changed, 0 insertions(+), 20 deletions(-)', delay: 5 },
];

// 不自动提交（仅修改工作区）
export const revertNoCommit: RemotionTerminalLine[] = [
  { type: 'input', content: 'git revert --no-commit e5f6g7h', delay: 0 },
  { type: 'output', content: 'CONFLICT (content): Revert conflict in src/index.js', delay: 15 },
  { type: 'output', content: 'error: could not revert e5f6g7h... Add buggy feature', delay: 5 },
  { type: 'output', content: 'hint: after resolving the conflicts, mark the corrected paths', delay: 5 },
  { type: 'output', content: 'hint: with \'git add <paths>\' and run \'git revert --continue\'', delay: 5 },
];

// 撤销多个提交
export const revertMultiple: RemotionTerminalLine[] = [
  { type: 'input', content: 'git revert e5f6g7h d4e5f6g', delay: 0 },
  { type: 'output', content: '[main g7h8i9j] Revert "Update README"', delay: 20 },
  { type: 'output', content: ' 1 file changed, 2 deletions(-)', delay: 5 },
  { type: 'output', content: '[main h8i9j0k] Revert "Add buggy feature"', delay: 15 },
  { type: 'output', content: ' 2 files changed, 0 insertions(+), 50 deletions(-)', delay: 5 },
];

// 撤销范围提交
export const revertRange: RemotionTerminalLine[] = [
  { type: 'input', content: 'git revert c3d4e5f..e5f6g7h', delay: 0 },
  { type: 'output', content: '[main i9j0k1l] Revert "Add buggy feature"', delay: 20 },
  { type: 'output', content: ' 2 files changed, 0 insertions(+), 50 deletions(-)', delay: 5 },
  { type: 'output', content: '[main j0k1l2m] Revert "Update README"', delay: 15 },
  { type: 'output', content: ' 1 file changed, 2 deletions(-)', delay: 5 },
];

// 撤销时冲突处理
export const revertConflict: RemotionTerminalLine[] = [
  { type: 'input', content: 'git revert e5f6g7h', delay: 0 },
  { type: 'output', content: 'Auto-merging src/index.js', delay: 15 },
  { type: 'output', content: 'CONFLICT (content): Merge conflict in src/index.js', delay: 10 },
  { type: 'output', content: 'error: could not revert e5f6g7h... Add buggy feature', delay: 5 },
  { type: 'output', content: 'hint: Fix conflicts and run \'git revert --continue\'', delay: 5 },
  { type: 'input', content: '# 解决冲突后', delay: 20 },
  { type: 'input', content: 'git add src/index.js', delay: 15 },
  { type: 'input', content: 'git revert --continue', delay: 20 },
  { type: 'output', content: '[main k1l2m3n] Revert "Add buggy feature"', delay: 20 },
  { type: 'output', content: ' 1 file changed, 10 deletions(-)', delay: 5 },
];

// 取消撤销操作
export const revertAbort: RemotionTerminalLine[] = [
  { type: 'input', content: 'git revert e5f6g7h', delay: 0 },
  { type: 'output', content: 'CONFLICT (content): Merge conflict in src/index.js', delay: 15 },
  { type: 'output', content: 'error: could not revert e5f6g7h... Add buggy feature', delay: 5 },
  { type: 'input', content: 'git revert --abort', delay: 20 },
  { type: 'output', content: '', delay: 10 },
];

// 撤销合并提交
export const revertMerge: RemotionTerminalLine[] = [
  { type: 'input', content: 'git log --oneline -5 --graph', delay: 0 },
  { type: 'output', content: '*   e5f6g7h (HEAD -> main) Merge branch \'feature\'', delay: 15 },
  { type: 'output', content: '|\\', delay: 3 },
  { type: 'output', content: '| * d4e5f6g (feature) Add feature', delay: 3 },
  { type: 'output', content: '|/', delay: 3 },
  { type: 'output', content: '* c3d4e5f Initial commit', delay: 3 },
  { type: 'input', content: 'git revert -m 1 e5f6g7h', delay: 30 },
  { type: 'output', content: '[main l2m3n4o] Revert "Merge branch \'feature\'"', delay: 20 },
  { type: 'output', content: ' 1 file changed, 0 insertions(+), 30 deletions(-)', delay: 5 },
];

// 撤销并自定义提交信息
export const revertCustomMessage: RemotionTerminalLine[] = [
  { type: 'input', content: 'git revert e5f6g7h -m "Rollback buggy feature for v1.0.1 release"', delay: 0 },
  { type: 'output', content: '[main m3n4o5p] Rollback buggy feature for v1.0.1 release', delay: 20 },
  { type: 'output', content: ' 2 files changed, 0 insertions(+), 50 deletions(-)', delay: 5 },
];

// revert vs reset 对比
export const revertVsReset: RemotionTerminalLine[] = [
  { type: 'input', content: '# git revert: 创建新提交来撤销（安全，保留历史）', delay: 0 },
  { type: 'output', content: 'git revert e5f6g7h  # 新增一个撤销提交', delay: 15 },
  { type: 'output', content: '', delay: 5 },
  { type: 'output', content: '# git reset: 移动 HEAD 指针（危险，改写历史）', delay: 10 },
  { type: 'output', content: 'git reset --hard e5f6g7h  # 直接删除提交', delay: 10 },
];
