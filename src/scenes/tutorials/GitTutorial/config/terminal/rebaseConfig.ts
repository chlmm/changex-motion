// git rebase 变基操作配置
import { RemotionTerminalLine } from '../../components/Terminal';

// 基础变基
export const rebaseBasic: RemotionTerminalLine[] = [
  { type: 'input', content: 'git checkout feature', delay: 0 },
  { type: 'output', content: "Switched to branch 'feature'", delay: 15 },
  { type: 'input', content: 'git rebase main', delay: 20 },
  { type: 'output', content: 'Successfully rebased (no refresh).', delay: 20 },
];

// 变基过程中的提交
export const rebaseProcess: RemotionTerminalLine[] = [
  { type: 'input', content: 'git rebase main', delay: 0 },
  { type: 'output', content: 'First, rewinding head to replay your work on top of it...', delay: 15 },
  { type: 'output', content: 'Applying: Add feature A', delay: 10 },
  { type: 'output', content: 'Applying: Add feature B', delay: 10 },
  { type: 'output', content: 'Applying: Fix bug in feature', delay: 10 },
  { type: 'output', content: 'Successfully rebased and updated refs/heads/feature.', delay: 10 },
];

// 变基冲突处理
export const rebaseConflict: RemotionTerminalLine[] = [
  { type: 'input', content: 'git rebase main', delay: 0 },
  { type: 'output', content: 'Auto-merging src/index.js', delay: 15 },
  { type: 'output', content: 'CONFLICT (content): Merge conflict in src/index.js', delay: 10 },
  { type: 'output', content: 'error: could not apply d4e5f6g... Add feature', delay: 5 },
  { type: 'output', content: 'hint: Resolve all conflicts manually, mark them as resolved with', delay: 5 },
  { type: 'output', content: 'hint: "git add/rm <conflicted_files>", then run "git rebase --continue".', delay: 5 },
  { type: 'output', content: 'hint: You can instead skip this commit: run "git rebase --skip".', delay: 5 },
  { type: 'output', content: 'hint: To abort and get back to the state before "git rebase", run "git rebase --abort".', delay: 5 },
];

// 解决冲突后继续变基
export const rebaseContinue: RemotionTerminalLine[] = [
  { type: 'input', content: '# 解决冲突后', delay: 0 },
  { type: 'input', content: 'git add src/index.js', delay: 15 },
  { type: 'input', content: 'git rebase --continue', delay: 20 },
  { type: 'output', content: 'Applying: Add feature', delay: 15 },
  { type: 'output', content: 'Successfully rebased and updated refs/heads/feature.', delay: 10 },
];

// 跳过当前提交
export const rebaseSkip: RemotionTerminalLine[] = [
  { type: 'input', content: 'git rebase --skip', delay: 0 },
  { type: 'output', content: 'Applying: Next commit message', delay: 15 },
  { type: 'output', content: 'Successfully rebased and updated refs/heads/feature.', delay: 10 },
];

// 中止变基
export const rebaseAbort: RemotionTerminalLine[] = [
  { type: 'input', content: 'git rebase --abort', delay: 0 },
  { type: 'output', content: '', delay: 15 },
];

// 交互式变基
export const rebaseInteractive: RemotionTerminalLine[] = [
  { type: 'input', content: 'git rebase -i HEAD~3', delay: 0 },
  { type: 'output', content: 'pick d4e5f6g Add feature A', delay: 15 },
  { type: 'output', content: 'pick e5f6g7h Add feature B', delay: 5 },
  { type: 'output', content: 'pick f6g7h8i Fix bug', delay: 5 },
  { type: 'output', content: '', delay: 2 },
  { type: 'output', content: '# Rebase instructions:', delay: 5 },
  { type: 'output', content: '# p, pick = use commit', delay: 3 },
  { type: 'output', content: '# r, reword = use commit, but edit the commit message', delay: 3 },
  { type: 'output', content: '# e, edit = use commit, but stop for amending', delay: 3 },
  { type: 'output', content: '# s, squash = use commit, but meld into previous commit', delay: 3 },
  { type: 'output', content: '# f, fixup = like "squash", but discard this commit\'s log message', delay: 3 },
  { type: 'output', content: '# d, drop = remove commit', delay: 3 },
];

