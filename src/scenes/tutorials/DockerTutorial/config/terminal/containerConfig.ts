// Docker 容器操作配置
import { RemotionTerminalLine } from '../../components/Terminal';

// ========== 运行容器 ==========

// 基本运行
export const runContainer: RemotionTerminalLine[] = [
  { type: 'input', content: 'docker run nginx', delay: 0 },
  { type: 'output', content: "Unable to find image 'nginx:latest' locally", delay: 15 },
  { type: 'output', content: 'latest: Pulling from library/nginx', delay: 5 },
  { type: 'output', content: 'Digest: sha256:ee89b00528ff...', delay: 5 },
  { type: 'output', content: 'Status: Downloaded newer image for nginx:latest', delay: 5 },
];

// 后台运行
export const runDetached: RemotionTerminalLine[] = [
  { type: 'input', content: 'docker run -d --name webserver -p 8080:80 nginx', delay: 0 },
  { type: 'output', content: 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0', delay: 15 },
];

// 交互式运行
export const runInteractive: RemotionTerminalLine[] = [
  { type: 'input', content: 'docker run -it --name mynode node:18 /bin/bash', delay: 0 },
  { type: 'output', content: 'root@a1b2c3d4e5f6:/# node --version', delay: 15 },
  { type: 'output', content: 'v18.19.0', delay: 10 },
];

// 运行并自动删除
export const runAutoRemove: RemotionTerminalLine[] = [
  { type: 'input', content: 'docker run --rm alpine echo "Hello Docker"', delay: 0 },
  { type: 'output', content: 'Hello Docker', delay: 15 },
];

// 环境变量
export const runWithEnv: RemotionTerminalLine[] = [
  { type: 'input', content: 'docker run -d -e MYSQL_ROOT_PASSWORD=secret -e MYSQL_DATABASE=mydb mysql:8', delay: 0 },
  { type: 'output', content: 'b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1', delay: 15 },
];

// 挂载卷
export const runWithVolume: RemotionTerminalLine[] = [
  { type: 'input', content: 'docker run -d -v /host/data:/container/data nginx', delay: 0 },
  { type: 'output', content: 'c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2', delay: 15 },
];

// ========== 列出容器 ==========

export const listContainers: RemotionTerminalLine[] = [
  { type: 'input', content: 'docker ps', delay: 0 },
  { type: 'output', content: 'CONTAINER ID   IMAGE     COMMAND                  CREATED         STATUS         PORTS                  NAMES', delay: 15 },
  { type: 'output', content: 'a1b2c3d4e5f6   nginx     "/docker-entrypoint.…"   5 minutes ago   Up 5 minutes   0.0.0.0:8080->80/tcp   webserver', delay: 5 },
  { type: 'output', content: 'b2c3d4e5f6g7   redis     "docker-entrypoint.s…"   2 hours ago     Up 2 hours     6379/tcp              myredis', delay: 3 },
];

// 列出所有容器（包括停止的）
export const listAllContainers: RemotionTerminalLine[] = [
  { type: 'input', content: 'docker ps -a', delay: 0 },
  { type: 'output', content: 'CONTAINER ID   IMAGE     COMMAND                  CREATED          STATUS                     PORTS     NAMES', delay: 15 },
  { type: 'output', content: 'a1b2c3d4e5f6   nginx     "/docker-entrypoint.…"   5 minutes ago    Up 5 minutes               80/tcp    webserver', delay: 5 },
  { type: 'output', content: 'b2c3d4e5f6g7   node      "/bin/bash"              1 hour ago       Exited (0) 30 minutes ago            mynode', delay: 3 },
];

// ========== 容器管理 ==========

// 停止容器
export const stopContainer: RemotionTerminalLine[] = [
  { type: 'input', content: 'docker stop webserver', delay: 0 },
  { type: 'output', content: 'webserver', delay: 15 },
];

// 启动容器
export const startContainer: RemotionTerminalLine[] = [
  { type: 'input', content: 'docker start webserver', delay: 0 },
  { type: 'output', content: 'webserver', delay: 15 },
];

// 重启容器
export const restartContainer: RemotionTerminalLine[] = [
  { type: 'input', content: 'docker restart webserver', delay: 0 },
  { type: 'output', content: 'webserver', delay: 15 },
];

// 删除容器
export const removeContainer: RemotionTerminalLine[] = [
  { type: 'input', content: 'docker rm webserver', delay: 0 },
  { type: 'output', content: 'webserver', delay: 15 },
];

// 强制删除运行中的容器
export const forceRemoveContainer: RemotionTerminalLine[] = [
  { type: 'input', content: 'docker rm -f webserver', delay: 0 },
  { type: 'output', content: 'webserver', delay: 15 },
];

// ========== 容器交互 ==========

// 进入运行中的容器
export const execIntoContainer: RemotionTerminalLine[] = [
  { type: 'input', content: 'docker exec -it webserver /bin/bash', delay: 0 },
  { type: 'output', content: 'root@a1b2c3d4e5f6:/# ls /usr/share/nginx/html', delay: 15 },
  { type: 'output', content: '50x.html  index.html', delay: 10 },
];

// 在容器中执行命令
export const execCommand: RemotionTerminalLine[] = [
  { type: 'input', content: 'docker exec webserver cat /etc/nginx/nginx.conf', delay: 0 },
  { type: 'output', content: 'user  nginx;', delay: 15 },
  { type: 'output', content: 'worker_processes  auto;', delay: 3 },
  { type: 'output', content: 'error_log  /var/log/nginx/error.log notice;', delay: 3 },
  { type: 'output', content: 'pid        /var/run/nginx.pid;', delay: 3 },
];

// 复制文件到容器
export const copyToContainer: RemotionTerminalLine[] = [
  { type: 'input', content: 'docker cp ./app.conf webserver:/etc/nginx/conf.d/', delay: 0 },
  { type: 'output', content: 'Successfully copied 1.2kB to webserver:/etc/nginx/conf.d/', delay: 15 },
];

// 从容器复制文件
export const copyFromContainer: RemotionTerminalLine[] = [
  { type: 'input', content: 'docker cp webserver:/etc/nginx/nginx.conf ./nginx.conf', delay: 0 },
  { type: 'output', content: 'Successfully copied 2.5kB to ./nginx.conf', delay: 15 },
];

// ========== 查看日志 ==========

export const containerLogs: RemotionTerminalLine[] = [
  { type: 'input', content: 'docker logs webserver', delay: 0 },
  { type: 'output', content: '192.168.1.1 - - [15/Jan/2024:10:30:00 +0000] "GET / HTTP/1.1" 200 615', delay: 15 },
  { type: 'output', content: '192.168.1.2 - - [15/Jan/2024:10:30:01 +0000] "GET /favicon.ico HTTP/1.1" 404 555', delay: 5 },
];

// 实时日志
export const followLogs: RemotionTerminalLine[] = [
  { type: 'input', content: 'docker logs -f --tail 100 webserver', delay: 0 },
  { type: 'output', content: '192.168.1.3 - - [15/Jan/2024:10:31:00 +0000] "GET /api/users HTTP/1.1" 200 1024', delay: 15 },
  { type: 'output', content: '192.168.1.4 - - [15/Jan/2024:10:31:01 +0000] "POST /api/login HTTP/1.1" 200 256', delay: 5 },
];

// ========== 查看容器信息 ==========

export const inspectContainer: RemotionTerminalLine[] = [
  { type: 'input', content: 'docker inspect webserver', delay: 0 },
  { type: 'output', content: '[', delay: 15 },
  { type: 'output', content: '    {', delay: 3 },
  { type: 'output', content: '        "Id": "a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0",', delay: 3 },
  { type: 'output', content: '        "Name": "/webserver",', delay: 3 },
  { type: 'output', content: '        "State": {', delay: 3 },
  { type: 'output', content: '            "Status": "running",', delay: 3 },
  { type: 'output', content: '            "Running": true,', delay: 3 },
  { type: 'output', content: '            "Ports": [{"PrivatePort": 80, "PublicPort": 8080}]', delay: 3 },
];

// 查看容器资源使用
export const containerStats: RemotionTerminalLine[] = [
  { type: 'input', content: 'docker stats --no-stream', delay: 0 },
  { type: 'output', content: 'CONTAINER ID   NAME        CPU %     MEM USAGE / LIMIT     MEM %     NET I/O           BLOCK I/O', delay: 15 },
  { type: 'output', content: 'a1b2c3d4e5f6   webserver   0.01%     5.5MiB / 7.777GiB     0.07%     1.2kB / 0B        0B / 0B', delay: 5 },
  { type: 'output', content: 'b2c3d4e5f6g7   myredis     0.05%     2.1MiB / 7.777GiB     0.03%     856B / 0B         0B / 0B', delay: 3 },
];

// 查看容器进程
export const containerTop: RemotionTerminalLine[] = [
  { type: 'input', content: 'docker top webserver', delay: 0 },
  { type: 'output', content: 'UID                 PID                 PPID                C                   STIME               TTY                 TIME                CMD', delay: 15 },
  { type: 'output', content: 'root                12345               12300               0                   10:30               ?                   00:00:00            nginx: master process', delay: 5 },
  { type: 'output', content: 'systemd+            12346               12345               0                   10:30               ?                   00:00:00            nginx: worker process', delay: 3 },
];

// 清理停止的容器
export const pruneContainers: RemotionTerminalLine[] = [
  { type: 'input', content: 'docker container prune', delay: 0 },
  { type: 'output', content: 'WARNING! This will remove all stopped containers.', delay: 15 },
  { type: 'output', content: 'Are you sure you want to continue? [y/N] y', delay: 10 },
  { type: 'output', content: 'Deleted Containers:', delay: 5 },
  { type: 'output', content: 'b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0', delay: 3 },
  { type: 'output', content: 'Total reclaimed space: 1.2GB', delay: 5 },
];
