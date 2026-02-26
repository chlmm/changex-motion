// Docker 核心概念幻灯片 - 镜像、容器、仓库
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from 'remotion';
import { COLORS, BACKGROUND } from '../../config';

interface ConceptCardProps {
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  frame: number;
  startFrame: number;
  color: string;
}

const ConceptCard: React.FC<ConceptCardProps> = ({
  title,
  subtitle,
  description,
  icon,
  frame,
  startFrame,
  color,
}) => {
  const cardOpacity = interpolate(frame, [startFrame, startFrame + 20], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const cardY = interpolate(frame, [startFrame, startFrame + 20], [40, 0], {
    extrapolateRight: 'clamp',
  });
  const cardScale = interpolate(frame, [startFrame, startFrame + 15], [0.9, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        background: `${color}15`,
        border: `2px solid ${color}60`,
        borderRadius: 24,
        padding: 30,
        opacity: cardOpacity,
        transform: `translateY(${cardY}px) scale(${cardScale})`,
        minWidth: 280,
        boxShadow: `0 10px 40px ${color}20`,
      }}
    >
      {/* 图标 */}
      <div style={{ fontSize: 56, marginBottom: 16, textAlign: 'center' }}>{icon}</div>
      
      {/* 标题 */}
      <div
        style={{
          fontSize: 32,
          fontWeight: 'bold',
          color: color,
          textAlign: 'center',
          marginBottom: 8,
        }}
      >
        {title}
      </div>
      
      {/* 英文 */}
      <div
        style={{
          fontSize: 18,
          color: COLORS.textMuted,
          textAlign: 'center',
          marginBottom: 20,
          fontFamily: 'monospace',
        }}
      >
        {subtitle}
      </div>
      
      {/* 描述 */}
      <div
        style={{
          fontSize: 16,
          color: COLORS.text,
          textAlign: 'center',
          lineHeight: 1.6,
        }}
      >
        {description}
      </div>
    </div>
  );
};

export const CoreConcepts: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = { fps: 30 };

  // 标题动画
  const titleSpring = spring({ frame, fps, config: { damping: 20, stiffness: 100 } });
  const titleOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });

  // 三个核心概念
  const concepts = [
    {
      title: '镜像',
      subtitle: 'Image',
      description: '只读模板，包含运行应用所需的所有内容：代码、运行时、库、配置',
      icon: '📦',
      color: COLORS.primary,
    },
    {
      title: '容器',
      subtitle: 'Container',
      description: '镜像的运行实例，相互隔离的进程，拥有自己的文件系统和网络',
      icon: '🐳',
      color: COLORS.success,
    },
    {
      title: '仓库',
      subtitle: 'Registry',
      description: '存储和分发镜像的地方，如 Docker Hub、私有仓库',
      icon: '🏛️',
      color: '#a78bfa',
    },
  ];

  // 关系箭头动画
  const arrowOpacity = interpolate(frame, [120, 150], [0, 1], { extrapolateRight: 'clamp' });

  // 底部说明动画
  const noteOpacity = interpolate(frame, [160, 180], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        background: BACKGROUND,
        padding: 60,
      }}
    >
      {/* 标题 */}
      <div
        style={{
          fontSize: 56,
          fontWeight: 'bold',
          color: COLORS.text,
          textAlign: 'center',
          marginBottom: 50,
          opacity: titleOpacity,
          transform: `scale(${titleSpring})`,
        }}
      >
        Docker 三大核心概念
      </div>

      {/* 概念卡片 */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 50,
          marginBottom: 40,
        }}
      >
        {concepts.map((concept, i) => (
          <ConceptCard
            key={concept.title}
            {...concept}
            frame={frame}
            startFrame={20 + i * 30}
          />
        ))}
      </div>

      {/* 关系图 */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 20,
          opacity: arrowOpacity,
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: COLORS.primary, fontSize: 20, marginBottom: 8 }}>镜像</div>
          <div style={{ fontSize: 14, color: COLORS.textMuted }}>Blueprint</div>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ color: COLORS.success, fontSize: 24 }}>run</div>
          <div style={{ color: COLORS.textMuted, fontSize: 28 }}>──────────►</div>
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: COLORS.success, fontSize: 20, marginBottom: 8 }}>容器</div>
          <div style={{ fontSize: 14, color: COLORS.textMuted }}>Instance</div>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ color: '#a78bfa', fontSize: 24 }}>pull/push</div>
          <div style={{ color: COLORS.textMuted, fontSize: 28 }}>◄────────►</div>
        </div>
        
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: '#a78bfa', fontSize: 20, marginBottom: 8 }}>仓库</div>
          <div style={{ fontSize: 14, color: COLORS.textMuted }}>Storage</div>
        </div>
      </div>

      {/* 底部比喻 */}
      <div
        style={{
          position: 'absolute',
          bottom: 50,
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(36, 150, 237, 0.1)',
          border: `1px solid ${COLORS.primary}40`,
          borderRadius: 16,
          padding: '20px 40px',
          opacity: noteOpacity,
          textAlign: 'center',
        }}
      >
        <div style={{ color: COLORS.text, fontSize: 18 }}>
          💡 比喻理解：
          <strong style={{ color: COLORS.primary }}>镜像</strong> = 蓝图/模具，
          <strong style={{ color: COLORS.success }}>容器</strong> = 房子/产品，
          <strong style={{ color: '#a78bfa' }}>仓库</strong> = 蓝图库/应用商店
        </div>
      </div>
    </AbsoluteFill>
  );
};
