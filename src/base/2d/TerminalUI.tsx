// 终端 UI 组件（纯 React，无动画逻辑）
// 只负责渲染，不关心数据来源
import React from 'react';

export interface TerminalLine {
  type: 'input' | 'output' | 'error';
  content: string;
}

export interface VisibleLine extends TerminalLine {
  visibleText: string;
  showCursor: boolean;
}

export interface TerminalUIProps {
  title?: string;
  visibleLines: VisibleLine[];
  width?: number;
  height?: number;
  promptSymbol?: string;
  theme?: 'dark' | 'light';
  // 入场动画状态（由外部计算）
  windowScale?: number;
  windowOpacity?: number;
}

export const TerminalUI: React.FC<TerminalUIProps> = ({
  title = 'Terminal',
  visibleLines,
  width = 900,
  height = 500,
  promptSymbol = '$',
  theme = 'dark',
  windowScale = 1,
  windowOpacity = 1,
}) => {
  const isDark = theme === 'dark';
  const bgColor = isDark ? '#1e1e1e' : '#ffffff';
  const textColor = isDark ? '#d4d4d4' : '#1e1e1e';
  const promptColor = isDark ? '#4ade80' : '#22c55e';
  const errorColor = '#f87171';
  const outputColor = isDark ? '#94a3b8' : '#64748b';

  return (
    <div
      style={{
        width,
        height,
        background: bgColor,
        borderRadius: 12,
        overflow: 'hidden',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        transform: `scale(${windowScale})`,
        opacity: windowOpacity,
        fontFamily: 'monospace',
        fontSize: 30,
        lineHeight: 1.4,
      }}
    >
      {/* 标题栏 */}
      <div
        style={{
          background: isDark ? '#2d2d2d' : '#f3f4f6',
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          borderBottom: `1px solid ${isDark ? '#404040' : '#e5e7eb'}`,
        }}
      >
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f57' }} />
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ffbd2e' }} />
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#28ca41' }} />
        
        <div
          style={{
            flex: 1,
            textAlign: 'center',
            color: isDark ? '#9ca3af' : '#6b7280',
            fontSize: 14,
          }}
        >
          {title}
        </div>
      </div>

      {/* 终端内容 */}
      <div
        style={{
          padding: '16px 20px',
          height: height - 50,
          overflow: 'hidden',
          color: textColor,
        }}
      >
        {visibleLines.map((line, index) => (
          <div key={index} style={{ marginBottom: 4 }}>
            {line.type === 'input' ? (
              <span>
                <span style={{ color: promptColor }}>{promptSymbol} </span>
                <span>{line.visibleText}</span>
                {line.showCursor && (
                  <span
                    style={{
                      display: 'inline-block',
                      width: 16,
                      height: 30,
                      background: textColor,
                      marginLeft: 2,
                      animation: 'blink 1s infinite',
                    }}
                  />
                )}
              </span>
            ) : (
              <span style={{ color: line.type === 'error' ? errorColor : outputColor }}>
                {line.visibleText}
              </span>
            )}
          </div>
        ))}
      </div>

      <style>
        {`
          @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
          }
        `}
      </style>
    </div>
  );
};
