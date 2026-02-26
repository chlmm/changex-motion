// Docker 数据卷操作配置
import { RemotionTerminalLine } from '../../components/Terminal';

// ========== 数据卷管理 ==========

// 列出数据卷
export const listVolumes: RemotionTerminalLine[] = [
  { type: 'input', content: 'docker volume ls', delay: 0 },
  { type: 'output', content: 'DRIVER    VOLUME NAME', delay: 15 },
  { type: 'output', content: 'local     myapp_postgres_data', delay: 5 },
  { type: 'output', content: 'local     myapp_redis_data', delay: 3 },
  { type: 'output', content: 'local     portainer_data', delay: 3 },
];

// 创建数据卷
export const createVolume: RemotionTerminalLine[] = [
  { type: 'input', content: 'docker volume create mydata', delay: 0 },
  { type: 'output', content: 'mydata', delay: 15 },
];

// 检查数据卷
export const inspectVolume: RemotionTerminalLine[] = [
  { type: 'input', content: 'docker volume inspect mydata', delay: 0 },
  { type: 'output', content: '[', delay: 15 },
  { type: 'output', content: '    {', delay: 3 },
  { type: 'output', content: '        "CreatedAt": "2024-01-15T10:30:00Z",', delay: 3 },
  { type: 'output', content: '        "Driver": "local",', delay: 3 },
  { type: 'output', content: '        "Mountpoint": "/var/lib/docker/volumes/mydata/_data",', delay: 3 },
  { type: 'output', content: '        "Name": "mydata",', delay: 3 },
  { type: 'output', content: '        "Scope": "local"', delay: 3 },
  { type: 'output', content: '    }', delay: 3 },
  { type: 'output', content: ']', delay: 3 },
];

// 删除数据卷
export const removeVolume: RemotionTerminalLine[] = [
  { type: 'input', content: 'docker volume rm mydata', delay: 0 },
  { type: 'output', content: 'mydata', delay: 15 },
];

// 清理未使用的数据卷
export const pruneVolumes: RemotionTerminalLine[] = [
  { type: 'input', content: 'docker volume prune', delay: 0 },
  { type: 'output', content: 'WARNING! This will remove all local volumes not used by at least one container.', delay: 15 },
  { type: 'output', content: 'Are you sure you want to continue? [y/N] y', delay: 10 },
  { type: 'output', content: 'Deleted Volumes:', delay: 5 },
  { type: 'output', content: 'old_data_volume', delay: 3 },
  { type: 'output', content: 'test_volume', delay: 3 },
  { type: 'output', content: 'Total reclaimed space: 1.5GB', delay: 5 },
];

// ========== 挂载数据卷 ==========

// 使用 -v 挂载
export const mountVolume: RemotionTerminalLine[] = [
  { type: 'input', content: 'docker run -d -v mydata:/app/data nginx', delay: 0 },
  { type: 'output', content: 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6', delay: 15 },
];

// 使用 --mount 挂载（推荐）
export const mountVolumeExplicit: RemotionTerminalLine[] = [
  { type: 'input', content: 'docker run -d --mount source=mydata,target=/app/data nginx', delay: 0 },
  { type: 'output', content: 'b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7', delay: 15 },
];

// 绑定挂载（Bind Mount）
export const bindMount: RemotionTerminalLine[] = [
  { type: 'input', content: 'docker run -d -v /host/path:/container/path nginx', delay: 0 },
  { type: 'output', content: 'c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8', delay: 15 },
];

// 只读挂载
export const readOnlyMount: RemotionTerminalLine[] = [
  { type: 'input', content: 'docker run -d -v mydata:/app/data:ro nginx', delay: 0 },
  { type: 'output', content: 'd4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9', delay: 15 },
];

// tmpfs 挂载（临时文件系统）
export const tmpfsMount: RemotionTerminalLine[] = [
  { type: 'input', content: 'docker run -d --tmpfs /tmp nginx', delay: 0 },
  { type: 'output', content: 'e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0', delay: 15 },
];

// ========== 数据卷备份恢复 ==========

// 备份数据卷
export const backupVolume: RemotionTerminalLine[] = [
  { type: 'input', content: 'docker run --rm -v mydata:/data -v $(pwd):/backup alpine tar czf /backup/backup.tar.gz /data', delay: 0 },
  { type: 'output', content: 'tar: removing leading \'/\' from member names', delay: 15 },
];

// 恢复数据卷
export const restoreVolume: RemotionTerminalLine[] = [
  { type: 'input', content: 'docker run --rm -v mydata:/data -v $(pwd):/backup alpine tar xzf /backup/backup.tar.gz -C /', delay: 0 },
  { type: 'output', content: '', delay: 15 },
];

// ========== 数据卷共享 ==========

// 使用 --volumes-from 共享
export const volumesFrom: RemotionTerminalLine[] = [
  { type: 'input', content: 'docker run -d --name data-container -v /app/data busybox', delay: 0 },
  { type: 'output', content: 'f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1', delay: 15 },
  { type: 'input', content: 'docker run -d --volumes-from data-container nginx', delay: 20 },
  { type: 'output', content: 'g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2', delay: 15 },
];

// 在容器间共享数据卷
export const shareVolume: RemotionTerminalLine[] = [
  { type: 'input', content: 'docker run -d --name app1 -v shared_data:/data nginx', delay: 0 },
  { type: 'output', content: 'h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3', delay: 15 },
  { type: 'input', content: 'docker run -d --name app2 -v shared_data:/data nginx', delay: 20 },
  { type: 'output', content: 'i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4', delay: 15 },
];
