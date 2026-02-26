// git remote 远程仓库操作配置
import { RemotionTerminalLine } from '../../components/Terminal';

// 查看远程仓库
export const remoteList: RemotionTerminalLine[] = [
  { type: 'input', content: 'git remote -v', delay: 0 },
  { type: 'output', content: 'origin  https://github.com/user/repo.git (fetch)', delay: 15 },
  { type: 'output', content: 'origin  https://github.com/user/repo.git (push)', delay: 5 },
];

// 添加远程仓库
export const remoteAdd: RemotionTerminalLine[] = [
  { type: 'input', content: 'git remote add upstream https://github.com/original/repo.git', delay: 0 },
  { type: 'input', content: 'git remote -v', delay: 30 },
  { type: 'output', content: 'origin    https://github.com/user/repo.git (fetch)', delay: 15 },
  { type: 'output', content: 'origin    https://github.com/user/repo.git (push)', delay: 5 },
  { type: 'output', content: 'upstream  https://github.com/original/repo.git (fetch)', delay: 5 },
  { type: 'output', content: 'upstream  https://github.com/original/repo.git (push)', delay: 5 },
];

// 推送到远程
export const pushToRemote: RemotionTerminalLine[] = [
  { type: 'input', content: 'git push origin main', delay: 0 },
  { type: 'output', content: 'Enumerating objects: 5, done.', delay: 15 },
  { type: 'output', content: 'Counting objects: 100% (5/5), done.', delay: 5 },
  { type: 'output', content: 'Writing objects: 100% (3/3), 320 bytes | 320.00 KiB/s, done.', delay: 5 },
  { type: 'output', content: 'Total 3 (delta 1), reused 0 (delta 0), pack-reused 0', delay: 5 },
  { type: 'output', content: 'remote: Resolving deltas: 100% (1/1), completed with 1 local object.', delay: 5 },
  { type: 'output', content: 'To https://github.com/user/repo.git', delay: 5 },
  { type: 'output', content: '   a1b2c3d..d4e5f6g  main -> main', delay: 5 },
];

// 从远程拉取
export const pullFromRemote: RemotionTerminalLine[] = [
  { type: 'input', content: 'git pull origin main', delay: 0 },
  { type: 'output', content: 'remote: Enumerating objects: 5, done.', delay: 15 },
  { type: 'output', content: 'remote: Counting objects: 100% (5/5), done.', delay: 5 },
  { type: 'output', content: 'Unpacking objects: 100% (3/3), done.', delay: 5 },
  { type: 'output', content: 'From https://github.com/user/repo', delay: 5 },
  { type: 'output', content: ' * branch            main       -> FETCH_HEAD', delay: 5 },
  { type: 'output', content: '   a1b2c3d..d4e5f6g  main       -> origin/main', delay: 5 },
  { type: 'output', content: 'Updating a1b2c3d..d4e5f6g', delay: 5 },
  { type: 'output', content: 'Fast-forward', delay: 5 },
  { type: 'output', content: ' src/new.js | 20 ++++++++++++++++++++', delay: 5 },
  { type: 'output', content: ' 1 file changed, 20 insertions(+)', delay: 5 },
];

// 克隆远程仓库
export const cloneRemote: RemotionTerminalLine[] = [
  { type: 'input', content: 'git clone https://github.com/user/repo.git', delay: 0 },
  { type: 'output', content: 'Cloning into \'repo\'...', delay: 15 },
  { type: 'output', content: 'remote: Enumerating objects: 100, done.', delay: 5 },
  { type: 'output', content: 'remote: Counting objects: 100% (100/100), done.', delay: 5 },
  { type: 'output', content: 'remote: Compressing objects: 100% (80/80), done.', delay: 5 },
  { type: 'output', content: 'Receiving objects: 100% (100/100), 1.20 MiB | 2.50 MiB/s, done.', delay: 5 },
  { type: 'output', content: 'Resolving deltas: 100% (50/50), done.', delay: 5 },
];
