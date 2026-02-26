// git 文件操作配置 (rm, mv)
import { RemotionTerminalLine } from '../../components/Terminal';

// ========== git rm 删除文件 ==========

// 从工作区和暂存区删除文件
export const rmFile: RemotionTerminalLine[] = [
  { type: 'input', content: 'git rm old-file.js', delay: 0 },
  { type: 'output', content: "rm 'old-file.js'", delay: 15 },
  { type: 'input', content: 'git status', delay: 20 },
  { type: 'output', content: 'On branch main', delay: 15 },
  { type: 'output', content: 'Changes to be committed:', delay: 5 },
  { type: 'output', content: '  (use "git restore --staged <file>..." to unstage)', delay: 3 },
  { type: 'output', content: '        deleted:    old-file.js', delay: 3 },
];

// 仅从暂存区删除（保留工作区文件）
export const rmCached: RemotionTerminalLine[] = [
  { type: 'input', content: 'git rm --cached config.local.js', delay: 0 },
  { type: 'output', content: "rm 'config.local.js'", delay: 15 },
  { type: 'input', content: 'git status', delay: 20 },
  { type: 'output', content: 'On branch main', delay: 15 },
  { type: 'output', content: 'Changes to be committed:', delay: 5 },
  { type: 'output', content: '        deleted:    config.local.js', delay: 3 },
  { type: 'output', content: '', delay: 2 },
  { type: 'output', content: 'Untracked files:', delay: 3 },
  { type: 'output', content: '        config.local.js', delay: 3 },
];

// 删除文件夹
export const rmDirectory: RemotionTerminalLine[] = [
  { type: 'input', content: 'git rm -r old-folder/', delay: 0 },
  { type: 'output', content: "rm 'old-folder/file1.js'", delay: 15 },
  { type: 'output', content: "rm 'old-folder/file2.js'", delay: 5 },
  { type: 'output', content: "rm 'old-folder/file3.js'", delay: 5 },
  { type: 'input', content: 'git status', delay: 20 },
  { type: 'output', content: 'On branch main', delay: 15 },
  { type: 'output', content: 'Changes to be committed:', delay: 5 },
  { type: 'output', content: '        deleted:    old-folder/file1.js', delay: 3 },
  { type: 'output', content: '        deleted:    old-folder/file2.js', delay: 3 },
  { type: 'output', content: '        deleted:    old-folder/file3.js', delay: 3 },
];

// 强制删除（已修改的文件）
export const rmForce: RemotionTerminalLine[] = [
  { type: 'input', content: 'git status', delay: 0 },
  { type: 'output', content: 'On branch main', delay: 15 },
  { type: 'output', content: 'Changes not staged for commit:', delay: 5 },
  { type: 'output', content: '        modified:   temp.js', delay: 3 },
  { type: 'input', content: 'git rm -f temp.js', delay: 30 },
  { type: 'output', content: "rm 'temp.js'", delay: 15 },
];

// 删除所有匹配的文件
export const rmPattern: RemotionTerminalLine[] = [
  { type: 'input', content: 'git rm "*.log"', delay: 0 },
  { type: 'output', content: "rm 'debug.log'", delay: 15 },
  { type: 'output', content: "rm 'error.log'", delay: 5 },
  { type: 'output', content: "rm 'access.log'", delay: 5 },
];

// 递归删除缓存的文件
export const rmCachedRecursive: RemotionTerminalLine[] = [
  { type: 'input', content: 'git rm -r --cached node_modules/', delay: 0 },
  { type: 'output', content: "rm 'node_modules/package1/index.js'", delay: 15 },
  { type: 'output', content: "rm 'node_modules/package2/index.js'", delay: 5 },
  { type: 'output', content: '... (many more files)', delay: 5 },
];

// ========== git mv 移动/重命名文件 ==========

// 重命名文件
export const mvRename: RemotionTerminalLine[] = [
  { type: 'input', content: 'git mv old-name.js new-name.js', delay: 0 },
  { type: 'input', content: 'git status', delay: 20 },
  { type: 'output', content: 'On branch main', delay: 15 },
  { type: 'output', content: 'Changes to be committed:', delay: 5 },
  { type: 'output', content: '  (use "git restore --staged <file>..." to unstage)', delay: 3 },
  { type: 'output', content: '        renamed:    old-name.js -> new-name.js', delay: 3 },
];

// 移动文件到目录
export const mvMove: RemotionTerminalLine[] = [
  { type: 'input', content: 'git mv utils.js src/utils/', delay: 0 },
  { type: 'input', content: 'git status', delay: 20 },
  { type: 'output', content: 'On branch main', delay: 15 },
  { type: 'output', content: 'Changes to be committed:', delay: 5 },
  { type: 'output', content: '        renamed:    utils.js -> src/utils/utils.js', delay: 3 },
];

// 移动并重命名
export const mvMoveRename: RemotionTerminalLine[] = [
  { type: 'input', content: 'git mv old-component.jsx src/components/MyComponent.tsx', delay: 0 },
  { type: 'input', content: 'git status', delay: 20 },
  { type: 'output', content: 'On branch main', delay: 15 },
  { type: 'output', content: 'Changes to be committed:', delay: 5 },
  { type: 'output', content: '        renamed:    old-component.jsx -> src/components/MyComponent.tsx', delay: 3 },
];

// 强制覆盖目标文件
export const mvForce: RemotionTerminalLine[] = [
  { type: 'input', content: 'git mv -f source.js target.js', delay: 0 },
  { type: 'output', content: '', delay: 15 },
];

// ========== 组合工作流 ==========

// 删除已删除的文件（同步 Git 和文件系统）
export const syncDeleted: RemotionTerminalLine[] = [
  { type: 'input', content: '# 文件系统中已删除文件，但 Git 仍跟踪', delay: 0 },
  { type: 'input', content: 'git status', delay: 15 },
  { type: 'output', content: 'On branch main', delay: 15 },
  { type: 'output', content: 'Changes not staged for commit:', delay: 5 },
  { type: 'output', content: '  (use "git add/rm <file>..." to update what will be committed)', delay: 3 },
  { type: 'output', content: '        deleted:    removed.js', delay: 3 },
  { type: 'input', content: 'git rm removed.js', delay: 30 },
  { type: 'output', content: "rm 'removed.js'", delay: 15 },
];

// 从版本控制移除但保留本地文件
export const removeFromVersionControl: RemotionTerminalLine[] = [
  { type: 'input', content: '# 将 .env 文件从版本控制移除，但保留本地', delay: 0 },
  { type: 'input', content: 'git rm --cached .env', delay: 15 },
  { type: 'output', content: "rm '.env'", delay: 15 },
  { type: 'input', content: 'echo ".env" >> .gitignore', delay: 20 },
  { type: 'input', content: 'git add .gitignore', delay: 15 },
  { type: 'input', content: 'git commit -m "Remove .env from version control"', delay: 20 },
  { type: 'output', content: '[main r8s9t0u] Remove .env from version control', delay: 20 },
  { type: 'output', content: ' 2 files changed, 1 insertion(+), 10 deletions(-)', delay: 5 },
];
