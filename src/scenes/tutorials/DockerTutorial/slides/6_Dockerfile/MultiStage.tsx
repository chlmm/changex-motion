// 多阶段构建与缓存优化
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from 'remotion';
import { Terminal } from '../../components/Terminal';
import { COLORS, BACKGROUND } from '../../config';
import { multiStageDockerfile, buildWithArgs, buildNoCache } from '../../config/terminal/dockerfileConfig';

export const MultiStage: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = { fps: 30 };

  // 场景配置
  const scenes = [
    { name: 'concept', duration: 50, lines: null, title: '多阶段构建概念' },
    { name: 'example', duration: 60, lines: multiStageDockerfile, title: '多阶段构建示例', subtitle: 'Dockerfile.prod' },
    { name: 'cache', duration: 50, lines: null, title: '构建缓存优化' },
    { name: 'args', duration: 40, lines: buildWithArgs, title: '构建参数', subtitle: '--build-arg' },
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

      {/* 多阶段构建概念 */}
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
            {/* 构建阶段 */}
            <div
              style={{
                padding: '20px 25px',
                background: 'rgba(66, 153, 225, 0.15)',
                border: `2px solid ${COLORS.primary}`,
                borderRadius: 12,
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: 14, fontWeight: 'bold', color: COLORS.primary }}>Stage 1: Builder</div>
              <div style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 8 }}>编译、依赖安装</div>
              <div style={{ fontSize: 11, color: COLORS.text, marginTop: 5 }}>~500MB</div>
            </div>

            <div style={{ fontSize: 24, color: COLORS.accent }}>→</div>

            {/* 生产阶段 */}
            <div
              style={{
                padding: '20px 25px',
                background: 'rgba(72, 187, 120, 0.15)',
                border: `2px solid ${COLORS.accent}`,
                borderRadius: 12,
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: 14, fontWeight: 'bold', color: COLORS.accent }}>Stage 2: Runtime</div>
              <div style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 8 }}>运行时镜像</div>
              <div style={{ fontSize: 11, color: COLORS.text, marginTop: 5 }}>~50MB</div>
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
              多阶段构建的优势
            </div>
            <div style={{ fontSize: 14, color: COLORS.text, lineHeight: 1.8 }}>
              <div style={{ marginBottom: 8 }}>✓ 最终镜像更小，只包含运行时必需文件</div>
              <div style={{ marginBottom: 8 }}>✓ 构建工具不会进入生产镜像</div>
              <div>✓ 提高安全性和部署速度</div>
            </div>
          </div>
        </div>
      )}

      {/* 缓存优化 */}
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
            <div style={{ fontSize: 16, color: COLORS.primary, fontWeight: 'bold', marginBottom: 15 }}>
              构建缓存机制
            </div>
            <div style={{ fontSize: 14, color: COLORS.text, lineHeight: 1.8 }}>
              <div style={{ marginBottom: 10 }}>• Docker 会缓存每层构建结果</div>
              <div style={{ marginBottom: 10 }}>• 文件变化时，该层及后续缓存失效</div>
              <div style={{ marginBottom: 10 }}>• 变化少的指令放前面</div>
            </div>
          </div>

          {/* 层顺序示例 */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ fontSize: 14, color: COLORS.textMuted, marginBottom: 5 }}>推荐的指令顺序</div>
            {[
              { inst: 'FROM node:18', cached: true },
              { inst: 'WORKDIR /app', cached: true },
              { inst: 'COPY package*.json ./', cached: true },
              { inst: 'RUN npm install', cached: true },
              { inst: 'COPY . .', cached: false },
              { inst: 'CMD ["npm", "start"]', cached: false },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  padding: '8px 12px',
                  background: item.cached ? 'rgba(72, 187, 120, 0.1)' : 'rgba(237, 137, 54, 0.1)',
                  borderRadius: 4,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                <span style={{ fontSize: 11, fontFamily: 'monospace', color: COLORS.text, flex: 1 }}>
                  {item.inst}
                </span>
                <span style={{ fontSize: 10, color: item.cached ? COLORS.accent : '#ED8936' }}>
                  {item.cached ? '缓存命中' : '可能变化'}
                </span>
              </div>
            ))}
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
        多阶段构建
      </div>
    </AbsoluteFill>
  );
};
