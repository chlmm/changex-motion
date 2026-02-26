// git fetch 远程获取配置
import { RemotionTerminalLine } from '../../components/Terminal';

// 获取所有远程分支更新
export const fetchAll: RemotionTerminalLine[] = [
  { type: 'input', content: 'git fetch', delay: 0 },
  { type: 'output', content: 'remote: Enumerating objects: 25, done.', delay: 15 },
  { type: 'output', content: 'remote: Counting objects: 100% (25/25), done.', delay: 5 },
  { type: 'output', content: 'remote: Compressing objects: 100% (15/15), done.', delay: 5 },
  { type: 'output', content: 'remote: Total 20 (delta 10), reused 15 (delta 5), pack-reused 0', delay: 5 },
  { type: 'output', content: 'Unpacking objects: 100% (20/20), done.', delay: 5 },
  { type: 'output', content: 'From https://github.com/user/repo', delay: 5 },
  { type: 'output', content: '   a1b2c3d..d4e5f6g  main       -> origin/main', delay: 5 },
  { type: 'output', content: ' * [new branch]      feature    -> origin/feature', delay: 5 },
];

// 获取特定远程仓库
export const fetchRemote: RemotionTerminalLine[] = [
  { type: 'input', content: 'git fetch origin', delay: 0 },
  { type: 'output', content: 'From https://github.com/user/repo', delay: 15 },
  { type: 'output', content: '   d4e5f6g..e5f6g7h  main       -> origin/main', delay: 5 },
];

// 获取特定分支
export const fetchBranch: RemotionTerminalLine[] = [
  { type: 'input', content: 'git fetch origin main', delay: 0 },
  { type: 'output', content: 'From https://github.com/user/repo', delay: 15 },
  { type: 'output', content: ' * branch            main       -> FETCH_HEAD', delay: 5 },
  { type: 'output', content: '   d4e5f6g..e5f6g7h  main       -> origin/main', delay: 5 },
];

// 获取所有远程标签
export const fetchTags: RemotionTerminalLine[] = [
  { type: 'input', content: 'git fetch --tags', delay: 0 },
  { type: 'output', content: 'From https://github.com/user/repo', delay: 15 },
  { type: 'output', content: ' * [new tag]         v1.0.0     -> v1.0.0', delay: 5 },
  { type: 'output', content: ' * [new tag]         v1.1.0     -> v1.1.0', delay: 5 },
  { type: 'output', content: ' * [new tag]         v2.0.0     -> v2.0.0', delay: 5 },
];

// 获取并清理已删除的远程分支
export const fetchPrune: RemotionTerminalLine[] = [
  { type: 'input', content: 'git fetch -p', delay: 0 },
  { type: 'output', content: 'From https://github.com/user/repo', delay: 15 },
  { type: 'output', content: '   d4e5f6g..e5f6g7h  main       -> origin/main', delay: 5 },
  { type: 'output', content: ' x [deleted]         (none)     -> origin/old-feature', delay: 5 },
  { type: 'output', content: ' x [deleted]         (none)     -> origin/hotfix', delay: 5 },
];

// 获取并显示差异
export const fetchDryRun: RemotionTerminalLine[] = [
  { type: 'input', content: 'git fetch --dry-run', delay: 0 },
  { type: 'output', content: 'From https://github.com/user/repo', delay: 15 },
  { type: 'output', content: '   a1b2c3d..d4e5f6g  main       -> origin/main', delay: 5 },
  { type: 'output', content: ' * [new branch]      feature    -> origin/feature', delay: 5 },
  { type: 'output', content: ' * [new tag]         v1.0.0     -> v1.0.0', delay: 5 },
];

// 获取多个远程仓库
export const fetchMultiple: RemotionTerminalLine[] = [
  { type: 'input', content: 'git fetch --all', delay: 0 },
  { type: 'output', content: 'Fetching origin', delay: 15 },
  { type: 'output', content: 'From https://github.com/user/repo', delay: 5 },
  { type: 'output', content: '   d4e5f6g..e5f6g7h  main       -> origin/main', delay: 5 },
  { type: 'output', content: 'Fetching upstream', delay: 10 },
  { type: 'output', content: 'From https://github.com/original/repo', delay: 5 },
  { type: 'output', content: ' * [new branch]      develop    -> upstream/develop', delay: 5 },
];

// fetch 后查看与本地差异
export const fetchCompare: RemotionTerminalLine[] = [
  { type: 'input', content: 'git fetch origin', delay: 0 },
  { type: 'output', content: 'From https://github.com/user/repo', delay: 15 },
  { type: 'output', content: '   d4e5f6g..e5f6g7h  main       -> origin/main', delay: 5 },
  { type: 'input', content: 'git log HEAD..origin/main --oneline', delay: 30 },
  { type: 'output', content: 'e5f6g7h Fix critical bug', delay: 15 },
  { type: 'output', content: 'f6g7h8i Update dependencies', delay: 5 },
  { type: 'input', content: 'git diff HEAD..origin/main --stat', delay: 30 },
  { type: 'output', content: ' src/app.js    |  5 +++--', delay: 15 },
  { type: 'output', content: ' package.json |  2 +-', delay: 5 },
  { type: 'output', content: ' 2 files changed, 3 insertions(+), 4 deletions(-)', delay: 5 },
];

// fetch vs pull 对比说明
export const fetchVsPull: RemotionTerminalLine[] = [
  { type: 'input', content: '# git fetch: 下载更新但不合并', delay: 0 },
  { type: 'output', content: 'git fetch origin', delay: 15 },
  { type: 'output', content: 'git merge origin/main  # 手动合并', delay: 10 },
  { type: 'output', content: '', delay: 5 },
  { type: 'output', content: '# git pull: 下载并自动合并', delay: 10 },
  { type: 'output', content: 'git pull origin main', delay: 10 },
];
