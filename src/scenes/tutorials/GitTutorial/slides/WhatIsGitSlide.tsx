// 什么是 Git 幻灯片
import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { COLORS, BACKGROUND } from '../config';

const features = [
  { title: '版本控制', desc: '追踪文件的每一次修改', icon: '📝' },
  { title: '团队协作', desc: '多人并行开发不冲突', icon: '👥' },
  { title: '分支管理', desc: '独立开发新功能', icon: '🌳' },
  { title: '历史回溯', desc: '随时回到任意版本', icon: '⏪' },
];

export const WhatIsGitSlide: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        background: BACKGROUND,
        padding: 80,
      }}
    >
      {/* 标题 */}
      <div
        style={{
          fontSize: 70,
          color: COLORS.primary,
          fontWeight: 'bold',
          marginBottom: 60,
          opacity: interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' }),
        }}
      >
        什么是 Git？
      </div>

      {/* 功能卡片 */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 40,
        }}
      >
        {features.map((feature, index) => {
          const cardProgress = spring({
            frame: frame - 20 - index * 10,
            fps,
            config: { damping: 15, stiffness: 100 },
          });

          return (
            <div
              key={index}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: 20,
                padding: 40,
                border: `2px solid ${COLORS.secondary}4D`,
                transform: `scale(${cardProgress}) translateY(${(1 - cardProgress) * 30}px)`,
                opacity: cardProgress,
              }}
            >
              <div style={{ fontSize: 60, marginBottom: 20 }}>{feature.icon}</div>
              <div
                style={{
                  fontSize: 45,
                  color: COLORS.secondary,
                  fontWeight: 'bold',
                  marginBottom: 15,
                }}
              >
                {feature.title}
              </div>
              <div style={{ fontSize: 30, color: COLORS.textMuted }}>{feature.desc}</div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
