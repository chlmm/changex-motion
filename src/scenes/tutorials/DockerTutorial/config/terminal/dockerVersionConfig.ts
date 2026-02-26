// Docker 版本和基础命令配置
import { RemotionTerminalLine } from '../../components/Terminal';

// 查看版本
export const dockerVersion: RemotionTerminalLine[] = [
  { type: 'input', content: 'docker --version', delay: 0 },
  { type: 'output', content: 'Docker version 24.0.7, build afdd53b', delay: 15 },
];

// 查看详细信息
export const dockerInfo: RemotionTerminalLine[] = [
  { type: 'input', content: 'docker info', delay: 0 },
  { type: 'output', content: 'Client:', delay: 15 },
  { type: 'output', content: ' Context:    default', delay: 3 },
  { type: 'output', content: ' Debug Mode: false', delay: 3 },
  { type: 'output', content: ' Server:', delay: 5 },
  { type: 'output', content: ' Containers: 5', delay: 3 },
  { type: 'output', content: ' Images:     12', delay: 3 },
  { type: 'output', content: ' Server Version: 24.0.7', delay: 3 },
];

// 查看帮助
export const dockerHelp: RemotionTerminalLine[] = [
  { type: 'input', content: 'docker --help', delay: 0 },
  { type: 'output', content: 'Usage:  docker [OPTIONS] COMMAND', delay: 15 },
  { type: 'output', content: '', delay: 2 },
  { type: 'output', content: 'Common Commands:', delay: 3 },
  { type: 'output', content: '  run         Run a container', delay: 3 },
  { type: 'output', content: '  build       Build an image', delay: 3 },
  { type: 'output', content: '  pull        Pull an image', delay: 3 },
  { type: 'output', content: '  push        Push an image', delay: 3 },
  { type: 'output', content: '  ps          List containers', delay: 3 },
  { type: 'output', content: '  images      List images', delay: 3 },
];

// 登录 Docker Hub
export const dockerLogin: RemotionTerminalLine[] = [
  { type: 'input', content: 'docker login', delay: 0 },
  { type: 'output', content: 'Login with your Docker ID to push and pull images', delay: 15 },
  { type: 'output', content: 'Username: myuser', delay: 10 },
  { type: 'output', content: 'Password: ********', delay: 10 },
  { type: 'output', content: 'Login Succeeded', delay: 5 },
];
