// Docker 教程总结 - 核心回顾
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { COLORS, BACKGROUND } from '../../config';

const summaryItems = [
  { title: '镜像管理', items: ['docker pull/push', 'docker build', 'docker images', 'docker rmi'] },
  { title: '容器操作', items: ['docker run', 'docker exec', 'docker ps', 'docker logs'] },
  { title: '数据管理', items: ['数据卷挂载', 'bind mount', '数据卷共享', '数据备份'] },
  { title: '网络配置', items: ['bridge网络', '自定义网络', '容器互联', '端口映射'] },
];

export const CoreReview: React.FC = () => {
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
        🎉 课程总结
      </div>

      {/* 总结卡片 */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 25,
          padding: '0 20px',
        }}
      >
        {summaryItems.map((section, i) => {
          const cardOpacity = interpolate(
            frame,
            [20 + i * 10, 40 + i * 10],
            [0, 1],
            { extrapolateRight: 'clamp' }
          );

          return (
            <div
              key={section.title}
              style={{
                background: 'rgba(36, 150, 237, 0.1)',
                border: `1px solid ${COLORS.primary}40`,
                borderRadius: 16,
                padding: 24,
                opacity: cardOpacity,
              }}
            >
              <div
                style={{
                  color: COLORS.primary,
                  fontSize: 22,
                  fontWeight: 'bold',
                  marginBottom: 16,
                  paddingBottom: 12,
                  borderBottom: `1px solid ${COLORS.primary}30`,
                }}
              >
                {section.title}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {section.items.map((item, j) => (
                  <div
                    key={item}
                    style={{
                      color: COLORS.textMuted,
                      fontSize: 15,
                      fontFamily: 'monospace',
                    }}
                  >
                    • {item}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
