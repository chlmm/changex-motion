// Docker 教程总结 - 标题
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { COLORS, BACKGROUND } from '../../config';

export const Overview: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const titleScale = interpolate(frame, [0, 20], [0.9, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        background: BACKGROUND,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          fontSize: 80,
          fontWeight: 'bold',
          color: COLORS.text,
          opacity: titleOpacity,
          transform: `scale(${titleScale})`,
          textShadow: '0 0 40px rgba(36, 150, 237, 0.4)',
        }}
      >
        🎉 课程总结
      </div>
    </AbsoluteFill>
  );
};
