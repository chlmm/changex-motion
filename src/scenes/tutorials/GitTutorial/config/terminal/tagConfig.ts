// git tag 标签操作配置
import { RemotionTerminalLine } from '../../components/Terminal';

// 创建轻量标签
export const tagLightweight: RemotionTerminalLine[] = [
  { type: 'input', content: 'git tag v1.0.0', delay: 0 },
  { type: 'input', content: 'git tag', delay: 20 },
  { type: 'output', content: 'v1.0.0', delay: 15 },
];

// 创建附注标签
export const tagAnnotated: RemotionTerminalLine[] = [
  { type: 'input', content: 'git tag -a v1.0.0 -m "Release version 1.0.0"', delay: 0 },
  { type: 'input', content: 'git tag', delay: 20 },
  { type: 'output', content: 'v1.0.0', delay: 15 },
];

// 查看标签信息
export const tagShow: RemotionTerminalLine[] = [
  { type: 'input', content: 'git show v1.0.0', delay: 0 },
  { type: 'output', content: 'tag v1.0.0', delay: 15 },
  { type: 'output', content: 'Tagger: User <user@example.com>', delay: 5 },
  { type: 'output', content: 'Date:   Mon Jan 15 10:00:00 2024 +0800', delay: 5 },
  { type: 'output', content: '', delay: 2 },
  { type: 'output', content: 'Release version 1.0.0', delay: 3 },
  { type: 'output', content: '', delay: 2 },
  { type: 'output', content: 'commit a1b2c3d4e5f6g7h8i9j0', delay: 3 },
  { type: 'output', content: 'Author: User <user@example.com>', delay: 3 },
  { type: 'output', content: 'Date:   Mon Jan 15 09:30:00 2024 +0800', delay: 3 },
  { type: 'output', content: '', delay: 2 },
  { type: 'output', content: '    Final changes for release', delay: 3 },
];

// 推送标签到远程
export const tagPush: RemotionTerminalLine[] = [
  { type: 'input', content: 'git push origin v1.0.0', delay: 0 },
  { type: 'output', content: 'Enumerating objects: 1, done.', delay: 15 },
  { type: 'output', content: 'Counting objects: 100% (1/1), done.', delay: 5 },
  { type: 'output', content: 'Writing objects: 100% (1/1), 160 bytes | 160.00 KiB/s, done.', delay: 5 },
  { type: 'output', content: 'Total 1 (delta 0), reused 0 (delta 0), pack-reused 0', delay: 5 },
  { type: 'output', content: 'To https://github.com/user/repo.git', delay: 5 },
  { type: 'output', content: ' * [new tag]         v1.0.0 -> v1.0.0', delay: 5 },
];

// 删除标签
export const tagDelete: RemotionTerminalLine[] = [
  { type: 'input', content: 'git tag -d v1.0.0-beta', delay: 0 },
  { type: 'output', content: 'Deleted tag \'v1.0.0-beta\' (was a1b2c3d)', delay: 15 },
];
