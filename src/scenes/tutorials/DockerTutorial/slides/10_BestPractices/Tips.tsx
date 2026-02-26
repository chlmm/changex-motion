// Docker 最佳实践 - 底部提示
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { COLORS } from '../../config';

export const Tips: React.FC = () => {
  const frame = useCurrentFrame();

  const tipOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 40,
        // 透明背景，叠加显示
      }}
    >
      <div
        style={{
          background: `${COLORS.warning}20`,
          border: `1px solid ${COLORS.warning}60`,
          borderRadius: 12,
          padding: '15px 30px',
          opacity: tipOpacity,
        }}
      >
        <span style={{ color: COLORS.warning, fontSize: 18 }}>
          💡 遵循最佳实践可以让你的容器更安全、更高效、更易维护
        </span>
      </div>
    </AbsoluteFill>
  );
};
