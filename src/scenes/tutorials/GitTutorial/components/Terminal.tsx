// Terminal Remotion 组件
// 包含完整的动画逻辑，专为视频生成设计
import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { 
  TerminalUI, 
  TerminalLine, 
  VisibleLine 
} from '../../../../base/2d/TerminalUI';

// 带延迟的终端行（Remotion 专用）
export interface RemotionTerminalLine extends TerminalLine {
  delay?: number;  // 延迟帧数
}

export interface RemotionTerminalProps {
  title?: string;
  lines: RemotionTerminalLine[];
  width?: number;
  height?: number;
  typingSpeed?: number;  // 每字符帧数
  promptSymbol?: string;
  theme?: 'dark' | 'light';
  animateEntry?: boolean;  // 是否启用入场动画
  // Remotion 扩展参数
  frameOffset?: number;    // 帧偏移
  speed?: number;          // 动画速度倍数
}

// 弹簧动画配置
const SPRING_CONFIG = { damping: 20, stiffness: 100, mass: 1 };

export const Terminal: React.FC<RemotionTerminalProps> = ({
  title = 'Terminal',
  lines,
  width = 900,
  height = 500,
  typingSpeed = 2,
  promptSymbol = '$',
  theme = 'dark',
  animateEntry = true,
  frameOffset = 0,
  speed = 1,
}) => {
  const rawFrame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  // 计算有效帧：先偏移，再乘以速度
  const frame = (rawFrame + frameOffset) * speed;
  
  // 计算每行的显示状态
  const getLineDisplay = (
    line: RemotionTerminalLine, 
    lineIndex: number
  ): { visibleText: string; showCursor: boolean } => {
    const previousLines = lines.slice(0, lineIndex);
    const previousChars = previousLines.reduce((sum, l) => {
      const delay = l.delay || 0;
      const lineLength = l.type === 'input' 
        ? l.content.length + promptSymbol.length + 2 
        : l.content.length;
      return sum + lineLength * typingSpeed + delay;
    }, 0);

    const lineDelay = line.delay || 0;
    const startFrame = previousChars + lineDelay;
    const currentFrameInLine = frame - startFrame;

    if (line.type === 'input') {
      const totalChars = line.content.length;
      const visibleChars = Math.max(0, Math.min(
        Math.floor(currentFrameInLine / typingSpeed),
        totalChars
      ));
      const isComplete = visibleChars >= totalChars;
      
      return {
        visibleText: line.content.substring(0, visibleChars),
        showCursor: !isComplete || (isComplete && Math.floor(frame / 15) % 2 === 0),
      };
    } else {
      const isVisible = currentFrameInLine >= 0;
      return {
        visibleText: isVisible ? line.content : '',
        showCursor: false,
      };
    }
  };

  // 计算可见行
  const visibleLines: VisibleLine[] = [];
  let totalFrame = 0;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const delay = line.delay || 0;
    const lineLength = line.type === 'input' 
      ? line.content.length * typingSpeed + delay 
      : delay + 1;
    
    if (frame >= totalFrame) {
      const display = getLineDisplay(line, i);
      visibleLines.push({
        type: line.type,
        content: line.content,
        visibleText: display.visibleText,
        showCursor: display.showCursor,
      });
    }
    totalFrame += lineLength;
  }

  // 窗口入场动画
  const springProgress = animateEntry
    ? spring({ frame, fps, config: SPRING_CONFIG })
    : 1;
  const windowScale = animateEntry
    ? interpolate(springProgress, [0, 1], [0.9, 1])
    : 1;
  const windowOpacity = animateEntry ? springProgress : 1;

  return (
    <TerminalUI
      title={title}
      visibleLines={visibleLines}
      width={width}
      height={height}
      promptSymbol={promptSymbol}
      theme={theme}
      windowScale={windowScale}
      windowOpacity={windowOpacity}
    />
  );
};

// 重导出类型（不带 delay 的版本，用于配置文件）
export type { TerminalLine } from '../../../../base/2d/TerminalUI';
