# ============================================================
# changex-motion-ts Dockerfile
# Remotion + Three.js 视频渲染环境
# ============================================================

# ---- 阶段1: 依赖安装 ----
FROM node:18-bookworm AS deps

WORKDIR /app

# 先复制依赖描述文件，利用 Docker 缓存层
COPY package.json package-lock.json ./

RUN npm ci

# ---- 阶段2: 构建与渲染 ----
FROM node:18-bookworm AS runner

WORKDIR /app

# 安装 Chromium 及系统依赖（Remotion 渲染必需）
RUN apt-get update && apt-get install -y --no-install-recommends \
    chromium \
    fonts-noto-cjk \
    fonts-noto-color-emoji \
    libgl1-mesa-dri \
    mesa-utils \
    ffmpeg \
    && rm -rf /var/lib/apt/lists/*

# 设置 Chromium 路径，让 Remotion 使用系统安装的 Chromium
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium
# 禁用 GPU 加速（Docker 内无 GPU）
ENV RENDERER_ARGS="--disable-gpu --no-sandbox --disable-setuid-sandbox"
# Remotion 使用软件渲染
ENV OPENGL=swiftshader

# 从 deps 阶段复制 node_modules
COPY --from=deps /app/node_modules ./node_modules

# 复制项目源码
COPY . .

# 创建输出目录
RUN mkdir -p /app/out

# 默认命令: 启动 Remotion Studio（开发预览）
CMD ["npx", "remotion", "studio"]
