// Docker 网络操作配置
import { RemotionTerminalLine } from '../../components/Terminal';

// ========== 网络管理 ==========

// 列出网络
export const listNetworks: RemotionTerminalLine[] = [
  { type: 'input', content: 'docker network ls', delay: 0 },
  { type: 'output', content: 'NETWORK ID     NAME              DRIVER    SCOPE', delay: 15 },
  { type: 'output', content: 'a1b2c3d4e5f6   bridge            bridge    local', delay: 5 },
  { type: 'output', content: 'b2c3d4e5f6g7   host              host      local', delay: 3 },
  { type: 'output', content: 'c3d4e5f6g7h8   none              null      local', delay: 3 },
  { type: 'output', content: 'd4e5f6g7h8i9   myapp_default     bridge    local', delay: 3 },
];

// 创建网络
export const createNetwork: RemotionTerminalLine[] = [
  { type: 'input', content: 'docker network create mynetwork', delay: 0 },
  { type: 'output', content: 'e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0', delay: 15 },
];

// 创建指定子网的网络
export const createSubnetNetwork: RemotionTerminalLine[] = [
  { type: 'input', content: 'docker network create --subnet=172.20.0.0/16 mynetwork', delay: 0 },
  { type: 'output', content: 'f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1', delay: 15 },
];

// 检查网络
export const inspectNetwork: RemotionTerminalLine[] = [
  { type: 'input', content: 'docker network inspect bridge', delay: 0 },
  { type: 'output', content: '[', delay: 15 },
  { type: 'output', content: '    {', delay: 3 },
  { type: 'output', content: '        "Name": "bridge",', delay: 3 },
  { type: 'output', content: '        "Id": "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6",', delay: 3 },
  { type: 'output', content: '        "Driver": "bridge",', delay: 3 },
  { type: 'output', content: '        "IPAM": {', delay: 3 },
  { type: 'output', content: '            "Config": [{"Subnet": "172.17.0.0/16"}]', delay: 3 },
  { type: 'output', content: '        }', delay: 3 },
  { type: 'output', content: '    }', delay: 3 },
  { type: 'output', content: ']', delay: 3 },
];

// 连接容器到网络
export const connectNetwork: RemotionTerminalLine[] = [
  { type: 'input', content: 'docker network connect mynetwork webserver', delay: 0 },
  { type: 'output', content: '', delay: 15 },
];

// 断开容器网络
export const disconnectNetwork: RemotionTerminalLine[] = [
  { type: 'input', content: 'docker network disconnect mynetwork webserver', delay: 0 },
  { type: 'output', content: '', delay: 15 },
];

// 删除网络
export const removeNetwork: RemotionTerminalLine[] = [
  { type: 'input', content: 'docker network rm mynetwork', delay: 0 },
  { type: 'output', content: 'mynetwork', delay: 15 },
];

// 清理未使用的网络
export const pruneNetworks: RemotionTerminalLine[] = [
  { type: 'input', content: 'docker network prune', delay: 0 },
  { type: 'output', content: 'WARNING! This will remove all custom networks not used by at least one container.', delay: 15 },
  { type: 'output', content: 'Are you sure you want to continue? [y/N] y', delay: 10 },
  { type: 'output', content: 'Deleted Networks:', delay: 5 },
  { type: 'output', content: 'old_network', delay: 3 },
  { type: 'output', content: 'test_network', delay: 3 },
];

// 使用网络运行容器
export const runWithNetwork: RemotionTerminalLine[] = [
  { type: 'input', content: 'docker run -d --name web --network mynetwork nginx', delay: 0 },
  { type: 'output', content: 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6', delay: 15 },
];

// 多网络连接示例
export const multiNetworkExample: RemotionTerminalLine[] = [
  { type: 'input', content: 'docker network create frontend', delay: 0 },
  { type: 'output', content: 'network_id_1', delay: 15 },
  { type: 'input', content: 'docker network create backend', delay: 20 },
  { type: 'output', content: 'network_id_2', delay: 15 },
  { type: 'input', content: 'docker run -d --name web --network frontend nginx', delay: 20 },
  { type: 'output', content: 'container_id_1', delay: 15 },
  { type: 'input', content: 'docker run -d --name api --network backend node', delay: 20 },
  { type: 'output', content: 'container_id_2', delay: 15 },
  { type: 'input', content: 'docker network connect backend web', delay: 20 },
  { type: 'output', content: '', delay: 10 },
];
