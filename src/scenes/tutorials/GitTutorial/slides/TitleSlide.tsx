// Git 教程标题幻灯片
import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { COLORS, BACKGROUND } from '../config';

export const TitleSlide: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleProgress = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 100, mass: 0.5 },
  });

  const gitLogoScale = spring({
    frame: frame - 10,
    fps,
    config: { damping: 12, stiffness: 80, mass: 0.8 },
  });

  const subtitleOpacity = interpolate(frame, [40, 70], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        background: BACKGROUND,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      {/* Git Logo */}
      <div
        style={{
          width: 200,
          height: 200,
          marginBottom: 40,
          transform: `scale(${gitLogoScale}) rotate(${titleProgress * 360}deg)`,
          opacity: titleProgress,
        }}
      >
        <svg viewBox="0 0 256 256" fill="none">
          <path
            d="M251.17 116.6l-111.77-111.77a14.86 14.86 0 0 0-21 0l-23.28 23.28 26.55 26.55a17.64 17.64 0 0 1 22.34 22.47l25.58 25.58a17.65 17.65 0 1 1-10.59 10l-23.87-23.87v62.87a17.65 17.65 0 1 1-14.53-.52v-63.4a17.65 17.65 0 0 1-9.59-23.15l-26.17-26.21-69.18 69.18a14.86 14.86 0 0 0 0 21l111.77 111.77a14.86 14.86 0 0 0 21 0l111.38-111.38a14.86 14.86 0 0 0 0-21z"
            fill={COLORS.primary}
          />
        </svg>
      </div>

      {/* 标题 */}
      <div
        style={{
          fontSize: 140,
          fontWeight: 'bold',
          color: COLORS.primary,
          textShadow: `0 0 40px ${COLORS.primary}99`,
          transform: `translateY(${(1 - titleProgress) * 50}px)`,
          opacity: titleProgress,
        }}
      >
        Git 教程
      </div>

      {/* 副标题 */}
      <div
        style={{
          fontSize: 50,
          color: COLORS.secondary,
          marginTop: 20,
          opacity: subtitleOpacity,
          textShadow: `0 0 20px ${COLORS.secondary}80`,
        }}
      >
        版本控制从入门到精通
      </div>
    </AbsoluteFill>
  );
};
