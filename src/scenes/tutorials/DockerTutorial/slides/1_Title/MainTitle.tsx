// Docker 教程主标题动画
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { COLORS, BACKGROUND } from '../../config';
import { DockerWhale } from '../../components/DockerWhale';

export const MainTitle: React.FC = () => {
  const frame = useCurrentFrame();

  // 标题动画
  const titleOpacity = interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' });
  const titleY = interpolate(frame, [0, 30], [50, 0], { extrapolateRight: 'clamp' });

  // 副标题动画
  const subtitleOpacity = interpolate(frame, [20, 50], [0, 1], { extrapolateRight: 'clamp' });

  // Docker Logo 鲸鱼动画
  const whaleScale = interpolate(frame, [30, 60], [0.5, 1], { extrapolateRight: 'clamp' });
  const whaleRotate = interpolate(frame, [30, 60], [-10, 0], { extrapolateRight: 'clamp' });

  // 集装箱动画
  const containerDelay = 60;
  const containers = [0, 1, 2, 3, 4, 5, 6];
  const containerOpacity = containers.map((_, i) =>
    interpolate(frame, [containerDelay + i * 5, containerDelay + i * 5 + 10], [0, 1], { extrapolateRight: 'clamp' })
  );

  return (
    <AbsoluteFill
      style={{
        background: BACKGROUND,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      {/* Docker 鲸鱼图标 */}
      <DockerWhale
        scale={whaleScale}
        rotate={whaleRotate}
        containerOpacities={containerOpacity}
      />

      {/* 标题 */}
      <div
        style={{
          fontSize: 96,
          fontWeight: 'bold',
          color: COLORS.text,
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          textShadow: '0 0 60px rgba(36, 150, 237, 0.5)',
        }}
      >
        Docker 教程
      </div>

      {/* 副标题 */}
      <div
        style={{
          fontSize: 36,
          color: COLORS.primary,
          marginTop: 20,
          opacity: subtitleOpacity,
        }}
      >
        容器化技术从入门到精通
      </div>
    </AbsoluteFill>
  );
};
