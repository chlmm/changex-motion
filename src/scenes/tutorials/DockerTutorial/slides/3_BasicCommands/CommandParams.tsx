// Docker run 常用参数详解
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from 'remotion';
import { COLORS, BACKGROUND } from '../../config';

interface ParamCardProps {
  param: string;
  fullName: string;
  desc: string;
  example: string;
  color: string;
  frame: number;
  startFrame: number;
}

const ParamCard: React.FC<ParamCardProps> = ({
  param,
  fullName,
  desc,
  example,
  color,
  frame,
  startFrame,
}) => {
  const cardOpacity = interpolate(frame, [startFrame, startFrame + 20], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const cardY = interpolate(frame, [startFrame, startFrame + 20], [30, 0], {
    extrapolateRight: 'clamp',
  });
  const cardScale = interpolate(frame, [startFrame, startFrame + 15], [0.95, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        background: `${color}10`,
        border: `2px solid ${color}50`,
        borderRadius: 16,
        padding: 20,
        opacity: cardOpacity,
        transform: `translateY(${cardY}px) scale(${cardScale})`,
        boxShadow: `0 4px 20px ${color}15`,
      }}
    >
      {/* 参数名 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
        <span
          style={{
            background: color,
            color: '#fff',
            padding: '6px 14px',
            borderRadius: 8,
            fontFamily: 'monospace',
            fontSize: 18,
            fontWeight: 'bold',
          }}
        >
          {param}
        </span>
        <span style={{ color: COLORS.textMuted, fontSize: 14 }}>{fullName}</span>
      </div>

      {/* 描述 */}
      <div style={{ color: COLORS.text, fontSize: 16, marginBottom: 12, lineHeight: 1.5 }}>
        {desc}
      </div>

      {/* 示例 */}
      <div
        style={{
          background: 'rgba(0,0,0,0.3)',
          borderRadius: 8,
          padding: '10px 14px',
          fontFamily: 'monospace',
          fontSize: 14,
          color: COLORS.success,
        }}
      >
        {example}
      </div>
    </div>
  );
};

interface TerminalDemoProps {
  frame: number;
  startFrame: number;
}

const TerminalDemo: React.FC<TerminalDemoProps> = ({ frame, startFrame }) => {
  const opacity = interpolate(frame, [startFrame, startFrame + 20], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // 模拟终端输出
  const lines = [
    { type: 'input', content: 'docker run -d -p 8080:80 --name web nginx' },
    { type: 'output', content: 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6' },
    { type: 'input', content: 'docker ps' },
    { type: 'output', content: 'CONTAINER ID   IMAGE   STATUS    PORTS                  NAMES' },
    { type: 'output', content: 'a1b2c3d4e5f6   nginx   Up 10s   0.0.0.0:8080->80/tcp   web' },
  ];

  const visibleLines = lines.filter((_, index) => {
    const lineStart = startFrame + 30 + index * 15;
    return frame >= lineStart;
  });

  return (
    <div
      style={{
        background: '#1a1a2e',
        borderRadius: 12,
        overflow: 'hidden',
        opacity,
        boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
      }}
    >
      {/* 终端标题栏 */}
      <div
        style={{
          background: '#0f0f1a',
          padding: '10px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f57' }} />
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ffbd2e' }} />
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#28ca42' }} />
        <span style={{ color: COLORS.textMuted, fontSize: 14, marginLeft: 12 }}>Terminal</span>
      </div>

      {/* 终端内容 */}
      <div style={{ padding: 16, fontFamily: 'monospace', fontSize: 14 }}>
        {visibleLines.map((line, index) => (
          <div
            key={index}
            style={{
              color: line.type === 'input' ? COLORS.success : COLORS.textMuted,
              marginBottom: 4,
            }}
          >
            {line.type === 'input' && <span style={{ color: COLORS.primary }}>$ </span>}
            {line.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export const CommandParams: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = { fps: 30 };

  // 标题动画
  const titleSpring = spring({ frame, fps, config: { damping: 20, stiffness: 100 } });
  const titleOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });

  // docker run 参数详解
  const params = [
    {
      param: '-d',
      fullName: '--detach',
      desc: '后台运行容器，返回容器ID',
      example: 'docker run -d nginx',
      color: COLORS.primary,
    },
    {
      param: '-p',
      fullName: '--publish',
      desc: '端口映射：主机端口:容器端口',
      example: 'docker run -p 8080:80 nginx',
      color: COLORS.success,
    },
    {
      param: '-v',
      fullName: '--volume',
      desc: '挂载数据卷：主机路径:容器路径',
      example: 'docker run -v /data:/app nginx',
      color: '#a78bfa',
    },
    {
      param: '-e',
      fullName: '--env',
      desc: '设置环境变量',
      example: 'docker run -e MYSQL_ROOT_PASSWORD=secret mysql',
      color: '#f472b6',
    },
    {
      param: '--name',
      fullName: '--name',
      desc: '指定容器名称',
      example: 'docker run --name myweb nginx',
      color: '#fbbf24',
    },
    {
      param: '--rm',
      fullName: '--rm',
      desc: '容器退出后自动删除',
      example: 'docker run --rm alpine echo hello',
      color: '#60a5fa',
    },
  ];

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
          marginBottom: 35,
          opacity: titleOpacity,
          transform: `scale(${titleSpring})`,
        }}
      >
        docker run 常用参数
      </div>

      {/* 主内容区 */}
      <div style={{ display: 'flex', gap: 40, flex: 1 }}>
        {/* 左侧：参数卡片 */}
        <div style={{ flex: 2 }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 16,
            }}
          >
            {params.map((param, index) => (
              <ParamCard
                key={param.param}
                {...param}
                frame={frame}
                startFrame={20 + index * 20}
              />
            ))}
          </div>
        </div>

        {/* 右侧：终端演示 */}
        <div style={{ flex: 1 }}>
          <TerminalDemo frame={frame} startFrame={140} />
        </div>
      </div>

      {/* 底部组合示例 */}
      <div
        style={{
          position: 'absolute',
          bottom: 40,
          left: '50%',
          transform: 'translateX(-50%)',
          opacity: interpolate(frame, [200, 220], [0, 1], { extrapolateRight: 'clamp' }),
          textAlign: 'center',
        }}
      >
        <div style={{ color: COLORS.textMuted, fontSize: 14, marginBottom: 8 }}>组合使用示例：</div>
        <div
          style={{
            background: 'rgba(36, 150, 237, 0.1)',
            border: `1px solid ${COLORS.primary}40`,
            borderRadius: 10,
            padding: '12px 24px',
            fontFamily: 'monospace',
            fontSize: 16,
            color: COLORS.text,
          }}
        >
          docker run <span style={{ color: COLORS.primary }}>-d</span>{' '}
          <span style={{ color: COLORS.success }}>-p 8080:80</span>{' '}
          <span style={{ color: '#a78bfa' }}>-v /data:/app</span>{' '}
          <span style={{ color: '#fbbf24' }}>--name web</span> nginx
        </div>
      </div>
    </AbsoluteFill>
  );
};
