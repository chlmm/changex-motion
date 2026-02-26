// Compose 核心概念
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from 'remotion';
import { COLORS, BACKGROUND } from '../../config';

export const Concept: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = { fps: 30 };

  // 场景配置
  const scenes = [
    { name: 'intro', duration: 80, title: 'Docker Compose 简介' },
    { name: 'architecture', duration: 80, title: '多服务架构' },
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
  const contentOpacity = interpolate(currentFrameInScene, [5, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

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

      {/* Compose 简介 */}
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
          {/* 图示 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 40 }}>
            {/* docker-compose.yml */}
            <div
              style={{
                padding: '20px 30px',
                background: 'rgba(66, 153, 225, 0.15)',
                border: `2px solid ${COLORS.primary}`,
                borderRadius: 12,
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: 16, fontWeight: 'bold', color: COLORS.primary }}>docker-compose.yml</div>
              <div style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 5 }}>声明式配置</div>
            </div>

            <div style={{ fontSize: 24, color: COLORS.accent }}>→</div>

            {/* 单命令 */}
            <div
              style={{
                padding: '20px 30px',
                background: 'rgba(72, 187, 120, 0.15)',
                border: `2px solid ${COLORS.accent}`,
                borderRadius: 12,
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: 16, fontWeight: 'bold', color: COLORS.accent }}>docker compose up</div>
              <div style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 5 }}>一键启动</div>
            </div>

            <div style={{ fontSize: 24, color: COLORS.accent }}>→</div>

            {/* 多容器 */}
            <div
              style={{
                padding: '20px 30px',
                background: 'rgba(159, 122, 234, 0.15)',
                border: '2px solid #9F7AEA',
                borderRadius: 12,
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: 16, fontWeight: 'bold', color: '#9F7AEA' }}>Multi-Container</div>
              <div style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 5 }}>多容器应用</div>
            </div>
          </div>

          {/* 说明 */}
          <div
            style={{
              padding: '20px 30px',
              background: 'rgba(255,255,255,0.05)',
              borderRadius: 8,
              maxWidth: 650,
            }}
          >
            <div style={{ fontSize: 16, color: COLORS.primary, fontWeight: 'bold', marginBottom: 12 }}>
              什么是 Docker Compose？
            </div>
            <div style={{ fontSize: 14, color: COLORS.text, lineHeight: 1.8 }}>
              <div style={{ marginBottom: 8 }}>• 定义和运行多容器 Docker 应用的工具</div>
              <div style={{ marginBottom: 8 }}>• 使用 YAML 文件配置服务、网络、卷</div>
              <div>• 单条命令创建和启动所有服务</div>
            </div>
          </div>
        </div>
      )}

      {/* 多服务架构 */}
      {currentSceneIndex === 1 && (
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
          {/* 服务架构图 */}
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 15, marginBottom: 30 }}>
            {/* Web 服务 */}
            <div
              style={{
                padding: '15px 20px',
                background: 'rgba(66, 153, 225, 0.15)',
                border: `2px solid ${COLORS.primary}`,
                borderRadius: 10,
                textAlign: 'center',
                width: 120,
              }}
            >
              <div style={{ fontSize: 14, fontWeight: 'bold', color: COLORS.primary }}>web</div>
              <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 5 }}>Node.js App</div>
              <div style={{ fontSize: 10, color: COLORS.text, marginTop: 3 }}>port: 3000</div>
            </div>

            <div style={{ marginTop: 25, fontSize: 18, color: COLORS.textMuted }}>→</div>

            {/* API 服务 */}
            <div
              style={{
                padding: '15px 20px',
                background: 'rgba(72, 187, 120, 0.15)',
                border: `2px solid ${COLORS.accent}`,
                borderRadius: 10,
                textAlign: 'center',
                width: 120,
              }}
            >
              <div style={{ fontSize: 14, fontWeight: 'bold', color: COLORS.accent }}>api</div>
              <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 5 }}>Express API</div>
              <div style={{ fontSize: 10, color: COLORS.text, marginTop: 3 }}>port: 4000</div>
            </div>

            <div style={{ marginTop: 25, fontSize: 18, color: COLORS.textMuted }}>→</div>

            {/* 数据库服务 */}
            <div
              style={{
                padding: '15px 20px',
                background: 'rgba(237, 137, 54, 0.15)',
                border: '2px solid #ED8936',
                borderRadius: 10,
                textAlign: 'center',
                width: 120,
              }}
            >
              <div style={{ fontSize: 14, fontWeight: 'bold', color: '#ED8936' }}>db</div>
              <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 5 }}>PostgreSQL</div>
              <div style={{ fontSize: 10, color: COLORS.text, marginTop: 3 }}>volume: data</div>
            </div>

            <div style={{ marginTop: 25, fontSize: 18, color: COLORS.textMuted }}>→</div>

            {/* 缓存服务 */}
            <div
              style={{
                padding: '15px 20px',
                background: 'rgba(229, 62, 62, 0.15)',
                border: '2px solid #E53E3E',
                borderRadius: 10,
                textAlign: 'center',
                width: 120,
              }}
            >
              <div style={{ fontSize: 14, fontWeight: 'bold', color: '#E53E3E' }}>redis</div>
              <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 5 }}>Cache</div>
              <div style={{ fontSize: 10, color: COLORS.text, marginTop: 3 }}>port: 6379</div>
            </div>
          </div>

          {/* 底部网络 */}
          <div
            style={{
              padding: '10px 30px',
              background: 'rgba(159, 122, 234, 0.1)',
              border: '1px dashed #9F7AEA',
              borderRadius: 8,
              marginTop: 10,
            }}
          >
            <div style={{ fontSize: 12, color: '#9F7AEA' }}>Docker Network: myapp_default (自动创建)</div>
          </div>

          {/* 核心概念 */}
          <div style={{ display: 'flex', gap: 20, marginTop: 30 }}>
            {[
              { title: 'Services', desc: '定义容器' },
              { title: 'Networks', desc: '服务通信' },
              { title: 'Volumes', desc: '数据持久化' },
            ].map((item, i) => (
              <div
                key={item.title}
                style={{
                  padding: '10px 20px',
                  background: 'rgba(255,255,255,0.05)',
                  borderRadius: 6,
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: 13, fontWeight: 'bold', color: COLORS.text }}>{item.title}</div>
                <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 3 }}>{item.desc}</div>
              </div>
            ))}
          </div>
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
        核心概念
      </div>
    </AbsoluteFill>
  );
};
