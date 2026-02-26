// git reflog 操作历史配置
import { RemotionTerminalLine } from '../../components/Terminal';

// 查看引用日志
export const reflogShow: RemotionTerminalLine[] = [
  { type: 'input', content: 'git reflog', delay: 0 },
  { type: 'output', content: 'e5f6g7h (HEAD -> main) HEAD@{0}: commit: Add new feature', delay: 15 },
  { type: 'output', content: 'd4e5f6g HEAD@{1}: checkout: moving from feature to main', delay: 5 },
  { type: 'output', content: 'c3d4e5f (feature) HEAD@{2}: commit: Feature work', delay: 5 },
  { type: 'output', content: 'b2c3d4e HEAD@{3}: checkout: moving from main to feature', delay: 5 },
  { type: 'output', content: 'b2c3d4e HEAD@{4}: reset: moving to HEAD~1', delay: 5 },
  { type: 'output', content: 'a1b2c3d HEAD@{5}: commit: Bad commit (reset)', delay: 5 },
  { type: 'output', content: 'b2c3d4e HEAD@{6}: commit: Initial setup', delay: 5 },
];

// 查看特定分支的 reflog
export const reflogBranch: RemotionTerminalLine[] = [
  { type: 'input', content: 'git reflog show feature', delay: 0 },
  { type: 'output', content: 'c3d4e5f (feature) HEAD@{0}: commit: Feature work', delay: 15 },
  { type: 'output', content: 'b2c3d4e HEAD@{1}: branch: Created from HEAD', delay: 5 },
];

// 查看最近 N 条记录
export const reflogRecent: RemotionTerminalLine[] = [
  { type: 'input', content: 'git reflog -5', delay: 0 },
  { type: 'output', content: 'e5f6g7h (HEAD -> main) HEAD@{0}: commit: Add new feature', delay: 15 },
  { type: 'output', content: 'd4e5f6g HEAD@{1}: checkout: moving from feature to main', delay: 5 },
  { type: 'output', content: 'c3d4e5f (feature) HEAD@{2}: commit: Feature work', delay: 5 },
  { type: 'output', content: 'b2c3d4e HEAD@{3}: checkout: moving from main to feature', delay: 5 },
  { type: 'output', content: 'b2c3d4e HEAD@{4}: reset: moving to HEAD~1', delay: 5 },
];

// 使用 reflog 恢复误删的提交
export const reflogRecover: RemotionTerminalLine[] = [
  { type: 'input', content: 'git reflog', delay: 0 },
  { type: 'output', content: 'e5f6g7h (HEAD -> main) HEAD@{0}: reset: moving to HEAD~1', delay: 15 },
  { type: 'output', content: 'f6g7h8i HEAD@{1}: commit: Important work (lost)', delay: 5 },
  { type: 'output', content: 'd4e5f6g HEAD@{2}: commit: Previous commit', delay: 5 },
  { type: 'input', content: '# 恢复丢失的提交', delay: 20 },
  { type: 'input', content: 'git cherry-pick f6g7h8i', delay: 20 },
  { type: 'output', content: '[main g7h8i9j] Important work (lost)', delay: 20 },
  { type: 'output', content: ' 2 files changed, 50 insertions(+)', delay: 5 },
];

// 使用 reflog 撤销 reset
export const reflogUndoReset: RemotionTerminalLine[] = [
  { type: 'input', content: 'git reflog', delay: 0 },
  { type: 'output', content: 'e5f6g7h (HEAD -> main) HEAD@{0}: reset: moving to HEAD~2', delay: 15 },
  { type: 'output', content: 'g7h8i9j HEAD@{1}: commit: Third commit', delay: 5 },
  { type: 'output', content: 'f6g7h8i HEAD@{2}: commit: Second commit', delay: 5 },
  { type: 'output', content: 'e5f6g7h HEAD@{3}: commit: First commit', delay: 5 },
  { type: 'input', content: '# 撤销 reset 操作', delay: 20 },
  { type: 'input', content: 'git reset --hard g7h8i9j', delay: 20 },
  { type: 'output', content: 'HEAD is now at g7h8i9j Third commit', delay: 15 },
];

