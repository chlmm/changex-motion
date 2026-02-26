// 最佳实践与 .dockerignore
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from 'remotion';
import { Terminal } from '../../components/Terminal';
import { COLORS, BACKGROUND } from '../../config';
import { bestPracticesDockerfile, viewDockerignore } from '../../config/terminal/dockerfileConfig';

export const BestPractices: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = { fps: 30 };

  // 场景配置
  const scenes = [
    { name: 'overview', duration: 45, lines: null, title: '最佳实践概述' },
    { name: 'dockerignore', duration: 40, lines: viewDockerignore, title: '.dockerignore', subtitle: '排除不必要文件' },
    { name: 'example', duration: 55, lines: bestPracticesDockerfile, title: '优化后的 Dockerfile', subtitle: '生产环境示例' },
    { name: 'tips', duration: 40, lines: null, title: '构建技巧总结' },
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

  // 最佳实践列表
  const practices = [
    { icon: '📦', title: '使用特定版本标签', desc: 'FROM node:18.19.0-alpine' },
    { icon: '🔒', title: '非 root 用户运行', desc: 'USER appuser' },
    { icon: '📁', title: '最小化镜像层数', desc: '合并 RUN 指令' },
    { icon: '🎯', title: '利用缓存', desc: '依赖文件先复制' },
    { icon: '🗑️', title: '清理构建缓存', desc: 'rm -rf /var/lib/apt/lists/*' },
    { icon: '📋', title: '使用 .dockerignore', desc: '排除无关文件' },
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

      {/* 最佳实践概述 */}
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
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center', maxWidth: 900 }}>
            {practices.map((p, index) => {
              const cardProgress = spring({ 
                frame: currentFrameInScene - 5 - index * 3, 
                fps, 
                config: { damping: 15, stiffness: 80 } 
              });
              
              return (
                <div
                  key={p.title}
                  style={{
                    padding: '12px 18px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 10,
                    width: 200,
                    opacity: cardProgress,
                    transform: `scale(${cardProgress})`,
                  }}
                >
                  <div style={{ fontSize: 18, marginBottom: 5 }}>{p.icon}</div>
                  <div style={{ fontSize: 13, fontWeight: 'bold', color: COLORS.text, marginBottom: 4 }}>
                    {p.title}
                  </div>
                  <div style={{ fontSize: 11, color: COLORS.textMuted, fontFamily: 'monospace' }}>
                    {p.desc}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 构建技巧总结 */}
      {currentSceneIndex === 3 && (
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
          <div style={{ display: 'flex', gap: 30 }}>
            {/* 构建命令 */}
            <div style={{ maxWidth: 300 }}>
              <div style={{ fontSize: 16, color: COLORS.primary, fontWeight: 'bold', marginBottom: 15 }}>
                常用构建命令
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { cmd: 'docker build -t app:latest .', desc: '基本构建' },
                  { cmd: 'docker build --no-cache -t app .', desc: '无缓存构建' },
                  { cmd: 'docker build --build-arg VER=1.0 .', desc: '传递构建参数' },
                  { cmd: 'docker build -f Dockerfile.prod .', desc: '指定 Dockerfile' },
                ].map((item, i) => (
                  <div
                    key={i}
                    style={{
                      padding: '10px 12px',
                      background: 'rgba(255,255,255,0.05)',
                      borderRadius: 6,
                    }}
                  >
                    <div style={{ fontSize: 11, fontFamily: 'monospace', color: COLORS.accent }}>{item.cmd}</div>
                    <div style={{ fontSize: 10, color: COLORS.textMuted, marginTop: 4 }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* 镜像大小优化 */}
            <div style={{ maxWidth: 300 }}>
              <div style={{ fontSize: 16, color: COLORS.accent, fontWeight: 'bold', marginBottom: 15 }}>
                镜像大小优化
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  '使用 alpine 基础镜像',
                  '多阶段构建分离编译环境',
                  '清理包管理器缓存',
                  '合并 RUN 指令减少层数',
                  '使用 .dockerignore 排除文件',
                ].map((tip, i) => (
                  <div
                    key={i}
                    style={{
                      padding: '8px 12px',
                      background: 'rgba(72, 187, 120, 0.1)',
                      borderRadius: 6,
                      fontSize: 12,
                      color: COLORS.text,
                    }}
                  >
                    ✓ {tip}
                  </div>
                ))}
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
        最佳实践
      </div>
    </AbsoluteFill>
  );
};
