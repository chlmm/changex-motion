// 通用标题组件
import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export interface TitleProps {
  text: string;
  subtitle?: string;
  color?: string;
  subtitleColor?: string;
  fontSize?: number;
  subtitleFontSize?: number;
  background?: string;
  showGlow?: boolean;
  animationType?: 'spring' | 'fade' | 'slide';
}

export const Title: React.FC<TitleProps> = ({
  text,
  subtitle,
  color = '#ffffff',
  subtitleColor = '#60a5fa',
  fontSize = 120,
  subtitleFontSize = 50,
  background = 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
  showGlow = true,
  animationType = 'spring',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const getAnimation = () => {
    switch (animationType) {
      case 'spring':
        return {
          progress: spring({ frame, fps, config: { damping: 15, stiffness: 100, mass: 0.5 } }),
        };
      case 'fade':
        return {
          progress: interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' }),
        };
      case 'slide':
        return {
          progress: interpolate(frame, [0, 30], [0, 1], { extrapolateRight: 'clamp' }),
        };
      default:
        return { progress: 1 };
    }
  };

  const { progress } = getAnimation();

  const titleTransform = animationType === 'slide' 
    ? `translateY(${(1 - progress) * 50}px) scale(${progress})`
    : `scale(${progress})`;

  const subtitleOpacity = interpolate(frame, [30, 60], [0, 1], { extrapolateRight: 'clamp' });

  const glowIntensity = interpolate(frame, [0, 60, 90], [0, 1, 0.5], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          fontSize,
          fontWeight: 'bold',
          color,
          textShadow: showGlow ? `0 0 ${30 * glowIntensity}px ${color}` : 'none',
          transform: titleTransform,
          opacity: progress,
        }}
      >
        {text}
      </div>
      
      {subtitle && (
        <div
          style={{
            fontSize: subtitleFontSize,
            color: subtitleColor,
            marginTop: 20,
            opacity: subtitleOpacity,
            textShadow: showGlow ? `0 0 20px ${subtitleColor}80` : 'none',
          }}
        >
          {subtitle}
        </div>
      )}
    </div>
  );
};
