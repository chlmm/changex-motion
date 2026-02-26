// Docker 与虚拟机对比幻灯片
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from 'remotion';
import { COLORS, BACKGROUND } from '../../config';

interface LayerProps {
  label: string;
  color: string;
  delay: number;
  frame: number;
  width?: number;
}

const Layer: React.FC<LayerProps> = ({ label, color, delay, frame, width = 100 }) => {
  const opacity = interpolate(frame, [delay, delay + 10], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const scale = interpolate(frame, [delay, delay + 10], [0.8, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        background: color,
        padding: '12px 16px',
        borderRadius: 8,
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'center',
        opacity,
        transform: `scale(${scale})`,
        width: `${width}%`,
        marginBottom: 4,
      }}
    >
      {label}
    </div>
  );
};

interface ArchitectureDiagramProps {
  type: 'vm' | 'docker';
  frame: number;
  startFrame: number;
}

const ArchitectureDiagram: React.FC<ArchitectureDiagramProps> = ({ type, frame, startFrame }) => {
  const isVm = type === 'vm';
  const color = isVm ? '#f87171' : COLORS.primary;
  const bgColor = isVm ? 'rgba(248, 113, 113, 0.1)' : 'rgba(36, 150, 237, 0.1)';

  // 容器出现动画
  const containersOpacity = interpolate(frame, [startFrame + 60, startFrame + 80], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        flex: 1,
        background: bgColor,
        borderRadius: 20,
        padding: 30,
        border: `2px solid ${color}40`,
      }}
    >
      {/* 标题 */}
      <div
        style={{
          color,
          fontSize: 28,
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: 30,
        }}
      >
        {isVm ? '传统虚拟机' : 'Docker'}
      </div>

      {/* 架构层 */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
        {isVm ? (
          <>
            {/* 虚拟机架构 - 3个应用各自独立 */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 8, opacity: containersOpacity }}>
              <Layer label="App A" color="#ef4444" delay={startFrame} frame={frame} width={30} />
              <Layer label="App B" color="#f97316" delay={startFrame + 5} frame={frame} width={30} />
              <Layer label="App C" color="#eab308" delay={startFrame + 10} frame={frame} width={30} />
            </div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 8, opacity: containersOpacity }}>
              <Layer label="Guest OS" color="#dc2626" delay={startFrame + 15} frame={frame} width={30} />
              <Layer label="Guest OS" color="#ea580c" delay={startFrame + 20} frame={frame} width={30} />
              <Layer label="Guest OS" color="#ca8a04" delay={startFrame + 25} frame={frame} width={30} />
            </div>
            <Layer label="Hypervisor" color="#7f1d1d" delay={startFrame + 35} frame={frame} />
          </>
        ) : (
          <>
            {/* Docker 架构 - 共享内核 */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 8, opacity: containersOpacity }}>
              <Layer label="App A" color="#4ade80" delay={startFrame} frame={frame} width={30} />
              <Layer label="App B" color="#60a5fa" delay={startFrame + 5} frame={frame} width={30} />
              <Layer label="App C" color="#a78bfa" delay={startFrame + 10} frame={frame} width={30} />
            </div>
            <Layer label="Docker Engine" color="#1d4ed8" delay={startFrame + 20} frame={frame} />
          </>
        )}
        <Layer label="Host OS" color={isVm ? '#450a0a' : '#1e3a5f'} delay={startFrame + 45} frame={frame} />
        <Layer label="硬件 Hardware" color={isVm ? '#1c1917' : '#0f172a'} delay={startFrame + 55} frame={frame} />
      </div>
    </div>
  );
};

interface MetricBarProps {
  label: string;
  vmValue: string;
  dockerValue: string;
  vmPercent: number;
  dockerPercent: number;
  frame: number;
  startFrame: number;
}

