// 分支高级操作配置
import { RemotionTerminalLine } from '../../components/Terminal';

// ========== git switch (Git 2.23+) ==========

// 切换分支
export const switchBranch: RemotionTerminalLine[] = [
  { type: 'input', content: 'git switch main', delay: 0 },
  { type: 'output', content: "Switched to branch 'main'", delay: 15 },
];

// 创建并切换分支
export const switchCreate: RemotionTerminalLine[] = [
  { type: 'input', content: 'git switch -c feature-login', delay: 0 },
  { type: 'output', content: "Switched to a new branch 'feature-login'", delay: 15 },
];

// 切换到上一个分支
export const switchPrevious: RemotionTerminalLine[] = [
  { type: 'input', content: 'git switch -', delay: 0 },
  { type: 'output', content: "Switched to branch 'main'", delay: 15 },
];

// 切换到远程分支
export const switchRemote: RemotionTerminalLine[] = [
  { type: 'input', content: 'git switch -c feature origin/feature', delay: 0 },
  { type: 'output', content: "branch 'feature' set up to track 'origin/feature'.", delay: 15 },
  { type: 'output', content: "Switched to a new branch 'feature'", delay: 5 },
];

// 强制切换（丢弃本地修改）
export const switchForce: RemotionTerminalLine[] = [
  { type: 'input', content: 'git switch -f main', delay: 0 },
  { type: 'output', content: "Switched to branch 'main'", delay: 15 },
];

// ========== git checkout -b (传统方式) ==========

// 创建并切换分支
export const checkoutCreate: RemotionTerminalLine[] = [
  { type: 'input', content: 'git checkout -b feature-login', delay: 0 },
  { type: 'output', content: "Switched to a new branch 'feature-login'", delay: 15 },
];

// 基于远程分支创建
export const checkoutRemote: RemotionTerminalLine[] = [
  { type: 'input', content: 'git checkout -b feature origin/feature', delay: 0 },
  { type: 'output', content: "branch 'feature' set up to track 'origin/feature'.", delay: 15 },
  { type: 'output', content: "Switched to a new branch 'feature'", delay: 5 },
];

// ========== git branch 删除操作 ==========

// 安全删除已合并的分支
export const branchDelete: RemotionTerminalLine[] = [
  { type: 'input', content: 'git branch -d feature-login', delay: 0 },
  { type: 'output', content: "Deleted branch feature-login (was d4e5f6g).", delay: 15 },
];

// 强制删除未合并的分支
export const branchDeleteForce: RemotionTerminalLine[] = [
  { type: 'input', content: 'git branch -D feature-incomplete', delay: 0 },
  { type: 'output', content: "Deleted branch feature-incomplete (was e5f6g7h).", delay: 15 },
];

// 删除远程分支
export const branchDeleteRemote: RemotionTerminalLine[] = [
  { type: 'input', content: 'git push origin --delete old-feature', delay: 0 },
  { type: 'output', content: 'To https://github.com/user/repo.git', delay: 15 },
  { type: 'output', content: ' - [deleted]         old-feature', delay: 5 },
];

// 删除本地跟踪的已删除远程分支
export const branchPrune: RemotionTerminalLine[] = [
  { type: 'input', content: 'git branch -vv', delay: 0 },
  { type: 'output', content: '  feature     d4e5f6g [origin/feature: gone] Feature work', delay: 15 },
  { type: 'output', content: '* main        e5f6g7h [origin/main] Main branch', delay: 5 },
  { type: 'input', content: 'git branch -d feature', delay: 20 },
  { type: 'output', content: "Deleted branch feature (was d4e5f6g).", delay: 15 },
];

// ========== git branch 重命名 ==========

// 重命名当前分支
export const branchRename: RemotionTerminalLine[] = [
  { type: 'input', content: 'git branch -m new-feature-name', delay: 0 },
  { type: 'output', content: '', delay: 15 },
];

// 重命名指定分支
export const branchRenameSpecific: RemotionTerminalLine[] = [
  { type: 'input', content: 'git branch -m old-name new-name', delay: 0 },
  { type: 'output', content: '', delay: 15 },
];

// ========== git branch 查看操作 ==========

// 查看所有分支（含远程）
export const branchListAll: RemotionTerminalLine[] = [
  { type: 'input', content: 'git branch -a', delay: 0 },
  { type: 'output', content: '  develop', delay: 15 },
  { type: 'output', content: '* main', delay: 5 },
  { type: 'output', content: '  remotes/origin/HEAD -> origin/main', delay: 5 },
  { type: 'output', content: '  remotes/origin/develop', delay: 5 },
  { type: 'output', content: '  remotes/origin/main', delay: 5 },
  { type: 'output', content: '  remotes/origin/feature', delay: 5 },
];

// 查看分支详细信息
export const branchVerbose: RemotionTerminalLine[] = [
  { type: 'input', content: 'git branch -vv', delay: 0 },
  { type: 'output', content: '  develop  d4e5f6g [origin/develop] Develop branch', delay: 15 },
  { type: 'output', content: '* main     e5f6g7h [origin/main] Main branch', delay: 5 },
  { type: 'output', content: '  feature  f6g7h8i [origin/feature: ahead 2] Feature work', delay: 5 },
];

// 查看已合并的分支
export const branchMerged: RemotionTerminalLine[] = [
  { type: 'input', content: 'git branch --merged main', delay: 0 },
  { type: 'output', content: '  develop', delay: 15 },
  { type: 'output', content: '* main', delay: 5 },
];

// 查看未合并的分支
export const branchNoMerged: RemotionTerminalLine[] = [
  { type: 'input', content: 'git branch --no-merged main', delay: 0 },
  { type: 'output', content: '  feature', delay: 15 },
  { type: 'output', content: '  hotfix', delay: 5 },
];

// ========== 分支追踪设置 ==========

// 设置上游分支
export const branchSetUpstream: RemotionTerminalLine[] = [
  { type: 'input', content: 'git branch -u origin/main main', delay: 0 },
  { type: 'output', content: "Branch 'main' set up to track remote branch 'origin/main'.", delay: 15 },
];

// 取消上游分支
export const branchUnsetUpstream: RemotionTerminalLine[] = [
  { type: 'input', content: 'git branch --unset-upstream feature', delay: 0 },
  { type: 'output', content: '', delay: 15 },
];
