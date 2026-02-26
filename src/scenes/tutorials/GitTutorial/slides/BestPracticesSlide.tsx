// 最佳实践幻灯片
import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { COLORS, BACKGROUND } from '../config';

const practices = [
  { title: '频繁提交', desc: '小步快跑，每次只做一件事', icon: '🔄' },
  { title: '写好提交信息', desc: '清晰描述本次修改的内容', icon: '✍️' },
  { title: '先拉后推', desc: 'push 前先 pull 最新代码', icon: '⬇️' },
  { title: '善用分支', desc: '新功能在新分支开发', icon: '🌿' },
];

export const BestPracticesSlide: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        background: BACKGROUND,
        padding: 80,
      }}
    >
      <div
        style={{
          fontSize: 70,
          color: COLORS.primary,
          fontWeight: 'bold',
          marginBottom: 60,
          opacity: interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' }),
        }}
      >
        最佳实践
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 40,
        }}
      >
        {practices.map((practice, index) => {
          const cardProgress = spring({
            frame: frame - 20 - index * 15,
            fps,
            config: { damping: 15, stiffness: 100 },
          });

          return (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 30,
                background: 'rgba(255, 255, 255, 0.05)',
                borderRadius: 20,
                padding: 35,
                border: `2px solid ${COLORS.secondary}4D`,
                transform: `translateX(${(1 - cardProgress) * 50}px)`,
                opacity: cardProgress,
              }}
            >
              <div style={{ fontSize: 70 }}>{practice.icon}</div>
              <div>
                <div
                  style={{
                    fontSize: 40,
                    color: COLORS.secondary,
                    fontWeight: 'bold',
                    marginBottom: 10,
                  }}
                >
                  {practice.title}
                </div>
                <div style={{ fontSize: 28, color: COLORS.textMuted }}>{practice.desc}</div>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
