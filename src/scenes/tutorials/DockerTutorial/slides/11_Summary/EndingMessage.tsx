// Docker 教程总结 - 结束语
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { COLORS, BACKGROUND } from '../../config';

export const EndingMessage: React.FC = () => {
  const frame = useCurrentFrame();

  const containerOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const containerY = interpolate(frame, [0, 20], [20, 0], { extrapolateRight: 'clamp' });

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
          textAlign: 'center',
          opacity: containerOpacity,
          transform: `translateY(${containerY}px)`,
        }}
      >
        <div style={{ color: COLORS.text, fontSize: 32, marginBottom: 16 }}>
          恭喜你完成了 Docker 教程！🐳
        </div>
        <div style={{ color: COLORS.textMuted, fontSize: 20 }}>
          继续实践，成为容器化高手！
        </div>
      </div>
    </AbsoluteFill>
  );
};
