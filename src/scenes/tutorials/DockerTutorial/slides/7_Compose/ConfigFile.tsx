// docker-compose.yml 配置文件详解
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from 'remotion';
import { Terminal } from '../../components/Terminal';
import { COLORS, BACKGROUND } from '../../config';
import { viewComposeFile } from '../../config/terminal/composeConfig';

import { RemotionTerminalLine } from '../../components/Terminal';

// 环境变量配置示例
const envFileExample: RemotionTerminalLine[] = [
  { type: 'input', content: '# .env 文件', delay: 0 },
  { type: 'output', content: 'POSTGRES_PASSWORD=secret123', delay: 10 },
  { type: 'output', content: 'NODE_ENV=production', delay: 3 },
  { type: 'output', content: 'API_KEY=your_api_key', delay: 3 },
];

// 完整配置示例
const fullComposeFile: RemotionTerminalLine[] = [
  { type: 'input', content: 'cat docker-compose.yml', delay: 0 },
  { type: 'output', content: 'version: "3.8"', delay: 10 },
  { type: 'output', content: '', delay: 2 },
  { type: 'output', content: 'services:', delay: 3 },
  { type: 'output', content: '  web:', delay: 3 },
  { type: 'output', content: '    build:', delay: 3 },
  { type: 'output', content: '      context: .', delay: 3 },
  { type: 'output', content: '      dockerfile: Dockerfile', delay: 3 },
  { type: 'output', content: '    ports:', delay: 3 },
  { type: 'output', content: '      - "3000:3000"', delay: 3 },
  { type: 'output', content: '    environment:', delay: 3 },
  { type: 'output', content: '      - NODE_ENV=${NODE_ENV}', delay: 3 },
  { type: 'output', content: '    depends_on:', delay: 3 },
  { type: 'output', content: '      db:', delay: 3 },
  { type: 'output', content: '        condition: service_healthy', delay: 3 },
  { type: 'output', content: '    restart: unless-stopped', delay: 3 },
];

export const ConfigFile: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = { fps: 30 };

  // 场景配置
  const scenes = [
    { name: 'structure', duration: 50, lines: null, title: '配置文件结构' },
    { name: 'services', duration: 50, lines: viewComposeFile, title: '服务配置', subtitle: 'services' },
    { name: 'volumes', duration: 50, lines: null, title: '卷与网络配置', subtitle: 'volumes & networks' },
    { name: 'env', duration: 50, lines: envFileExample, title: '环境变量', subtitle: '.env 文件' },
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
        {currentScene.subtitle && (
          <div
            style={{
              fontSize: 20,
              color: COLORS.textMuted,
              marginTop: 8,
              fontFamily: 'monospace',
              opacity: titleProgress,
            }}
          >
            {currentScene.subtitle}
          </div>
        )}
      </div>

      {/* 配置文件结构 */}
      {currentSceneIndex === 0 && (
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
          {/* YAML 结构 */}
          <div
            style={{
              padding: '20px 25px',
              background: 'rgba(255,255,255,0.05)',
              borderRadius: 10,
              fontFamily: 'monospace',
              fontSize: 13,
              lineHeight: 1.8,
            }}
          >
            <div style={{ color: COLORS.textMuted }}># docker-compose.yml</div>
            <div style={{ color: COLORS.primary }}>version: <span style={{ color: COLORS.text }}>"3.8"</span></div>
            <div style={{ color: COLORS.primary }}>services:</div>
            <div style={{ color: COLORS.textMuted, paddingLeft: 20 }}># 定义服务</div>
            <div style={{ color: COLORS.primary }}>networks:</div>
            <div style={{ color: COLORS.textMuted, paddingLeft: 20 }}># 定义网络</div>
            <div style={{ color: COLORS.primary }}>volumes:</div>
            <div style={{ color: COLORS.textMuted, paddingLeft: 20 }}># 定义卷</div>
          </div>

          {/* 说明 */}
          <div style={{ maxWidth: 300 }}>
            <div style={{ fontSize: 16, color: COLORS.primary, fontWeight: 'bold', marginBottom: 15 }}>
              顶层配置项
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { key: 'version', desc: 'Compose 文件版本' },
                { key: 'services', desc: '定义应用服务' },
                { key: 'networks', desc: '自定义网络' },
                { key: 'volumes', desc: '命名卷定义' },
              ].map((item) => (
                <div
                  key={item.key}
                  style={{
                    padding: '10px 15px',
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: 6,
                  }}
                >
                  <span style={{ fontSize: 13, fontFamily: 'monospace', color: COLORS.accent }}>{item.key}</span>
                  <span style={{ fontSize: 12, color: COLORS.textMuted, marginLeft: 10 }}>{item.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 卷与网络配置 */}
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
          {/* 卷配置 */}
          <div
            style={{
              padding: '20px 25px',
              background: 'rgba(237, 137, 54, 0.1)',
              border: '1px solid rgba(237, 137, 54, 0.3)',
              borderRadius: 10,
              fontFamily: 'monospace',
              fontSize: 12,
              lineHeight: 1.8,
            }}
          >
            <div style={{ color: '#ED8936', marginBottom: 10 }}>volumes:</div>
            <div style={{ color: COLORS.text }}>  postgres_data:</div>
            <div style={{ color: COLORS.text }}>  redis_data:</div>
            <div style={{ color: COLORS.textMuted, marginTop: 10 }}># 命名卷自动创建</div>
          </div>

          {/* 网络配置 */}
          <div
            style={{
              padding: '20px 25px',
              background: 'rgba(159, 122, 234, 0.1)',
              border: '1px solid rgba(159, 122, 234, 0.3)',
              borderRadius: 10,
              fontFamily: 'monospace',
              fontSize: 12,
              lineHeight: 1.8,
            }}
          >
            <div style={{ color: '#9F7AEA', marginBottom: 10 }}>networks:</div>
            <div style={{ color: COLORS.text }}>  frontend:</div>
            <div style={{ color: COLORS.text }}>  backend:</div>
            <div style={{ color: COLORS.textMuted, marginTop: 10 }}># 自定义网络隔离</div>
          </div>

          {/* 说明 */}
          <div style={{ maxWidth: 280 }}>
            <div style={{ fontSize: 14, color: COLORS.text, lineHeight: 1.8 }}>
              <div style={{ marginBottom: 10, color: '#ED8936', fontWeight: 'bold' }}>Volumes</div>
              <div style={{ marginBottom: 15 }}>• 数据持久化存储</div>
              <div style={{ marginBottom: 10, color: '#9F7AEA', fontWeight: 'bold' }}>Networks</div>
              <div>• 服务间网络隔离</div>
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
            title="docker-compose.yml"
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
        配置文件
      </div>
    </AbsoluteFill>
  );
};