const MetricBar: React.FC<MetricBarProps> = ({
  label,
  vmValue,
  dockerValue,
  vmPercent,
  dockerPercent,
  frame,
  startFrame,
}) => {
  const opacity = interpolate(frame, [startFrame, startFrame + 15], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const vmWidth = interpolate(
    frame,
    [startFrame, startFrame + 30],
    [0, vmPercent],
    { extrapolateRight: 'clamp' }
  );
  const dockerWidth = interpolate(
    frame,
    [startFrame, startFrame + 30],
    [0, dockerPercent],
    { extrapolateRight: 'clamp' }
  );

  return (
    <div style={{ opacity, marginBottom: 20 }}>
      <div style={{ color: COLORS.text, fontSize: 18, marginBottom: 8 }}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        {/* VM */}
        <div style={{ width: 100, textAlign: 'right' }}>
          <span style={{ color: '#f87171', fontSize: 16 }}>{vmValue}</span>
        </div>
        <div style={{ flex: 1, height: 24, background: 'rgba(248, 113, 113, 0.2)', borderRadius: 12 }}>
          <div
            style={{
              width: `${vmWidth}%`,
              height: '100%',
              background: '#f87171',
              borderRadius: 12,
            }}
          />
        </div>
        {/* Docker */}
        <div style={{ flex: 1, height: 24, background: 'rgba(36, 150, 237, 0.2)', borderRadius: 12 }}>
          <div
            style={{
              width: `${dockerWidth}%`,
              height: '100%',
              background: COLORS.primary,
              borderRadius: 12,
            }}
          />
        </div>
        <div style={{ width: 100 }}>
          <span style={{ color: COLORS.primary, fontSize: 16 }}>{dockerValue}</span>
        </div>
      </div>
    </div>
  );
};

export const Compare: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = { fps: 30 };

  // 标题动画
  const titleSpring = spring({ frame, fps, config: { damping: 20, stiffness: 100 } });
  const titleOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });

  // 架构图动画
  const diagramOpacity = interpolate(frame, [20, 40], [0, 1], { extrapolateRight: 'clamp' });

  // 对比指标动画
  const metricsStart = 140;

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
        Docker vs 传统虚拟机
      </div>

      {/* 架构对比 */}
      <div
        style={{
          display: 'flex',
          gap: 40,
          marginBottom: 40,
          opacity: diagramOpacity,
        }}
      >
        <ArchitectureDiagram type="vm" frame={frame} startFrame={30} />
        <ArchitectureDiagram type="docker" frame={frame} startFrame={30} />
      </div>

      {/* 对比指标 */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 80,
        }}
      >
        <div style={{ width: 400 }}>
          <MetricBar
            label="启动时间"
            vmValue="分钟级"
            dockerValue="秒级"
            vmPercent={90}
            dockerPercent={15}
            frame={frame}
            startFrame={metricsStart}
          />
          <MetricBar
            label="内存占用"
            vmValue="GB级"
            dockerValue="MB级"
            vmPercent={85}
            dockerPercent={20}
            frame={frame}
            startFrame={metricsStart + 20}
          />
          <MetricBar
            label="磁盘空间"
            vmValue="几十GB"
            dockerValue="几百MB"
            vmPercent={95}
            dockerPercent={25}
            frame={frame}
            startFrame={metricsStart + 40}
          />
        </div>

        {/* 关键差异 */}
        <div
          style={{
            opacity: interpolate(frame, [200, 220], [0, 1], { extrapolateRight: 'clamp' }),
            background: 'rgba(36, 150, 237, 0.1)',
            borderRadius: 16,
            padding: 24,
            border: `1px solid ${COLORS.primary}40`,
            width: 300,
          }}
        >
          <div style={{ color: COLORS.primary, fontSize: 20, fontWeight: 'bold', marginBottom: 16 }}>
            关键差异
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { text: '共享主机内核，无需 Guest OS', icon: '✓' },
              { text: '秒级启动，快速迭代', icon: '⚡' },
              { text: '资源占用少，密度更高', icon: '📦' },
              { text: '交付一致，环境标准化', icon: '🔄' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ color: COLORS.success }}>{item.icon}</span>
                <span style={{ color: COLORS.text, fontSize: 14 }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
