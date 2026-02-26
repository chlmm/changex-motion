// Docker 镜像操作配置
import { RemotionTerminalLine } from '../../components/Terminal';

// ========== 拉取镜像 ==========

// 拉取官方镜像
export const pullImage: RemotionTerminalLine[] = [
  { type: 'input', content: 'docker pull nginx', delay: 0 },
  { type: 'output', content: 'Using default tag: latest', delay: 15 },
  { type: 'output', content: 'latest: Pulling from library/nginx', delay: 5 },
  { type: 'output', content: 'a2abf6c4d29d: Pull complete', delay: 10 },
  { type: 'output', content: 'a9edb18cadd1: Pull complete', delay: 8 },
  { type: 'output', content: 'Digest: sha256:ee89b00528ff...', delay: 5 },
  { type: 'output', content: 'Status: Downloaded newer image for nginx:latest', delay: 5 },
];

// 拉取指定版本
export const pullTaggedImage: RemotionTerminalLine[] = [
  { type: 'input', content: 'docker pull node:18-alpine', delay: 0 },
  { type: 'output', content: '18-alpine: Pulling from library/node', delay: 15 },
  { type: 'output', content: 'c926b61bad3b: Pull complete', delay: 10 },
  { type: 'output', content: 'Digest: sha256:a5f6c2d...', delay: 5 },
  { type: 'output', content: 'Status: Downloaded newer image for node:18-alpine', delay: 5 },
];

// ========== 列出镜像 ==========

export const listImages: RemotionTerminalLine[] = [
  { type: 'input', content: 'docker images', delay: 0 },
  { type: 'output', content: 'REPOSITORY    TAG       IMAGE ID       CREATED        SIZE', delay: 15 },
  { type: 'output', content: 'nginx         latest    605c77e624dd   2 weeks ago    141MB', delay: 5 },
  { type: 'output', content: 'node          18        1c764a19dcb3   3 days ago     991MB', delay: 3 },
  { type: 'output', content: 'python        3.11      2d7e2d8e4c5a   1 week ago     914MB', delay: 3 },
  { type: 'output', content: 'redis         alpine    a8c4d2e5f1b6   5 days ago     28.5MB', delay: 3 },
];

// ========== 删除镜像 ==========

export const removeImage: RemotionTerminalLine[] = [
  { type: 'input', content: 'docker rmi nginx', delay: 0 },
  { type: 'output', content: 'Untagged: nginx:latest', delay: 15 },
  { type: 'output', content: 'Untagged: nginx@sha256:ee89b00528ff...', delay: 5 },
  { type: 'output', content: 'Deleted: sha256:605c77e624dd...', delay: 5 },
];

// 强制删除
export const forceRemoveImage: RemotionTerminalLine[] = [
  { type: 'input', content: 'docker rmi -f nginx', delay: 0 },
  { type: 'output', content: 'Untagged: nginx:latest', delay: 15 },
  { type: 'output', content: 'Deleted: sha256:605c77e624dd...', delay: 5 },
];

// ========== 构建镜像 ==========

export const buildImage: RemotionTerminalLine[] = [
  { type: 'input', content: 'docker build -t myapp:v1.0 .', delay: 0 },
  { type: 'output', content: 'Sending build context to Docker daemon  2.56kB', delay: 15 },
  { type: 'output', content: 'Step 1/5 : FROM node:18-alpine', delay: 10 },
  { type: 'output', content: ' ---> 1c764a19dcb3', delay: 5 },
  { type: 'output', content: 'Step 2/5 : WORKDIR /app', delay: 5 },
  { type: 'output', content: ' ---> Using cache', delay: 5 },
  { type: 'output', content: 'Step 3/5 : COPY package*.json ./', delay: 5 },
  { type: 'output', content: ' ---> a8b7c6d5e4f3', delay: 5 },
  { type: 'output', content: 'Step 4/5 : RUN npm install', delay: 5 },
  { type: 'output', content: ' ---> Running in 3a2b1c0d...', delay: 10 },
  { type: 'output', content: 'Successfully built 9f8e7d6c5b4a', delay: 10 },
  { type: 'output', content: 'Successfully tagged myapp:v1.0', delay: 5 },
];

// 构建时指定 Dockerfile
export const buildWithDockerfile: RemotionTerminalLine[] = [
  { type: 'input', content: 'docker build -f Dockerfile.prod -t myapp:prod .', delay: 0 },
  { type: 'output', content: 'Sending build context to Docker daemon  2.56kB', delay: 15 },
  { type: 'output', content: 'Step 1/6 : FROM node:18 as builder', delay: 10 },
  { type: 'output', content: 'Successfully tagged myapp:prod', delay: 15 },
];

// ========== 推送镜像 ==========

export const pushImage: RemotionTerminalLine[] = [
  { type: 'input', content: 'docker tag myapp:v1.0 myuser/myapp:v1.0', delay: 0 },
  { type: 'input', content: 'docker push myuser/myapp:v1.0', delay: 20 },
  { type: 'output', content: 'The push refers to repository [docker.io/myuser/myapp]', delay: 15 },
  { type: 'output', content: '5f70bf18a086: Pushed', delay: 10 },
  { type: 'output', content: 'v1.0: digest: sha256:a1b2c3d4... size: 1234', delay: 5 },
];

// ========== 检查镜像 ==========

export const inspectImage: RemotionTerminalLine[] = [
  { type: 'input', content: 'docker inspect nginx', delay: 0 },
  { type: 'output', content: '[', delay: 15 },
  { type: 'output', content: '    {', delay: 3 },
  { type: 'output', content: '        "Id": "sha256:605c77e...",', delay: 3 },
  { type: 'output', content: '        "RepoTags": ["nginx:latest"],', delay: 3 },
  { type: 'output', content: '        "Size": 141278720,', delay: 3 },
  { type: 'output', content: '        "Architecture": "amd64",', delay: 3 },
  { type: 'output', content: '        "Os": "linux"', delay: 3 },
  { type: 'output', content: '    }', delay: 3 },
  { type: 'output', content: ']', delay: 3 },
];

// 查看镜像历史
export const imageHistory: RemotionTerminalLine[] = [
  { type: 'input', content: 'docker history nginx', delay: 0 },
  { type: 'output', content: 'IMAGE          CREATED        CREATED BY                                      SIZE', delay: 15 },
  { type: 'output', content: '605c77e624dd   2 weeks ago    /bin/sh -c #(nop)  CMD ["nginx" "-g" "daemon…   0B', delay: 3 },
  { type: 'output', content: '<missing>      2 weeks ago    /bin/sh -c #(nop)  EXPOSE 80                    0B', delay: 3 },
  { type: 'output', content: '<missing>      2 weeks ago    /bin/sh -c #(nop) COPY file:...in /etc/ngin…   1.09kB', delay: 3 },
];

// 清理未使用镜像
export const pruneImages: RemotionTerminalLine[] = [
  { type: 'input', content: 'docker image prune -a', delay: 0 },
  { type: 'output', content: 'WARNING! This will remove all images without at least one container.', delay: 15 },
  { type: 'output', content: 'Are you sure you want to continue? [y/N] y', delay: 10 },
  { type: 'output', content: 'Deleted Images:', delay: 5 },
  { type: 'output', content: 'untagged: python:3.11', delay: 3 },
  { type: 'output', content: 'deleted: sha256:2d7e2d8e4c5a...', delay: 3 },
  { type: 'output', content: 'Total reclaimed space: 2.5GB', delay: 5 },
];
