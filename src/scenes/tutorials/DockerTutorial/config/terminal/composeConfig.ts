// Docker Compose 相关配置
import { RemotionTerminalLine } from '../../components/Terminal';

// 查看 docker-compose.yml
export const viewComposeFile: RemotionTerminalLine[] = [
  { type: 'input', content: 'cat docker-compose.yml', delay: 0 },
  { type: 'output', content: 'version: "3.8"', delay: 15 },
  { type: 'output', content: '', delay: 2 },
  { type: 'output', content: 'services:', delay: 3 },
  { type: 'output', content: '  web:', delay: 3 },
  { type: 'output', content: '    build: .', delay: 3 },
  { type: 'output', content: '    ports:', delay: 3 },
  { type: 'output', content: '      - "3000:3000"', delay: 3 },
  { type: 'output', content: '    environment:', delay: 3 },
  { type: 'output', content: '      - NODE_ENV=production', delay: 3 },
  { type: 'output', content: '    depends_on:', delay: 3 },
  { type: 'output', content: '      - db', delay: 3 },
  { type: 'output', content: '', delay: 2 },
  { type: 'output', content: '  db:', delay: 3 },
  { type: 'output', content: '    image: postgres:15-alpine', delay: 3 },
  { type: 'output', content: '    volumes:', delay: 3 },
  { type: 'output', content: '      - postgres_data:/var/lib/postgresql/data', delay: 3 },
  { type: 'output', content: '    environment:', delay: 3 },
  { type: 'output', content: '      - POSTGRES_PASSWORD=secret', delay: 3 },
  { type: 'output', content: '', delay: 2 },
  { type: 'output', content: 'volumes:', delay: 3 },
  { type: 'output', content: '  postgres_data:', delay: 3 },
];

// 启动服务
export const composeUp: RemotionTerminalLine[] = [
  { type: 'input', content: 'docker compose up -d', delay: 0 },
  { type: 'output', content: '[+] Running 3/3', delay: 15 },
  { type: 'output', content: ' ✔ Network myapp_default      Created', delay: 5 },
  { type: 'output', content: ' ✔ Container myapp-db-1       Started', delay: 5 },
  { type: 'output', content: ' ✔ Container myapp-web-1      Started', delay: 5 },
];

// 停止服务
export const composeDown: RemotionTerminalLine[] = [
  { type: 'input', content: 'docker compose down', delay: 0 },
  { type: 'output', content: '[+] Running 3/3', delay: 15 },
  { type: 'output', content: ' ✔ Container myapp-web-1      Removed', delay: 5 },
  { type: 'output', content: ' ✔ Container myapp-db-1       Removed', delay: 5 },
  { type: 'output', content: ' ✔ Network myapp_default      Removed', delay: 5 },
];

// 查看服务状态
export const composePs: RemotionTerminalLine[] = [
  { type: 'input', content: 'docker compose ps', delay: 0 },
  { type: 'output', content: 'NAME                IMAGE              COMMAND                  SERVICE   STATUS          PORTS', delay: 15 },
  { type: 'output', content: 'myapp-web-1         myapp-web          "docker-entrypoint.s…"   web       running         0.0.0.0:3000->3000/tcp', delay: 5 },
  { type: 'output', content: 'myapp-db-1          postgres:15        "docker-entrypoint.s…"   db        running         5432/tcp', delay: 3 },
];

// 查看日志
export const composeLogs: RemotionTerminalLine[] = [
  { type: 'input', content: 'docker compose logs -f web', delay: 0 },
  { type: 'output', content: 'myapp-web-1  | Server listening on port 3000', delay: 15 },
  { type: 'output', content: 'myapp-web-1  | Connected to database', delay: 10 },
  { type: 'output', content: 'myapp-web-1  | Application ready', delay: 5 },
];

// 扩展服务
export const composeScale: RemotionTerminalLine[] = [
  { type: 'input', content: 'docker compose up -d --scale web=3', delay: 0 },
  { type: 'output', content: '[+] Running 4/4', delay: 15 },
  { type: 'output', content: ' ✔ Container myapp-web-1      Started', delay: 5 },
  { type: 'output', content: ' ✔ Container myapp-web-2      Started', delay: 5 },
  { type: 'output', content: ' ✔ Container myapp-web-3      Started', delay: 5 },
  { type: 'output', content: ' ✔ Container myapp-db-1       Started', delay: 5 },
];

// 构建服务
export const composeBuild: RemotionTerminalLine[] = [
  { type: 'input', content: 'docker compose build', delay: 0 },
  { type: 'output', content: '[+] Building 45.2s (12/12) FINISHED', delay: 15 },
  { type: 'output', content: ' => [web internal] load build definition from Dockerfile', delay: 5 },
  { type: 'output', content: ' => [web 1/5] FROM node:18-alpine', delay: 10 },
  { type: 'output', content: 'Successfully built myapp-web', delay: 10 },
];

// 执行命令
export const composeExec: RemotionTerminalLine[] = [
  { type: 'input', content: 'docker compose exec web npm test', delay: 0 },
  { type: 'output', content: '', delay: 15 },
  { type: 'output', content: '> myapp@1.0.0 test', delay: 5 },
  { type: 'output', content: '> jest', delay: 3 },
  { type: 'output', content: '', delay: 3 },
  { type: 'output', content: 'PASS src/app.test.js', delay: 10 },
  { type: 'output', content: 'Test Suites: 1 passed, 1 total', delay: 5 },
  { type: 'output', content: 'Tests:       5 passed, 5 total', delay: 5 },
];

// 重启服务
export const composeRestart: RemotionTerminalLine[] = [
  { type: 'input', content: 'docker compose restart web', delay: 0 },
  { type: 'output', content: '[+] Running 1/1', delay: 15 },
  { type: 'output', content: ' ✔ Container myapp-web-1  Started', delay: 5 },
];

// 拉取镜像
export const composePull: RemotionTerminalLine[] = [
  { type: 'input', content: 'docker compose pull', delay: 0 },
  { type: 'output', content: '[+] Pulling 2/2', delay: 15 },
  { type: 'output', content: ' ✔ db Pulled', delay: 10 },
  { type: 'output', content: ' ✔ redis Pulled', delay: 10 },
];

// 查看配置
export const composeConfig: RemotionTerminalLine[] = [
  { type: 'input', content: 'docker compose config', delay: 0 },
  { type: 'output', content: 'services:', delay: 15 },
  { type: 'output', content: '  db:', delay: 3 },
  { type: 'output', content: '    environment:', delay: 3 },
  { type: 'output', content: '      POSTGRES_PASSWORD: secret', delay: 3 },
  { type: 'output', content: '    image: postgres:15-alpine', delay: 3 },
  { type: 'output', content: '  web:', delay: 3 },
  { type: 'output', content: '    build:', delay: 3 },
  { type: 'output', content: '      context: /app', delay: 3 },
  { type: 'output', content: '    depends_on:', delay: 3 },
  { type: 'output', content: '    - db', delay: 3 },
];
