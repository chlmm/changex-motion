// 核心指令详解
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from 'remotion';
import { Terminal } from '../../components/Terminal';
import { COLORS, BACKGROUND } from '../../config';
import { viewDockerfile } from '../../config/terminal/dockerfileConfig';

import { RemotionTerminalLine } from '../../components/Terminal';

// CMD vs ENTRYPOINT 示例
const cmdVsEntrypoint: RemotionTerminalLine[] = [
  { type: 'input', content: '# CMD 示例 - 可被覆盖', delay: 0 },
  { type: 'output', content: 'CMD ["echo", "Hello"]', delay: 10 },
  { type: 'output', content: '', delay: 3 },
  { type: 'input', content: '# docker run myimage echo "World" -> 输出 "World"', delay: 15 },
  { type: 'output', content: '', delay: 5 },
  { type: 'input', content: '# ENTRYPOINT 示例 - 不可覆盖', delay: 10 },
  { type: 'output', content: 'ENTRYPOINT ["echo"]', delay: 5 },
  { type: 'output', content: 'CMD ["Hello"]', delay: 3 },
  { type: 'output', content: '', delay: 3 },
  { type: 'input', content: '# docker run myimage "World" -> 输出 "World"', delay: 10 },
];

// COPY vs ADD 示例
const copyVsAdd: RemotionTerminalLine[] = [
  { type: 'input', content: '# COPY - 简单复制（推荐）', delay: 0 },
  { type: 'output', content: 'COPY ./app /app', delay: 10 },
  { type: 'output', content: '', delay: 3 },
  { type: 'input', content: '# ADD - 支持URL和自动解压', delay: 10 },
  { type: 'output', content: 'ADD https://example.com/file.tar.gz /tmp/', delay: 5 },
  { type: 'output', content: 'ADD archive.tar.gz /extract/', delay: 5 },
];

// ARG vs ENV 示例
const argVsEnv: RemotionTerminalLine[] = [
  { type: 'input', content: '# ARG - 构建时变量', delay: 0 },
  { type: 'output', content: 'ARG VERSION=18', delay: 10 },
  { type: 'output', content: 'FROM node:${VERSION}', delay: 5 },
  { type: 'output', content: '', delay: 3 },
  { type: 'input', content: '# ENV - 运行时环境变量', delay: 10 },
  { type: 'output', content: 'ENV NODE_ENV=production', delay: 5 },
  { type: 'output', content: 'ENV APP_HOME=/app', delay: 5 },
];

