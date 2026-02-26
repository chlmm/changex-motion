// 基础命令幻灯片
import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { COLORS, BACKGROUND } from '../config';

const commands = [
  { cmd: 'git init', desc: '初始化仓库' },
  { cmd: 'git clone <url>', desc: '克隆远程仓库' },
  { cmd: 'git status', desc: '查看状态' },
  { cmd: 'git add .', desc: '添加到暂存区' },
  { cmd: 'git commit -m "msg"', desc: '提交更改' },
  { cmd: 'git log --oneline', desc: '查看历史' },
  { cmd: 'git diff', desc: '查看差异' },
  { cmd: 'git rm <file>', desc: '删除文件' },
];

// 渲染单个命令项
const CommandItem = ({
  command,
  index,
  currentCommand,
  commandProgress,
  isAllComplete,
}: {
  command: typeof commands[0];
  index: number;
  currentCommand: number;
  commandProgress: number;
  isAllComplete: boolean;
}) => {
  const isActive = index === currentCommand && !isAllComplete;
  const isPlayed = index <= currentCommand || isAllComplete;
  const color = '#60a5fa'; // 统一类蓝色
  const scale = isActive ? 1.05 : 1;
  const opacity = isPlayed ? 1 : 0.3;

  const typewriterChars = isActive
    ? Math.floor(commandProgress * command.cmd.length)
    : command.cmd.length;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 20,
        transform: `scale(${scale})`,
        opacity,
      }}
    >
      {/* 命令框 */}
      <div
        style={{
          background: isPlayed ? `${color}22` : 'rgba(255,255,255,0.05)',
          border: `2px solid ${isPlayed ? color : 'rgba(255,255,255,0.2)'}`,
          borderRadius: 12,
          padding: '15px 25px',
          minWidth: 320,
          boxShadow: isPlayed ? `0 0 20px ${color}44` : 'none',
        }}
      >
        <span
          style={{
            fontFamily: 'monospace',
            fontSize: 28,
            color: isPlayed ? COLORS.text : COLORS.textMuted,
          }}
        >
          $ {command.cmd.substring(0, typewriterChars)}
          {isActive && typewriterChars < command.cmd.length && (
            <span style={{ animation: 'blink 1s infinite' }}>|</span>
          )}
        </span>
      </div>

      {/* 描述 */}
      <div
        style={{
          fontSize: 24,
          color: isPlayed ? COLORS.text : COLORS.textMuted,
        }}
      >
        {command.desc}
      </div>
    </div>
  );
};

export const BasicCommandsSlide: React.FC = () => {
  const frame = useCurrentFrame();

  // 8个命令 × 18帧 + 36帧停滞 = 180帧
  const framesPerCommand = 18;
  const totalCommandFrames = commands.length * framesPerCommand;

  // 当前播放的命令索引（播放完成后保持在最后一个）
  const currentCommand = Math.min(
    Math.floor(frame / framesPerCommand),
    commands.length - 1
  );
  const commandProgress = (frame % framesPerCommand) / framesPerCommand;

  // 是否全部播放完成（进入停滞阶段）
  const isAllComplete = frame >= totalCommandFrames;

  // 两列
  const leftCommands = commands.slice(0, 4);
  const rightCommands = commands.slice(4);

  return (
    <AbsoluteFill
      style={{
        background: BACKGROUND,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      {/* 标题 */}
      <div
        style={{
          fontSize: 64,
          color: COLORS.primary,
          fontWeight: 'bold',
          marginBottom: 50,
          opacity: interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' }),
        }}
      >
        基础命令
      </div>

      {/* 两列命令列表 */}
      <div style={{ display: 'flex', gap: 60 }}>
        {/* 左列 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {leftCommands.map((command, index) => (
            <CommandItem
              key={index}
              command={command}
              index={index}
              currentCommand={currentCommand}
              commandProgress={commandProgress}
              isAllComplete={isAllComplete}
            />
          ))}
        </div>

        {/* 右列 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {rightCommands.map((command, index) => (
            <CommandItem
              key={index + 4}
              command={command}
              index={index + 4}
              currentCommand={currentCommand}
              commandProgress={commandProgress}
              isAllComplete={isAllComplete}
            />
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
