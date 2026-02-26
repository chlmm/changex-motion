// 渐变背景组件
import React from 'react';
import { AbsoluteFill } from 'remotion';

export interface GradientBackgroundProps {
  children?: React.ReactNode;
  colors?: string[];
  direction?: 'vertical' | 'horizontal' | 'diagonal';
}

export const GradientBackground: React.FC<GradientBackgroundProps> = ({
  children,
  colors = ['#1a1a2e', '#16213e', '#0f3460'],
  direction = 'diagonal',
}) => {
  const getGradient = () => {
    const colorStops = colors.join(', ');
    switch (direction) {
      case 'vertical':
        return `linear-gradient(180deg, ${colorStops})`;
      case 'horizontal':
        return `linear-gradient(90deg, ${colorStops})`;
      case 'diagonal':
      default:
        return `linear-gradient(135deg, ${colorStops})`;
    }
  };

  return (
    <AbsoluteFill
      style={{
        background: getGradient(),
      }}
    >
      {children}
    </AbsoluteFill>
  );
};