// 使用 reflog 恢复误删的分支
export const reflogRecoverBranch: RemotionTerminalLine[] = [
  { type: 'input', content: 'git reflog', delay: 0 },
  { type: 'output', content: 'e5f6g7h (HEAD -> main) HEAD@{0}: checkout: moving from feature to main', delay: 15 },
  { type: 'output', content: 'c3d4e5f HEAD@{1}: branch: Deleted feature', delay: 5 },
  { type: 'output', content: 'c3d4e5f HEAD@{2}: commit: Feature work', delay: 5 },
  { type: 'input', content: '# 重新创建分支指向丢失的提交', delay: 20 },
  { type: 'input', content: 'git branch feature c3d4e5f', delay: 20 },
  { type: 'input', content: 'git branch', delay: 15 },
  { type: 'output', content: '  feature', delay: 15 },
  { type: 'output', content: '* main', delay: 5 },
];

// 清理过期的 reflog 记录
export const reflogExpire: RemotionTerminalLine[] = [
  { type: 'input', content: 'git reflog expire --expire=30.days.ago --all', delay: 0 },
  { type: 'output', content: '', delay: 15 },
];

// 删除特定引用的 reflog
export const reflogDelete: RemotionTerminalLine[] = [
  { type: 'input', content: 'git reflog delete HEAD@{5}', delay: 0 },
  { type: 'output', content: '', delay: 15 },
];

// reflog 显示详细信息
export const reflogVerbose: RemotionTerminalLine[] = [
  { type: 'input', content: 'git reflog --verbose', delay: 0 },
  { type: 'output', content: 'e5f6g7h HEAD@{0}: commit: Add new feature', delay: 15 },
  { type: 'output', content: 'd4e5f6g HEAD@{1}: checkout: moving from feature to main', delay: 5 },
];

// 查看所有引用的 reflog
export const reflogAll: RemotionTerminalLine[] = [
  { type: 'input', content: 'git reflog show --all', delay: 0 },
  { type: 'output', content: 'e5f6g7h (HEAD -> main) HEAD@{0}: commit: Add new feature', delay: 15 },
  { type: 'output', content: 'c3d4e5f (feature) feature@{0}: commit: Feature work', delay: 5 },
  { type: 'output', content: 'a1b2c3d (stash) stash@{0}: WIP on main: commit message', delay: 5 },
];

// 时间格式显示
export const reflogTime: RemotionTerminalLine[] = [
  { type: 'input', content: 'git reflog --date=iso', delay: 0 },
  { type: 'output', content: 'e5f6g7h HEAD@{2024-01-15 10:30:00 +0800}: commit: Add new feature', delay: 15 },
  { type: 'output', content: 'd4e5f6g HEAD@{2024-01-15 10:00:00 +0800}: checkout: moving from feature', delay: 5 },
];

// reflog 与 reset 组合恢复
export const reflogResetRecover: RemotionTerminalLine[] = [
  { type: 'input', content: '# 误操作: reset --hard 丢失了重要提交', delay: 0 },
  { type: 'input', content: 'git reflog', delay: 15 },
  { type: 'output', content: 'e5f6g7h (HEAD -> main) HEAD@{0}: reset: moving to HEAD~3', delay: 15 },
  { type: 'output', content: 'h8i9j0k HEAD@{1}: commit: Important work', delay: 5 },
  { type: 'output', content: 'g7h8i9j HEAD@{2}: commit: More work', delay: 5 },
  { type: 'output', content: 'f6g7h8i HEAD@{3}: commit: Started work', delay: 5 },
  { type: 'input', content: '# 恢复到丢失的提交', delay: 20 },
  { type: 'input', content: 'git reset --hard h8i9j0k', delay: 20 },
  { type: 'output', content: 'HEAD is now at h8i9j0k Important work', delay: 15 },
];
