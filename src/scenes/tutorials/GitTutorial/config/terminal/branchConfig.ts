// git branch 分支操作配置
import { RemotionTerminalLine } from '../../components/Terminal';

// 分支基本操作演示
export const branchBasicOperations: RemotionTerminalLine[] = [
  { type: 'input', content: 'git branch', delay: 0 },
  { type: 'output', content: '* main', delay: 15 },
  { type: 'input', content: 'git branch feature-login', delay: 30 },
  { type: 'input', content: 'git branch', delay: 20 },
  { type: 'output', content: '  feature-login', delay: 10 },
  { type: 'output', content: '* main', delay: 5 },
  { type: 'input', content: 'git checkout feature-login', delay: 30 },
  { type: 'output', content: "Switched to branch 'feature-login'", delay: 15 },
  { type: 'input', content: 'git add login.js', delay: 40 },
  { type: 'input', content: 'git commit -m "Add login feature"', delay: 30 },
  { type: 'output', content: '[feature-login d4e5f6g] Add login feature', delay: 15 },
  { type: 'output', content: ' 1 file changed, 80 insertions(+)', delay: 5 },
  { type: 'input', content: 'git checkout main', delay: 40 },
  { type: 'input', content: 'git merge feature-login', delay: 30 },
  { type: 'output', content: 'Updating a1b2c3d..d4e5f6g', delay: 10 },
  { type: 'output', content: 'Fast-forward', delay: 5 },
  { type: 'output', content: ' login.js | 80 ++++++++++++++++++++++++++++++++++++++++++++++++', delay: 5 },
  { type: 'output', content: ' 1 file changed, 80 insertions(+)', delay: 5 },
];
