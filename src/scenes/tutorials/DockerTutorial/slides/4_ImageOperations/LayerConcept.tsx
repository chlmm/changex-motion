// Docker 镜像分层概念
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from 'remotion';
import { COLORS, BACKGROUND } from '../../config';

interface LayerProps {
  name: string;
  size: string;
  color: string;
  frame: number;
  startFrame: number;
  delay: number;
}

const Layer: React.FC<LayerProps> = ({ name, size, color, frame, startFrame, delay }) => {
  const opacity = interpolate(frame, [startFrame + delay, startFrame + delay + 15], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const translateY = interpolate(frame, [startFrame + delay, startFrame + delay + 15], [-20, 0], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        background: `${color}20`,
        border: `2px solid ${color}`,
        borderRadius: 8,
        padding: '10px 16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      <span style={{ color: COLORS.text, fontSize: 16 }}>{name}</span>
      <span style={{ color: COLORS.textMuted, fontSize: 14 }}>{size}</span>
    </div>
  );
};

interface ImageStackProps {
  title: string;
  layers: { name: string; size: string; color: string }[];
  frame: number;
  startFrame: number;
  color: string;
}

const ImageStack: React.FC<ImageStackProps> = ({ title, layers, frame, startFrame, color }) => {
  const titleOpacity = interpolate(frame, [startFrame, startFrame + 15], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        background: `${color}08`,
        border: `1px solid ${color}30`,
        borderRadius: 16,
        padding: 20,
      }}
    >
      <div
        style={{
          color,
          fontSize: 18,
          fontWeight: 'bold',
          marginBottom: 16,
          opacity: titleOpacity,
        }}
      >
        {title}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {layers.map((layer, index) => (
          <Layer
            key={layer.name}
            {...layer}
            frame={frame}
            startFrame={startFrame + 20}
            delay={index * 12}
          />
        ))}
      </div>
    </div>
  );
};

export const LayerConcept: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = { fps: 30 };

  // 标题动画
  const titleSpring = spring({ frame, fps, config: { damping: 20, stiffness: 100 } });
  const titleOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });

  // 两个镜像的分层
  const imageA = {
    title: 'nginx:latest',
    color: COLORS.primary,
    layers: [
      { name: '基础层 (Debian)', size: '120MB', color: '#1e40af' },
      { name: '运行时层', size: '15MB', color: '#3b82f6' },
      { name: 'Nginx 核心', size: '5MB', color: '#60a5fa' },
      { name: '配置文件', size: '1MB', color: '#93c5fd' },
    ],
  };

  const imageB = {
    title: 'nginx:alpine',
    color: COLORS.success,
    layers: [
      { name: '基础层 (Alpine)', size: '5MB', color: '#166534' },
      { name: '运行时层', size: '15MB', color: '#22c55e' },
      { name: 'Nginx 核心', size: '5MB', color: '#4ade80' },
      { name: '配置文件', size: '1MB', color: '#86efac' },
    ],
  };

  // 共享层说明动画
  const shareOpacity = interpolate(frame, [120, 140], [0, 1], { extrapolateRight: 'clamp' });

  // 优势说明动画
  const benefitsOpacity = interpolate(frame, [160, 180], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        background: BACKGROUND,
        padding: 50,
      }}
    >
      {/* 标题 */}
      <div
        style={{
          fontSize: 48,
          fontWeight: 'bold',
          color: COLORS.text,
          textAlign: 'center',
          marginBottom: 30,
          opacity: titleOpacity,
          transform: `scale(${titleSpring})`,
        }}
      >
        镜像分层原理
      </div>

      {/* 说明文字 */}
      <div
        style={{
          textAlign: 'center',
          color: COLORS.textMuted,
          fontSize: 20,
          marginBottom: 30,
          opacity: interpolate(frame, [15, 35], [0, 1], { extrapolateRight: 'clamp' }),
        }}
      >
        Docker 镜像由多个只读层堆叠而成，每层代表 Dockerfile 中的一个指令
      </div>

      {/* 两个镜像对比 */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 60,
          marginBottom: 30,
        }}
      >
        <ImageStack
          {...imageA}
          frame={frame}
          startFrame={40}
        />
        <ImageStack
          {...imageB}
          frame={frame}
          startFrame={40}
        />
      </div>

      {/* 共享层说明 */}
      <div
        style={{
          textAlign: 'center',
          opacity: shareOpacity,
          marginBottom: 20,
        }}
      >
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 12,
            background: 'rgba(36, 150, 237, 0.1)',
            border: `1px solid ${COLORS.primary}40`,
            borderRadius: 12,
            padding: '12px 24px',
          }}
        >
          <span style={{ fontSize: 24 }}>💡</span>
          <span style={{ color: COLORS.text, fontSize: 18 }}>
            相同的层在本地只存储一份，实现<strong style={{ color: COLORS.success }}>存储共享</strong>
          </span>
        </div>
      </div>

      {/* 优势说明 */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 30,
          opacity: benefitsOpacity,
        }}
      >
        {[
          { icon: '🚀', title: '快速分发', desc: '只传输差异层' },
          { icon: '💾', title: '节省空间', desc: '共享基础层' },
          { icon: '⚡', title: '高效构建', desc: '利用缓存层' },
        ].map((benefit, i) => (
          <div
            key={benefit.title}
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 12,
              padding: '16px 24px',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: 28, marginBottom: 8 }}>{benefit.icon}</div>
            <div style={{ color: COLORS.text, fontSize: 16, fontWeight: 'bold' }}>{benefit.title}</div>
            <div style={{ color: COLORS.textMuted, fontSize: 14 }}>{benefit.desc}</div>
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
