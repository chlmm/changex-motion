// .gitignore 和忽略规则配置
import { RemotionTerminalLine } from '../../components/Terminal';

// 创建 .gitignore 文件
export const createGitignore: RemotionTerminalLine[] = [
  { type: 'input', content: 'cat > .gitignore << EOF', delay: 0 },
  { type: 'input', content: '# 依赖目录', delay: 10 },
  { type: 'input', content: 'node_modules/', delay: 5 },
  { type: 'input', content: 'vendor/', delay: 5 },
  { type: 'input', content: '', delay: 3 },
  { type: 'input', content: '# 构建输出', delay: 5 },
  { type: 'input', content: 'dist/', delay: 5 },
  { type: 'input', content: 'build/', delay: 5 },
  { type: 'input', content: '*.min.js', delay: 5 },
  { type: 'input', content: '', delay: 3 },
  { type: 'input', content: '# 环境配置', delay: 5 },
  { type: 'input', content: '.env', delay: 5 },
  { type: 'input', content: '.env.local', delay: 5 },
  { type: 'input', content: '.env.*.local', delay: 5 },
  { type: 'input', content: '', delay: 3 },
  { type: 'input', content: '# 日志文件', delay: 5 },
  { type: 'input', content: '*.log', delay: 5 },
  { type: 'input', content: 'npm-debug.log*', delay: 5 },
  { type: 'input', content: '', delay: 3 },
  { type: 'input', content: '# IDE 配置', delay: 5 },
  { type: 'input', content: '.idea/', delay: 5 },
  { type: 'input', content: '.vscode/', delay: 5 },
  { type: 'input', content: '*.swp', delay: 5 },
  { type: 'input', content: '', delay: 3 },
  { type: 'input', content: '# 系统文件', delay: 5 },
  { type: 'input', content: '.DS_Store', delay: 5 },
  { type: 'input', content: 'Thumbs.db', delay: 5 },
  { type: 'input', content: 'EOF', delay: 5 },
  { type: 'output', content: '', delay: 10 },
];

// 查看 .gitignore 效果
export const checkIgnore: RemotionTerminalLine[] = [
  { type: 'input', content: 'git status', delay: 0 },
  { type: 'output', content: 'On branch main', delay: 15 },
  { type: 'output', content: 'Untracked files:', delay: 5 },
  { type: 'output', content: '  (use "git add <file>..." to include in what will be committed)', delay: 3 },
  { type: 'output', content: '        .gitignore', delay: 3 },
  { type: 'output', content: '        src/', delay: 3 },
  { type: 'output', content: '', delay: 2 },
  { type: 'output', content: '# 注意: node_modules/, .env 等被忽略', delay: 5 },
];

// 检查特定文件是否被忽略
export const checkIgnoreFile: RemotionTerminalLine[] = [
  { type: 'input', content: 'git check-ignore -v .env', delay: 0 },
  { type: 'output', content: '.gitignore:8:.env    .env', delay: 15 },
];

// 检查未被忽略的原因
export const checkIgnoreVerbose: RemotionTerminalLine[] = [
  { type: 'input', content: 'git check-ignore -v src/index.js', delay: 0 },
  { type: 'output', content: '', delay: 15 },
  { type: 'output', content: '# 空输出表示文件未被忽略', delay: 5 },
];

// 添加忽略规则（临时）
export const excludeFile: RemotionTerminalLine[] = [
  { type: 'input', content: 'echo "temp-notes.txt" >> .git/info/exclude', delay: 0 },
  { type: 'output', content: '# 仅本地忽略，不影响仓库', delay: 15 },
];

// 强制添加被忽略的文件
export const forceAddIgnored: RemotionTerminalLine[] = [
  { type: 'input', content: 'git add -f .env.example', delay: 0 },
  { type: 'output', content: '', delay: 15 },
  { type: 'output', content: '# 强制添加被 .gitignore 匹配的文件', delay: 5 },
];

// 移除已跟踪文件的忽略状态
export const stopTracking: RemotionTerminalLine[] = [
  { type: 'input', content: '# 停止跟踪但保留本地文件', delay: 0 },
  { type: 'input', content: 'git rm --cached config.local.json', delay: 15 },
  { type: 'output', content: "rm 'config.local.json'", delay: 15 },
  { type: 'input', content: 'echo "config.local.json" >> .gitignore', delay: 20 },
  { type: 'input', content: 'git add .gitignore', delay: 15 },
];

