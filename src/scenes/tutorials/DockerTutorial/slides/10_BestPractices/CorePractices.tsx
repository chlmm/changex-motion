// Docker 最佳实践 - 核心实践卡片
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { COLORS, BACKGROUND } from '../../config';

const practices = [
  { title: '使用 .dockerignore', desc: '排除不必要的文件，减小镜像体积', icon: '📄' },
  { title: '多阶段构建', desc: '分离构建环境和运行环境', icon: '🏗️' },
  { title: '最小化基础镜像', desc: '使用 alpine 版本减少攻击面', icon: '📦' },
  { title: '不使用 root 用户', desc: '创建专用用户运行应用', icon: '👤' },
  { title: '利用缓存层', desc: '合理安排 Dockerfile 指令顺序', icon: '⚡' },
  { title: '单一职责', desc: '每个容器只运行一个进程', icon: '🎯' },
];

export const CorePractices: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        background: BACKGROUND,
        padding: 60,
      }}
    >
      {/* 标题 */}
      <div
        style={{
          fontSize: 64,
          fontWeight: 'bold',
          color: COLORS.text,
          opacity: titleOpacity,
          marginBottom: 40,
          textAlign: 'center',
        }}
      >
        Docker 最佳实践
      </div>

      {/* 最佳实践卡片 */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 30,
          padding: '0 40px',
        }}
      >
        {practices.map((practice, i) => {
          const cardOpacity = interpolate(
            frame,
            [20 + i * 10, 40 + i * 10],
            [0, 1],
            { extrapolateRight: 'clamp' }
          );
          const cardY = interpolate(
            frame,
            [20 + i * 10, 40 + i * 10],
            [30, 0],
            { extrapolateRight: 'clamp' }
          );

          return (
            <div
              key={practice.title}
              style={{
                background: 'rgba(36, 150, 237, 0.1)',
                border: `1px solid ${COLORS.primary}40`,
                borderRadius: 20,
                padding: 30,
                opacity: cardOpacity,
                transform: `translateY(${cardY}px)`,
              }}
            >
              <div style={{ fontSize: 48, marginBottom: 15 }}>{practice.icon}</div>
              <div
                style={{
                  color: COLORS.text,
                  fontSize: 24,
                  fontWeight: 'bold',
                  marginBottom: 10,
                }}
              >
                {practice.title}
              </div>
              <div
                style={{
                  color: COLORS.textMuted,
                  fontSize: 16,
                  lineHeight: 1.6,
                }}
              >
                {practice.desc}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
