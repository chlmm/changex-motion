// Docker 系统管理配置
import { RemotionTerminalLine } from '../../components/Terminal';

// ========== 系统信息 ==========

// 查看磁盘使用
export const systemDf: RemotionTerminalLine[] = [
  { type: 'input', content: 'docker system df', delay: 0 },
  { type: 'output', content: 'TYPE            TOTAL     ACTIVE    SIZE      RECLAIMABLE', delay: 15 },
  { type: 'output', content: 'Images          12        5         4.5GB     2.1GB (46%)', delay: 5 },
  { type: 'output', content: 'Containers      8         3         256MB     200MB (78%)', delay: 3 },
  { type: 'output', content: 'Local Volumes   5         2         1.2GB     800MB (66%)', delay: 3 },
  { type: 'output', content: 'Build Cache     45        0         500MB     500MB (100%)', delay: 3 },
];

// 详细磁盘使用
export const systemDfVerbose: RemotionTerminalLine[] = [
  { type: 'input', content: 'docker system df -v', delay: 0 },
  { type: 'output', content: 'Images space usage:', delay: 15 },
  { type: 'output', content: '', delay: 2 },
  { type: 'output', content: 'REPOSITORY   TAG      IMAGE ID       CREATED        SIZE      SHARED SIZE   UNIQUE SIZE', delay: 3 },
  { type: 'output', content: 'nginx        latest   605c77e624dd   2 weeks ago    141MB     0B            141MB', delay: 3 },
  { type: 'output', content: 'node         18       1c764a19dcb3   3 days ago     991MB     0B            991MB', delay: 3 },
];

// 系统事件
export const systemEvents: RemotionTerminalLine[] = [
  { type: 'input', content: 'docker events --since 1h', delay: 0 },
  { type: 'output', content: '2024-01-15T10:30:00.000000000Z container create webserver (image=nginx)', delay: 15 },
  { type: 'output', content: '2024-01-15T10:30:01.000000000Z container start webserver (image=nginx)', delay: 5 },
  { type: 'output', content: '2024-01-15T10:35:00.000000000Z container stop webserver (image=nginx)', delay: 5 },
];

// ========== 清理系统 ==========

// 清理所有未使用资源
export const systemPrune: RemotionTerminalLine[] = [
  { type: 'input', content: 'docker system prune', delay: 0 },
  { type: 'output', content: 'WARNING! This will remove:', delay: 15 },
  { type: 'output', content: '  - all stopped containers', delay: 3 },
  { type: 'output', content: '  - all networks not used by at least one container', delay: 3 },
  { type: 'output', content: '  - all dangling images', delay: 3 },
  { type: 'output', content: '  - unused build cache', delay: 3 },
  { type: 'output', content: 'Are you sure you want to continue? [y/N] y', delay: 10 },
  { type: 'output', content: 'Deleted Containers:', delay: 5 },
  { type: 'output', content: 'a1b2c3d4e5f6', delay: 3 },
  { type: 'output', content: 'Deleted Images:', delay: 3 },
  { type: 'output', content: 'untagged: python:3.11', delay: 3 },
  { type: 'output', content: 'Total reclaimed space: 3.2GB', delay: 5 },
];

// 清理所有（包括未使用的镜像）
export const systemPruneAll: RemotionTerminalLine[] = [
  { type: 'input', content: 'docker system prune -a --volumes', delay: 0 },
  { type: 'output', content: 'WARNING! This will remove:', delay: 15 },
  { type: 'output', content: '  - all stopped containers', delay: 3 },
  { type: 'output', content: '  - all networks not used by at least one container', delay: 3 },
  { type: 'output', content: '  - all images without at least one container', delay: 3 },
  { type: 'output', content: '  - all volumes not used by at least one container', delay: 3 },
  { type: 'output', content: 'Are you sure you want to continue? [y/N] y', delay: 10 },
  { type: 'output', content: 'Total reclaimed space: 8.5GB', delay: 5 },
];

// ========== Builder 管理 ==========

// 清理构建缓存
export const builderPrune: RemotionTerminalLine[] = [
  { type: 'input', content: 'docker builder prune', delay: 0 },
  { type: 'output', content: 'WARNING! This will remove all dangling build cache.', delay: 15 },
  { type: 'output', content: 'Are you sure you want to continue? [y/N] y', delay: 10 },
  { type: 'output', content: 'Total reclaimed space: 1.2GB', delay: 5 },
];

// ========== 搜索镜像 ==========

export const searchImages: RemotionTerminalLine[] = [
  { type: 'input', content: 'docker search nginx', delay: 0 },
  { type: 'output', content: 'NAME                             DESCRIPTION                                     STARS     OFFICIAL', delay: 15 },
  { type: 'output', content: 'nginx                            Official build of Nginx.                         18000     [OK]', delay: 5 },
  { type: 'output', content: 'jwilder/nginx-proxy              Automated Nginx reverse proxy...                2500', delay: 3 },
  { type: 'output', content: 'bitnami/nginx                    Bitnami nginx Docker Image                      150', delay: 3 },
];

// ========== Docker Context ==========

export const listContexts: RemotionTerminalLine[] = [
  { type: 'input', content: 'docker context ls', delay: 0 },
  { type: 'output', content: 'NAME            DESCRIPTION                               DOCKER ENDPOINT               ERROR', delay: 15 },
  { type: 'output', content: 'default *       Current DOCKER_HOST based configuration   unix:///var/run/docker.sock', delay: 5 },
  { type: 'output', content: 'remote          Remote Docker Engine                      tcp://192.168.1.100:2376', delay: 3 },
];

// 切换 context
export const useContext: RemotionTerminalLine[] = [
  { type: 'input', content: 'docker context use remote', delay: 0 },
  { type: 'output', content: 'remote', delay: 15 },
  { type: 'output', content: 'Current context is now "remote"', delay: 5 },
];