// 交互式变基 - 压缩提交
export const rebaseSquash: RemotionTerminalLine[] = [
  { type: 'input', content: '# 编辑器中将 pick 改为 squash', delay: 0 },
  { type: 'output', content: 'pick d4e5f6g Add feature A', delay: 15 },
  { type: 'output', content: 'squash e5f6g7h Add feature B', delay: 5 },
  { type: 'output', content: 'squash f6g7h8i Fix bug', delay: 5 },
  { type: 'output', content: '', delay: 2 },
  { type: 'output', content: '# Save and exit editor', delay: 5 },
  { type: 'output', content: '', delay: 3 },
  { type: 'output', content: '# This is a combination of 3 commits.', delay: 10 },
  { type: 'output', content: '# This is the 1st commit message:', delay: 3 },
  { type: 'output', content: 'Add feature A', delay: 3 },
  { type: 'output', content: '', delay: 2 },
  { type: 'output', content: '# This is the 2nd commit message:', delay: 3 },
  { type: 'output', content: 'Add feature B', delay: 3 },
  { type: 'output', content: '', delay: 2 },
  { type: 'output', content: '# This is the 3rd commit message:', delay: 3 },
  { type: 'output', content: 'Fix bug', delay: 3 },
];

// 交互式变基 - 编辑提交
export const rebaseEdit: RemotionTerminalLine[] = [
  { type: 'input', content: '# 编辑器中将 pick 改为 edit', delay: 0 },
  { type: 'output', content: 'pick d4e5f6g Add feature A', delay: 15 },
  { type: 'output', content: 'edit e5f6g7h Add feature B', delay: 5 },
  { type: 'output', content: 'pick f6g7h8i Fix bug', delay: 5 },
  { type: 'output', content: '', delay: 3 },
  { type: 'output', content: 'Stopped at e5f6g7h... Add feature B', delay: 10 },
  { type: 'output', content: 'You can amend the commit now, with', delay: 5 },
  { type: 'output', content: '', delay: 2 },
  { type: 'output', content: '  git commit --amend', delay: 5 },
  { type: 'output', content: '', delay: 2 },
  { type: 'output', content: 'Once you are satisfied with your changes, run', delay: 5 },
  { type: 'output', content: '', delay: 2 },
  { type: 'output', content: '  git rebase --continue', delay: 5 },
];

// 变基到特定提交
export const rebaseOnto: RemotionTerminalLine[] = [
  { type: 'input', content: 'git rebase --onto main feature-a feature-b', delay: 0 },
  { type: 'output', content: 'First, rewinding head to replay your work on top of it...', delay: 15 },
  { type: 'output', content: 'Applying: Feature B changes', delay: 10 },
  { type: 'output', content: 'Successfully rebased and updated refs/heads/feature-b.', delay: 10 },
];

// 变基后强制推送
export const rebaseForcePush: RemotionTerminalLine[] = [
  { type: 'input', content: '# 变基后需要强制推送（已推送的分支）', delay: 0 },
  { type: 'input', content: 'git push --force-with-lease origin feature', delay: 15 },
  { type: 'output', content: 'Enumerating objects: 5, done.', delay: 15 },
  { type: 'output', content: 'Counting objects: 100% (5/5), done.', delay: 5 },
  { type: 'output', content: 'Writing objects: 100% (3/3), 320 bytes | 320.00 KiB/s, done.', delay: 5 },
  { type: 'output', content: 'Total 3 (delta 1), reused 0 (delta 0), pack-reused 0', delay: 5 },
  { type: 'output', content: 'To https://github.com/user/repo.git', delay: 5 },
  { type: 'output', content: ' + d4e5f6g...g7h8i9j feature -> feature (forced update)', delay: 5 },
];

// 自动变基拉取
export const pullRebase: RemotionTerminalLine[] = [
  { type: 'input', content: 'git pull --rebase origin main', delay: 0 },
  { type: 'output', content: 'From https://github.com/user/repo', delay: 15 },
  { type: 'output', content: ' * branch            main       -> FETCH_HEAD', delay: 5 },
  { type: 'output', content: '   a1b2c3d..d4e5f6g  main       -> origin/main', delay: 5 },
  { type: 'output', content: 'First, rewinding head to replay your work on top of it...', delay: 5 },
  { type: 'output', content: 'Applying: Local commit 1', delay: 5 },
  { type: 'output', content: 'Applying: Local commit 2', delay: 5 },
  { type: 'output', content: 'Successfully rebased and updated refs/heads/main.', delay: 5 },
];
