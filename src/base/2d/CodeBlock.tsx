// 通用代码块组件
import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';

export interface CodeBlockProps {
  code: string;
  language?: string;
  color?: string;
  background?: string;
  borderColor?: string;
  fontSize?: number;
  showCursor?: boolean;
  typewriter?: boolean;
  typewriterSpeed?: number;
  borderRadius?: number;
  padding?: number;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language,
  color = '#60a5fa',
  background = 'rgba(96, 165, 250, 0.1)',
  borderColor = '#60a5fa',
  fontSize = 35,
  showCursor = true,
  typewriter = true,
  typewriterSpeed = 2,
  borderRadius = 15,
  padding = 25,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 100 },
  });

  const visibleChars = typewriter
    ? Math.min(Math.floor(frame / typewriterSpeed), code.length)
    : code.length;

  const displayCode = code.substring(0, visibleChars);

  return (
    <div
      style={{
        background,
        border: `2px solid ${borderColor}`,
        borderRadius,
        padding,
        transform: `scale(${progress})`,
        opacity: progress,
        boxShadow: `0 0 30px ${borderColor}33`,
        fontFamily: 'monospace',
        fontSize,
        color,
        display: 'inline-block',
        minWidth: 200,
      }}
    >
      {language && (
        <div
          style={{
            fontSize: fontSize * 0.6,
            color: `${color}88`,
            marginBottom: 10,
          }}
        >
          {language}
        </div>
      )}
      <span>
        $ {displayCode}
        {showCursor && visibleChars < code.length && (
          <span style={{ opacity: Math.sin(frame * 0.3) > 0 ? 1 : 0.3 }}>|</span>
        )}
      </span>
    </div>
  );
};
