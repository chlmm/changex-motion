// Dockerfile 相关配置
import { RemotionTerminalLine } from '../../components/Terminal';

// 查看 Dockerfile
export const viewDockerfile: RemotionTerminalLine[] = [
  { type: 'input', content: 'cat Dockerfile', delay: 0 },
  { type: 'output', content: '# 基础镜像', delay: 15 },
  { type: 'output', content: 'FROM node:18-alpine', delay: 5 },
  { type: 'output', content: '', delay: 2 },
  { type: 'output', content: '# 设置工作目录', delay: 3 },
  { type: 'output', content: 'WORKDIR /app', delay: 3 },
  { type: 'output', content: '', delay: 2 },
  { type: 'output', content: '# 复制依赖文件', delay: 3 },
  { type: 'output', content: 'COPY package*.json ./', delay: 3 },
  { type: 'output', content: '', delay: 2 },
  { type: 'output', content: '# 安装依赖', delay: 3 },
  { type: 'output', content: 'RUN npm install', delay: 3 },
  { type: 'output', content: '', delay: 2 },
  { type: 'output', content: '# 复制源代码', delay: 3 },
  { type: 'output', content: 'COPY . .', delay: 3 },
  { type: 'output', content: '', delay: 2 },
  { type: 'output', content: '# 暴露端口', delay: 3 },
  { type: 'output', content: 'EXPOSE 3000', delay: 3 },
  { type: 'output', content: '', delay: 2 },
  { type: 'output', content: '# 启动命令', delay: 3 },
  { type: 'output', content: 'CMD ["npm", "start"]', delay: 3 },
];

// 多阶段构建 Dockerfile
export const multiStageDockerfile: RemotionTerminalLine[] = [
  { type: 'input', content: 'cat Dockerfile.prod', delay: 0 },
  { type: 'output', content: '# 构建阶段', delay: 15 },
  { type: 'output', content: 'FROM node:18 AS builder', delay: 5 },
  { type: 'output', content: 'WORKDIR /app', delay: 3 },
  { type: 'output', content: 'COPY package*.json ./', delay: 3 },
  { type: 'output', content: 'RUN npm install', delay: 5 },
  { type: 'output', content: 'COPY . .', delay: 3 },
  { type: 'output', content: 'RUN npm run build', delay: 5 },
  { type: 'output', content: '', delay: 2 },
  { type: 'output', content: '# 生产阶段', delay: 3 },
  { type: 'output', content: 'FROM nginx:alpine', delay: 3 },
  { type: 'output', content: 'COPY --from=builder /app/build /usr/share/nginx/html', delay: 5 },
  { type: 'output', content: 'EXPOSE 80', delay: 3 },
  { type: 'output', content: 'CMD ["nginx", "-g", "daemon off;"]', delay: 3 },
];

// 构建镜像
export const buildFromDockerfile: RemotionTerminalLine[] = [
  { type: 'input', content: 'docker build -t myapp:latest .', delay: 0 },
  { type: 'output', content: '[+] Building 45.2s (12/12) FINISHED', delay: 15 },
  { type: 'output', content: ' => [internal] load build definition from Dockerfile', delay: 5 },
  { type: 'output', content: ' => [internal] load .dockerignore', delay: 3 },
  { type: 'output', content: ' => [internal] load metadata for docker.io/library/node:18', delay: 5 },
  { type: 'output', content: ' => [1/5] FROM docker.io/library/node:18', delay: 10 },
  { type: 'output', content: ' => [2/5] WORKDIR /app', delay: 3 },
  { type: 'output', content: ' => [3/5] COPY package*.json ./', delay: 3 },
  { type: 'output', content: ' => [4/5] RUN npm install', delay: 15 },
  { type: 'output', content: ' => [5/5] COPY . .', delay: 5 },
  { type: 'output', content: ' => exporting to image', delay: 5 },
  { type: 'output', content: ' => => writing image sha256:a1b2c3d4...', delay: 3 },
  { type: 'output', content: ' => => naming to docker.io/library/myapp:latest', delay: 3 },
];

// 构建时传递参数
export const buildWithArgs: RemotionTerminalLine[] = [
  { type: 'input', content: 'docker build --build-arg NODE_ENV=production -t myapp:prod .', delay: 0 },
  { type: 'output', content: '[+] Building 50.1s (13/13) FINISHED', delay: 15 },
  { type: 'output', content: ' => [internal] load build definition from Dockerfile', delay: 5 },
  { type: 'output', content: ' => [internal] load build context', delay: 3 },
  { type: 'output', content: 'Successfully tagged myapp:prod', delay: 10 },
];

// 不使用缓存构建
export const buildNoCache: RemotionTerminalLine[] = [
  { type: 'input', content: 'docker build --no-cache -t myapp:fresh .', delay: 0 },
  { type: 'output', content: '[+] Building 120.5s (12/12) FINISHED', delay: 15 },
  { type: 'output', content: ' => [1/5] FROM docker.io/library/node:18', delay: 10 },
  { type: 'output', content: ' => [2/5] WORKDIR /app', delay: 5 },
  { type: 'output', content: 'Successfully tagged myapp:fresh', delay: 10 },
];

// 查看 .dockerignore
export const viewDockerignore: RemotionTerminalLine[] = [
  { type: 'input', content: 'cat .dockerignore', delay: 0 },
  { type: 'output', content: 'node_modules', delay: 15 },
  { type: 'output', content: 'npm-debug.log', delay: 3 },
  { type: 'output', content: 'Dockerfile', delay: 3 },
  { type: 'output', content: '.dockerignore', delay: 3 },
  { type: 'output', content: '.git', delay: 3 },
  { type: 'output', content: '.gitignore', delay: 3 },
  { type: 'output', content: 'README.md', delay: 3 },
  { type: 'output', content: '.env', delay: 3 },
];

// 最佳实践 Dockerfile
export const bestPracticesDockerfile: RemotionTerminalLine[] = [
  { type: 'input', content: 'cat Dockerfile.best', delay: 0 },
  { type: 'output', content: '# 使用特定版本标签', delay: 15 },
  { type: 'output', content: 'FROM node:18.19.0-alpine3.19', delay: 5 },
  { type: 'output', content: '', delay: 2 },
  { type: 'output', content: '# 创建非 root 用户', delay: 3 },
  { type: 'output', content: 'RUN addgroup -g 1001 -S nodejs && \\', delay: 3 },
  { type: 'output', content: '    adduser -S nextjs -u 1001', delay: 3 },
  { type: 'output', content: '', delay: 2 },
  { type: 'output', content: '# 设置工作目录', delay: 3 },
  { type: 'output', content: 'WORKDIR /app', delay: 3 },
  { type: 'output', content: '', delay: 2 },
  { type: 'output', content: '# 先复制依赖文件并安装', delay: 3 },
  { type: 'output', content: 'COPY package*.json ./', delay: 3 },
  { type: 'output', content: 'RUN npm ci --only=production', delay: 5 },
  { type: 'output', content: '', delay: 2 },
  { type: 'output', content: '# 复制源代码', delay: 3 },
  { type: 'output', content: 'COPY --chown=nextjs:nodejs . .', delay: 3 },
  { type: 'output', content: '', delay: 2 },
  { type: 'output', content: '# 切换到非 root 用户', delay: 3 },
  { type: 'output', content: 'USER nextjs', delay: 3 },
  { type: 'output', content: '', delay: 2 },
  { type: 'output', content: 'EXPOSE 3000', delay: 3 },
  { type: 'output', content: 'CMD ["node", "server.js"]', delay: 3 },
];
