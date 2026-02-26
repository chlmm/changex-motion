// Dockerfile 基本结构与构建
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from 'remotion';
import { Terminal } from '../../components/Terminal';
import { COLORS, BACKGROUND } from '../../config';
import { viewDockerfile, buildFromDockerfile } from '../../config/terminal/dockerfileConfig';

export const BasicStructure: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = { fps: 30 };

  // 场景配置
  const scenes = [
    { name: 'intro', duration: 50, lines: null, title: 'Dockerfile 简介' },
    { name: 'view', duration: 70, lines: viewDockerfile, title: 'Dockerfile 结构', subtitle: 'cat Dockerfile' },
    { name: 'build', duration: 60, lines: buildFromDockerfile, title: '构建镜像', subtitle: 'docker build' },
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

      {/* Dockerfile 简介 */}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: 30, marginBottom: 40 }}>
            {/* Dockerfile */}
            <div
              style={{
                padding: '20px 30px',
                background: 'rgba(66, 153, 225, 0.15)',
                border: `2px solid ${COLORS.primary}`,
                borderRadius: 12,
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: 18, fontWeight: 'bold', color: COLORS.primary }}>Dockerfile</div>
              <div style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 5 }}>构建脚本</div>
            </div>

            <div style={{ fontSize: 28, color: COLORS.accent }}>→</div>

            {/* Build */}
            <div
              style={{
                padding: '20px 30px',
                background: 'rgba(72, 187, 120, 0.15)',
                border: `2px solid ${COLORS.accent}`,
                borderRadius: 12,
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: 18, fontWeight: 'bold', color: COLORS.accent }}>docker build</div>
              <div style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 5 }}>构建命令</div>
            </div>

            <div style={{ fontSize: 28, color: COLORS.accent }}>→</div>

            {/* Image */}
            <div
              style={{
                padding: '20px 30px',
                background: 'rgba(159, 122, 234, 0.15)',
                border: '2px solid #9F7AEA',
                borderRadius: 12,
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: 18, fontWeight: 'bold', color: '#9F7AEA' }}>Docker Image</div>
              <div style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 5 }}>可移植镜像</div>
            </div>
          </div>

          {/* 说明 */}
          <div
            style={{
              padding: '20px 30px',
              background: 'rgba(255,255,255,0.05)',
              borderRadius: 8,
              maxWidth: 600,
            }}
          >
            <div style={{ fontSize: 16, color: COLORS.primary, fontWeight: 'bold', marginBottom: 12 }}>
              什么是 Dockerfile？
            </div>
            <div style={{ fontSize: 14, color: COLORS.text, lineHeight: 1.8 }}>
              <div style={{ marginBottom: 8 }}>• 文本文件，包含构建镜像的所有指令</div>
              <div style={{ marginBottom: 8 }}>• 每条指令构建一层镜像</div>
              <div>• 可重复、可版本化的构建过程</div>
            </div>
          </div>
        </div>
      )}

      {/* 终端场景 */}
      {currentScene.lines && (
        <div
          style={{
            position: 'absolute',
            top: 130,
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
        基本结构
      </div>
    </AbsoluteFill>
  );
};
