// Docker 基础命令概览 - 分类展示
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from 'remotion';
import { COLORS, BACKGROUND } from '../../config';

interface CommandItemProps {
  cmd: string;
  desc: string;
  isActive: boolean;
  isPlayed: boolean;
  progress: number;
}

const CommandItem: React.FC<CommandItemProps> = ({ cmd, desc, isActive, isPlayed, progress }) => {
  const typewriterChars = isActive
    ? Math.floor(progress * cmd.length)
    : cmd.length;

  const scale = isActive ? 1.05 : 1;
  const opacity = isPlayed ? 1 : 0.3;
  const highlightColor = isPlayed ? COLORS.primary : 'rgba(255,255,255,0.2)';

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        transform: `scale(${scale})`,
        opacity,
        transition: 'transform 0.2s ease',
      }}
    >
      {/* 命令框 */}
      <div
        style={{
          background: isPlayed ? `${highlightColor}15` : 'rgba(255,255,255,0.03)',
          border: `2px solid ${highlightColor}`,
          borderRadius: 10,
          padding: '12px 20px',
          minWidth: 280,
          boxShadow: isPlayed ? `0 0 15px ${highlightColor}30` : 'none',
        }}
      >
        <span
          style={{
            fontFamily: 'monospace',
            fontSize: 22,
            color: isPlayed ? COLORS.text : COLORS.textMuted,
          }}
        >
          $ {cmd.substring(0, typewriterChars)}
          {isActive && typewriterChars < cmd.length && (
            <span style={{ opacity: Math.sin(Date.now() / 200) > 0 ? 1 : 0 }}>|</span>
          )}
        </span>
      </div>

      {/* 描述 */}
      <div
        style={{
          fontSize: 18,
          color: isPlayed ? COLORS.text : COLORS.textMuted,
        }}
      >
        {desc}
      </div>
    </div>
  );
};

interface CategorySectionProps {
  title: string;
  icon: string;
  color: string;
  commands: { cmd: string; desc: string }[];
  startFrame: number;
  frame: number;
  framesPerCommand: number;
}

const CategorySection: React.FC<CategorySectionProps> = ({
  title,
  icon,
  color,
  commands,
  startFrame,
  frame,
  framesPerCommand,
}) => {
  const titleOpacity = interpolate(frame, [startFrame, startFrame + 15], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        background: `${color}08`,
        border: `1px solid ${color}30`,
        borderRadius: 20,
        padding: 25,
      }}
    >
      {/* 分类标题 */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          marginBottom: 20,
          opacity: titleOpacity,
        }}
      >
        <span style={{ fontSize: 28 }}>{icon}</span>
        <span style={{ color, fontSize: 24, fontWeight: 'bold' }}>{title}</span>
      </div>

      {/* 命令列表 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {commands.map((command, index) => {
          const commandStartFrame = startFrame + 20 + index * framesPerCommand;
          const isActive = frame >= commandStartFrame && frame < commandStartFrame + framesPerCommand;
          const isPlayed = frame >= commandStartFrame;
          const progress = isActive
            ? (frame - commandStartFrame) / framesPerCommand
            : isPlayed ? 1 : 0;

          return (
            <CommandItem
              key={command.cmd}
              cmd={command.cmd}
              desc={command.desc}
              isActive={isActive}
              isPlayed={isPlayed}
              progress={progress}
            />
          );
        })}
      </div>
    </div>
  );
};

export const Overview: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = { fps: 30 };

  // 标题动画
  const titleSpring = spring({ frame, fps, config: { damping: 20, stiffness: 100 } });
  const titleOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });

  // 命令分类
  const categories = [
    {
      title: '镜像命令',
      icon: '📦',
      color: COLORS.primary,
      commands: [
        { cmd: 'docker images', desc: '列出本地镜像' },
        { cmd: 'docker pull nginx', desc: '拉取镜像' },
        { cmd: 'docker rmi nginx', desc: '删除镜像' },
      ],
    },
    {
      title: '容器命令',
      icon: '🐳',
      color: COLORS.success,
      commands: [
        { cmd: 'docker ps', desc: '列出运行中的容器' },
        { cmd: 'docker run nginx', desc: '运行容器' },
        { cmd: 'docker stop <id>', desc: '停止容器' },
      ],
    },
    {
      title: '系统命令',
      icon: '⚙️',
      color: '#a78bfa',
      commands: [
        { cmd: 'docker --version', desc: '查看版本' },
        { cmd: 'docker info', desc: '查看系统信息' },
        { cmd: 'docker system df', desc: '查看磁盘使用' },
      ],
    },
  ];

  // 每个命令的帧数
  const framesPerCommand = 20;
  // 每个分类的起始帧（错开展示）
  const categoryDelays = [0, 30, 60];

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
          fontSize: 52,
          fontWeight: 'bold',
          color: COLORS.text,
          textAlign: 'center',
          marginBottom: 40,
          opacity: titleOpacity,
          transform: `scale(${titleSpring})`,
        }}
      >
        Docker 基础命令概览
      </div>

      {/* 分类展示 */}
      <div
        style={{
          display: 'flex',
          gap: 30,
          justifyContent: 'center',
          flex: 1,
        }}
      >
        {categories.map((category, index) => (
          <CategorySection
            key={category.title}
            {...category}
            startFrame={categoryDelays[index]}
            frame={frame}
            framesPerCommand={framesPerCommand}
          />
        ))}
      </div>

      {/* 底部提示 */}
      <div
        style={{
          position: 'absolute',
          bottom: 40,
          left: '50%',
          transform: 'translateX(-50%)',
          opacity: interpolate(frame, [150, 170], [0, 1], { extrapolateRight: 'clamp' }),
          background: 'rgba(36, 150, 237, 0.1)',
          border: `1px solid ${COLORS.primary}40`,
          borderRadius: 12,
          padding: '12px 24px',
        }}
      >
        <span style={{ color: COLORS.textMuted, fontSize: 16 }}>
          💡 接下来我们将详细讲解 <strong style={{ color: COLORS.success }}>docker run</strong> 的常用参数
        </span>
      </div>
    </AbsoluteFill>
  );
};