export const Instructions: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = { fps: 30 };

  // 场景配置
  const scenes = [
    { name: 'overview', duration: 50, lines: null, title: '核心指令概览' },
    { name: 'from', duration: 35, lines: null, title: 'FROM 指令' },
    { name: 'run', duration: 35, lines: null, title: 'RUN 指令' },
    { name: 'cmdEntrypoint', duration: 40, lines: cmdVsEntrypoint, title: 'CMD vs ENTRYPOINT' },
    { name: 'copyAdd', duration: 40, lines: copyVsAdd, title: 'COPY vs ADD' },
  ];

  // 计算当前场景
  let currentSceneIndex = 0;
  let currentFrameInScene = frame;
  let accumulatedFrame = 0;

  for (let i = 0; i < scenes.length; i++) {
    if (frame < accumulatedFrame + scenes[i].duration) {
      currentSceneIndex = i;
      currentFrameInScene = frame - accumulatedFrame;
      break;
    }
    accumulatedFrame += scenes[i].duration;
    if (i === scenes.length - 1) {
      currentSceneIndex = i;
      currentFrameInScene = frame - accumulatedFrame;
    }
  }

  const currentScene = scenes[currentSceneIndex];

  // 动画
  const titleProgress = spring({ frame: currentFrameInScene, fps, config: { damping: 20, stiffness: 100 } });
  const titleY = interpolate(titleProgress, [0, 1], [-30, 0]);
  const contentOpacity = interpolate(currentFrameInScene, [5, 15], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // 指令数据
  const instructions = [
    { name: 'FROM', color: COLORS.primary, desc: '指定基础镜像', example: 'FROM node:18-alpine' },
    { name: 'RUN', color: COLORS.accent, desc: '执行命令并创建新层', example: 'RUN npm install' },
    { name: 'CMD', color: '#9F7AEA', desc: '容器默认启动命令', example: 'CMD ["npm", "start"]' },
    { name: 'COPY', color: '#ED8936', desc: '复制文件到镜像', example: 'COPY . /app' },
    { name: 'WORKDIR', color: '#38B2AC', desc: '设置工作目录', example: 'WORKDIR /app' },
    { name: 'EXPOSE', color: '#E53E3E', desc: '声明暴露端口', example: 'EXPOSE 3000' },
  ];

  return (
    <AbsoluteFill style={{ background: BACKGROUND }}>
      {/* 标题区域 */}
      <div
        style={{
          position: 'absolute',
          top: 40,
          left: 60,
          right: 60,
        }}
      >
        <div
          style={{
            fontSize: 42,
            fontWeight: 'bold',
            color: COLORS.primary,
            transform: `translateY(${titleY}px)`,
            opacity: titleProgress,
          }}
        >
          {currentScene.title}
        </div>
      </div>

      {/* 指令概览 */}
      {currentSceneIndex === 0 && (
        <div
          style={{
            position: 'absolute',
            top: 120,
            left: 60,
            right: 60,
            bottom: 80,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: contentOpacity,
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 15, justifyContent: 'center', maxWidth: 900 }}>
            {instructions.map((inst, index) => {
              const cardProgress = spring({ 
                frame: currentFrameInScene - 5 - index * 3, 
                fps, 
                config: { damping: 15, stiffness: 80 } 
              });
              
              return (
                <div
                  key={inst.name}
                  style={{
                    padding: '15px 20px',
                    background: `rgba(${inst.name === 'FROM' ? '66, 153, 225' : inst.name === 'RUN' ? '72, 187, 120' : inst.name === 'CMD' ? '159, 122, 234' : inst.name === 'COPY' ? '237, 137, 54' : inst.name === 'WORKDIR' ? '56, 178, 172' : '229, 62, 62'}, 0.15)`,
                    border: `2px solid ${inst.color}`,
                    borderRadius: 10,
                    width: 140,
                    opacity: cardProgress,
                    transform: `scale(${cardProgress})`,
                  }}
                >
                  <div style={{ fontSize: 18, fontWeight: 'bold', color: inst.color, marginBottom: 5 }}>
                    {inst.name}
                  </div>
                  <div style={{ fontSize: 11, color: COLORS.textMuted, marginBottom: 8 }}>
                    {inst.desc}
                  </div>
                  <div style={{ fontSize: 10, fontFamily: 'monospace', color: COLORS.text, wordBreak: 'break-all' }}>
                    {inst.example}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* FROM 指令详解 */}
      {currentSceneIndex === 1 && (
        <div
          style={{
            position: 'absolute',
            top: 120,
            left: 60,
            right: 60,
            bottom: 80,
            display: 'flex',
            gap: 40,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: contentOpacity,
          }}
        >
          {/* 说明 */}
          <div style={{ maxWidth: 350 }}>
            <div style={{ fontSize: 16, color: COLORS.primary, fontWeight: 'bold', marginBottom: 15 }}>
              FROM 指令
            </div>
            <div style={{ fontSize: 14, color: COLORS.text, lineHeight: 1.8 }}>
              <div style={{ marginBottom: 10 }}>• 指定基础镜像（必须为第一条指令）</div>
              <div style={{ marginBottom: 10 }}>• 可以使用官方镜像或自定义镜像</div>
              <div style={{ marginBottom: 10 }}>• 建议使用特定版本标签</div>
            </div>
            <div
              style={{
                marginTop: 15,
                padding: '12px 15px',
                background: 'rgba(66, 153, 225, 0.1)',
                borderRadius: 6,
                fontSize: 13,
                fontFamily: 'monospace',
                color: COLORS.accent,
              }}
            >
              FROM node:18-alpine
            </div>
          </div>

          {/* 常用基础镜像 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ fontSize: 14, color: COLORS.textMuted, marginBottom: 5 }}>常用基础镜像</div>
            {[
              { name: 'node:18-alpine', size: '~50MB', desc: 'Node.js 轻量版' },
              { name: 'python:3.11-slim', size: '~120MB', desc: 'Python 精简版' },
              { name: 'nginx:alpine', size: '~25MB', desc: 'Nginx 轻量版' },
              { name: 'alpine:3.19', size: '~5MB', desc: '最小 Linux' },
            ].map((img, i) => (
              <div
                key={img.name}
                style={{
                  padding: '10px 15px',
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: 6,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span style={{ fontSize: 13, fontFamily: 'monospace', color: COLORS.text }}>{img.name}</span>
                <span style={{ fontSize: 11, color: COLORS.textMuted }}>{img.size}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* RUN 指令详解 */}
      {currentSceneIndex === 2 && (
        <div
          style={{
            position: 'absolute',
            top: 120,
            left: 60,
            right: 60,
            bottom: 80,
            display: 'flex',
            gap: 40,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: contentOpacity,
          }}
        >
          {/* 说明 */}
          <div style={{ maxWidth: 350 }}>
            <div style={{ fontSize: 16, color: COLORS.accent, fontWeight: 'bold', marginBottom: 15 }}>
              RUN 指令
            </div>
            <div style={{ fontSize: 14, color: COLORS.text, lineHeight: 1.8 }}>
              <div style={{ marginBottom: 10 }}>• 执行命令并创建新的镜像层</div>
              <div style={{ marginBottom: 10 }}>• shell 形式：RUN command</div>
              <div style={{ marginBottom: 10 }}>• exec 形式：RUN ["cmd", "arg"]</div>
            </div>
            <div
              style={{
                marginTop: 15,
                padding: '12px 15px',
                background: 'rgba(72, 187, 120, 0.1)',
                borderRadius: 6,
                fontSize: 12,
                fontFamily: 'monospace',
                color: COLORS.accent,
                lineHeight: 1.6,
              }}
            >
              # 推荐合并命令减少层数<br/>
              RUN apt-get update && \<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;apt-get install -y curl && \<br/>
              &nbsp;&nbsp;&nbsp;&nbsp;rm -rf /var/lib/apt/lists/*
            </div>
          </div>

          {/* 对比 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
            <div style={{ fontSize: 14, color: COLORS.textMuted, marginBottom: 5 }}>层缓存优化</div>
            <div
              style={{
                padding: '15px',
                background: 'rgba(229, 62, 62, 0.1)',
                border: '1px solid rgba(229, 62, 62, 0.3)',
                borderRadius: 8,
              }}
            >
              <div style={{ fontSize: 12, color: '#E53E3E', marginBottom: 5 }}>❌ 不推荐</div>
              <div style={{ fontSize: 11, fontFamily: 'monospace', color: COLORS.text, lineHeight: 1.5 }}>
                RUN apt-get update<br/>
                RUN apt-get install curl<br/>
                RUN apt-get install vim
              </div>
            </div>
            <div
              style={{
                padding: '15px',
                background: 'rgba(72, 187, 120, 0.1)',
                border: '1px solid rgba(72, 187, 120, 0.3)',
                borderRadius: 8,
              }}
            >
              <div style={{ fontSize: 12, color: COLORS.accent, marginBottom: 5 }}>✓ 推荐</div>
              <div style={{ fontSize: 11, fontFamily: 'monospace', color: COLORS.text, lineHeight: 1.5 }}>
                RUN apt-get update && \<br/>
                &nbsp;&nbsp;&nbsp;&nbsp;apt-get install -y curl vim
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 终端场景 */}
      {currentScene.lines && (
        <div
          style={{
            position: 'absolute',
            top: 120,
            left: 60,
            right: 60,
            bottom: 80,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}
        >
          <Terminal
            title="Dockerfile"
            lines={currentScene.lines}
            width={900}
            height={400}
            frameOffset={0}
          />
        </div>
      )}

      {/* 场景指示器 */}
      <div
        style={{
          position: 'absolute',
          bottom: 30,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 8,
        }}
      >
        {scenes.map((scene, i) => (
          <div
            key={scene.name}
            style={{
              width: i === currentSceneIndex ? 40 : 20,
              height: 4,
              background: i === currentSceneIndex ? COLORS.primary : 'rgba(255,255,255,0.2)',
              borderRadius: 2,
            }}
          />
        ))}
      </div>

      {/* 进度标签 */}
      <div
        style={{
          position: 'absolute',
          bottom: 50,
          right: 60,
          fontSize: 14,
          color: COLORS.textMuted,
        }}
      >
        核心指令
      </div>
    </AbsoluteFill>
  );
};
