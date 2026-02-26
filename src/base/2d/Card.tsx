// 通用卡片组件
import React from 'react';
import { spring, useCurrentFrame, useVideoConfig } from 'remotion';

export interface CardProps {
  title?: string;
  description?: string;
  icon?: string;
  color?: string;
  background?: string;
  width?: number;
  height?: number;
  delay?: number;
}

export const Card: React.FC<CardProps> = ({
  title,
  description,
  icon,
  color = '#60a5fa',
  background = 'rgba(255, 255, 255, 0.05)',
  width = 300,
  height = 200,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  return (
    <div
      style={{
        background,
        borderRadius: 20,
        padding: 30,
        width,
        height,
        border: `2px solid ${color}33`,
        transform: `scale(${progress}) translateY(${(1 - progress) * 30}px)`,
        opacity: progress,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: `0 0 40px ${color}22`,
      }}
    >
      {icon && (
        <div style={{ fontSize: 60, marginBottom: 15 }}>{icon}</div>
      )}
      
      {title && (
        <div
          style={{
            fontSize: 35,
            color,
            fontWeight: 'bold',
            marginBottom: 10,
          }}
        >
          {title}
        </div>
      )}
      
      {description && (
        <div
          style={{
            fontSize: 24,
            color: '#94a3b8',
            textAlign: 'center',
          }}
        >
          {description}
        </div>
      )}
    </div>
  );
};
