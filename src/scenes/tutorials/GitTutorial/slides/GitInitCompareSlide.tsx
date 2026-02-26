// 对比演示：git init 不同场景
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { Terminal } from '../components/Terminal';
import { COLORS, BACKGROUND } from '../config';
import { gitInitFirstTime, gitInitReinitialized } from '../config';

export const GitInitCompareSlide: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const containerOpacity = interpolate(frame, [20, 40], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        background: BACKGROUND,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      {/* 主标题 */}
      <div
        style={{
          fontSize: 56,
          color: COLORS.primary,
          fontWeight: 'bold',
          marginBottom: 40,
          opacity: titleOpacity,
        }}
      >
        git init 对比演示
      </div>

      {/* 对比终端容器 */}
      <div
        style={{
          display: 'flex',
          gap: 40,
          opacity: containerOpacity,
        }}
      >
        {/* 左侧终端 */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Terminal
            title="~/empty-project — bash"
            lines={gitInitFirstTime}
            width={800}
            height={380}
            typingSpeed={2}
          />
          <div
            style={{
              marginTop: 16,
              fontSize: 24,
              color: COLORS.secondary,
              fontWeight: 500,
            }}
          >
            首次初始化
          </div>
        </div>

        {/* 右侧终端 */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Terminal
            title="~/existing-project — bash"
            lines={gitInitReinitialized}
            width={800}
            height={380}
            typingSpeed={2}
          />
          <div
            style={{
              marginTop: 16,
              fontSize: 24,
              color: COLORS.secondary,
              fontWeight: 500,
            }}
          >
            重新初始化
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
