// 数据持久化与备份
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from 'remotion';
import { Terminal } from '../../components/Terminal';
import { COLORS, BACKGROUND } from '../../config';
import {
  backupVolume,
  restoreVolume,
  shareVolume,
  volumesFrom,
} from '../../config/terminal/volumeConfig';

import { RemotionTerminalLine } from '../../components/Terminal';

// 数据持久化示例
const persistenceDemo: RemotionTerminalLine[] = [
  { type: 'input', content: '# 数据持久化：容器删除后数据仍保留', delay: 0 },
  { type: 'input', content: 'docker run -d --name db -v pgdata:/var/lib/postgresql/data postgres', delay: 10 },
  { type: 'output', content: 'container_id_running', delay: 15 },
  { type: 'input', content: 'docker rm -f db', delay: 20 },
  { type: 'output', content: 'db', delay: 10 },
  { type: 'input', content: '# 数据卷仍然存在', delay: 15 },
  { type: 'input', content: 'docker volume ls', delay: 10 },
  { type: 'output', content: 'DRIVER    VOLUME NAME', delay: 10 },
  { type: 'output', content: 'local     pgdata', delay: 5 },
];

export const DataPersistence: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = { fps: 30 };

  // 场景配置
  const scenes = [
    { name: 'persistence', duration: 55, lines: null, title: '数据持久化概念' },
    { name: 'persistenceDemo', duration: 50, lines: persistenceDemo, title: '持久化演示' },
    { name: 'backup', duration: 35, lines: backupVolume, title: '备份 Volume', subtitle: 'tar 打包备份' },
    { name: 'restore', duration: 30, lines: restoreVolume, title: '恢复 Volume', subtitle: 'tar 解压恢复' },
    { name: 'share', duration: 35, lines: shareVolume, title: '容器间共享数据', subtitle: '同一 Volume 多容器' },
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

      {/* 数据持久化概念 */}
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
            {/* 容器生命周期 */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
              <div
                style={{
                  padding: '12px 20px',
                  background: 'rgba(66, 153, 225, 0.2)',
                  border: `2px solid ${COLORS.primary}`,
                  borderRadius: 8,
                }}
              >
                <div style={{ fontSize: 14, color: COLORS.text }}>Container</div>
              </div>
              <div style={{ fontSize: 12, color: COLORS.textMuted }}>生命周期有限</div>
            </div>

            <div style={{ fontSize: 24, color: COLORS.primary }}>+</div>

            {/* Volume */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
              <div
                style={{
                  padding: '12px 20px',
                  background: 'rgba(72, 187, 120, 0.2)',
                  border: `2px solid ${COLORS.accent}`,
                  borderRadius: 8,
                }}
              >
                <div style={{ fontSize: 14, color: COLORS.text }}>Volume</div>
              </div>
              <div style={{ fontSize: 12, color: COLORS.textMuted }}>持久存储</div>
            </div>

            <div style={{ fontSize: 24, color: COLORS.primary }}>=</div>

            {/* 结果 */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
              <div
                style={{
                  padding: '12px 20px',
                  background: 'rgba(159, 122, 234, 0.2)',
                  border: `2px solid #9F7AEA`,
                  borderRadius: 8,
                }}
              >
                <div style={{ fontSize: 14, color: COLORS.text }}>数据持久化</div>
              </div>
              <div style={{ fontSize: 12, color: COLORS.textMuted }}>数据安全</div>
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
              数据持久化的意义
            </div>
            <div style={{ fontSize: 14, color: COLORS.text, lineHeight: 1.8 }}>
              <div style={{ marginBottom: 8 }}>
                <span style={{ color: COLORS.accent }}>✓</span> 容器删除后数据不会丢失
              </div>
              <div style={{ marginBottom: 8 }}>
                <span style={{ color: COLORS.accent }}>✓</span> 数据可以在容器间共享
              </div>
              <div style={{ marginBottom: 8 }}>
                <span style={{ color: COLORS.accent }}>✓</span> 方便数据备份和迁移
              </div>
              <div>
                <span style={{ color: COLORS.accent }}>✓</span> 数据库、配置文件等重要数据必须持久化
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
            title="Docker Volume"
            lines={currentScene.lines}
            width={900}
            height={380}
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
        数据持久化
      </div>
    </AbsoluteFill>
  );
};
