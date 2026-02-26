// Docker 教程底部标签动画
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { COLORS } from '../../config';

const tags = ['镜像', '容器', '网络', '数据卷', '编排'];

export const BottomTags: React.FC = () => {
  const frame = useCurrentFrame();

  // 整体淡入
  const containerOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 60,
        // 透明背景，叠加显示
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: 20,
          opacity: containerOpacity,
        }}
      >
        {tags.map((item, i) => {
          const tagOpacity = interpolate(
            frame,
            [10 + i * 5, 25 + i * 5],
            [0, 1],
            { extrapolateRight: 'clamp' }
          );
          const tagScale = interpolate(
            frame,
            [10 + i * 5, 25 + i * 5],
            [0.8, 1],
            { extrapolateRight: 'clamp' }
          );

          return (
            <div
              key={item}
              style={{
                padding: '10px 20px',
                background: 'rgba(36, 150, 237, 0.2)',
                borderRadius: 20,
                border: `1px solid ${COLORS.primary}`,
                color: COLORS.text,
                fontSize: 18,
                opacity: tagOpacity,
                transform: `scale(${tagScale})`,
              }}
            >
              {item}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