// 查看所有忽略规则（包括全局）
export const listIgnored: RemotionTerminalLine[] = [
  { type: 'input', content: 'git ls-files --others --ignored --exclude-standard', delay: 0 },
  { type: 'output', content: '.env', delay: 15 },
  { type: 'output', content: 'node_modules/', delay: 5 },
  { type: 'output', content: 'debug.log', delay: 5 },
];

// 全局 gitignore 配置
export const globalGitignore: RemotionTerminalLine[] = [
  { type: 'input', content: 'git config --global core.excludesfile ~/.gitignore_global', delay: 0 },
  { type: 'output', content: '', delay: 15 },
  { type: 'input', content: '# 创建全局忽略文件', delay: 15 },
  { type: 'input', content: 'cat > ~/.gitignore_global << EOF', delay: 10 },
  { type: 'input', content: '.DS_Store', delay: 5 },
  { type: 'input', content: 'Thumbs.db', delay: 5 },
  { type: 'input', content: '*.swp', delay: 5 },
  { type: 'input', content: '*~', delay: 5 },
  { type: 'input', content: 'EOF', delay: 5 },
];

// 否定模式（取消忽略）
export const negatePattern: RemotionTerminalLine[] = [
  { type: 'input', content: '# .gitignore 示例', delay: 0 },
  { type: 'output', content: '# 忽略所有 .log 文件', delay: 15 },
  { type: 'output', content: '*.log', delay: 5 },
  { type: 'output', content: '', delay: 3 },
  { type: 'output', content: '# 但保留 important.log', delay: 5 },
  { type: 'output', content: '!important.log', delay: 5 },
  { type: 'output', content: '', delay: 3 },
  { type: 'output', content: '# 忽略所有 docs 目录', delay: 5 },
  { type: 'output', content: 'docs/', delay: 5 },
  { type: 'output', content: '', delay: 3 },
  { type: 'output', content: '# 但不忽略 docs/api 目录', delay: 5 },
  { type: 'output', content: '!docs/api/', delay: 5 },
];

// 常见项目 .gitignore 模板
export const commonGitignore: RemotionTerminalLine[] = [
  { type: 'input', content: '# Node.js 项目', delay: 0 },
  { type: 'output', content: 'node_modules/', delay: 15 },
  { type: 'output', content: 'npm-debug.log', delay: 5 },
  { type: 'output', content: 'yarn-error.log', delay: 5 },
  { type: 'output', content: '.yarn-integrity', delay: 5 },
  { type: 'output', content: '', delay: 3 },
  { type: 'output', content: '# Python 项目', delay: 5 },
  { type: 'output', content: '__pycache__/', delay: 5 },
  { type: 'output', content: '*.py[cod]', delay: 5 },
  { type: 'output', content: '.Python', delay: 5 },
  { type: 'output', content: 'venv/', delay: 5 },
  { type: 'output', content: '', delay: 3 },
  { type: 'output', content: '# Java 项目', delay: 5 },
  { type: 'output', content: 'target/', delay: 5 },
  { type: 'output', content: '*.class', delay: 5 },
  { type: 'output', content: '*.jar', delay: 5 },
  { type: 'output', content: '.gradle/', delay: 5 },
];

// 清理已被跟踪的忽略文件
export const cleanTrackedIgnored: RemotionTerminalLine[] = [
  { type: 'input', content: '# 从 Git 缓存中删除所有被忽略的已跟踪文件', delay: 0 },
  { type: 'input', content: 'git rm -r --cached .', delay: 15 },
  { type: 'output', content: "rm '.env'", delay: 15 },
  { type: 'output', content: "rm 'debug.log'", delay: 5 },
  { type: 'input', content: 'git add .', delay: 20 },
  { type: 'input', content: 'git commit -m "Remove ignored files from tracking"', delay: 20 },
  { type: 'output', content: '[main s9t0u1v] Remove ignored files from tracking', delay: 20 },
  { type: 'output', content: ' 2 files changed, 0 insertions(+), 50 deletions(-)', delay: 5 },
];
