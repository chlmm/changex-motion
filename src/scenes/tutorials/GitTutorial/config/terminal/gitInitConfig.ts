// git init 命令的不同场景配置
import { RemotionTerminalLine } from '../../components/Terminal';

// 场景1：空目录首次初始化
export const gitInitFirstTime: RemotionTerminalLine[] = [
  { type: 'input', content: 'git init', delay: 0 },
  { type: 'output', content: 'Initialized empty Git repository in /project/.git/', delay: 20 },
];

// 场景2：已存在 .git 目录重新初始化
export const gitInitReinitialized: RemotionTerminalLine[] = [
  { type: 'input', content: 'git init', delay: 0 },
  { type: 'output', content: 'Reinitialized existing Git repository in /project/.git/', delay: 20 },
];

// 场景3：初始化并指定分支名
export const gitInitWithBranch: RemotionTerminalLine[] = [
  { type: 'input', content: 'git init -b main', delay: 0 },
  { type: 'output', content: 'Initialized empty Git repository in /project/.git/', delay: 20 },
];
