// Docker 是什么幻灯片
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { COLORS, BACKGROUND } from '../config';

export const WhatIsDockerSlide: React.FC = () => {
  const frame = useCurrentFrame();

  const features = [
    { title: '容器化', desc: '将应用及其依赖打包成独立单元', icon: '📦' },
    { title: '轻量级', desc: '共享主机内核，秒级启动', icon: '⚡' },
    { title: '可移植', desc: '一次构建，随处运行', icon: '🚀' },
    { title: '隔离性', desc: '进程、网络、文件系统隔离', icon: '🔒' },
  ];

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

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
          fontSize: 64,
          fontWeight: 'bold',
          color: COLORS.text,
          opacity: titleOpacity,
          marginBottom: 40,
        }}
      >
        什么是 Docker？
      </div>

      {/* 主内容 */}
      <div
        style={{
          display: 'flex',
          gap: 60,
          flex: 1,
        }}
      >
        {/* 左侧：概念说明 */}
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: 28,
              color: COLORS.textMuted,
              lineHeight: 1.8,
              opacity: interpolate(frame, [20, 50], [0, 1], { extrapolateRight: 'clamp' }),
            }}
          >
            <p style={{ marginBottom: 20 }}>
              Docker 是一个开源的<strong style={{ color: COLORS.primary }}>容器化平台</strong>，
              让开发者可以轻松打包、分发和运行应用程序。
            </p>
            <p style={{ marginBottom: 20 }}>
              与传统虚拟机不同，Docker 容器直接运行在主机内核上，
              <strong style={{ color: COLORS.success }}>无需完整的操作系统</strong>，
              因此更加轻量高效。
            </p>
          </div>

          {/* 对比图 */}
          <div
            style={{
              display: 'flex',
              gap: 30,
              marginTop: 30,
              opacity: interpolate(frame, [50, 80], [0, 1], { extrapolateRight: 'clamp' }),
            }}
          >
            {/* 虚拟机 */}
            <div style={{ flex: 1, background: 'rgba(248, 113, 113, 0.1)', padding: 20, borderRadius: 16 }}>
              <div style={{ color: COLORS.error, fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>传统虚拟机</div>
              <div style={{ fontSize: 14, color: COLORS.textMuted }}>
                <div style={{ padding: '8px 0' }}>应用 A</div>
                <div style={{ padding: '8px 0' }}>Guest OS</div>
                <div style={{ padding: '8px 0', background: 'rgba(248, 113, 113, 0.3)' }}>Hypervisor</div>
                <div style={{ padding: '8px 0' }}>Host OS</div>
                <div style={{ padding: '8px 0' }}>硬件</div>
              </div>
            </div>

            {/* Docker */}
            <div style={{ flex: 1, background: 'rgba(36, 150, 237, 0.1)', padding: 20, borderRadius: 16 }}>
              <div style={{ color: COLORS.primary, fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Docker</div>
              <div style={{ fontSize: 14, color: COLORS.textMuted }}>
                <div style={{ padding: '8px 0' }}>应用 A | 应用 B | 应用 C</div>
                <div style={{ padding: '8px 0', background: 'rgba(36, 150, 237, 0.3)' }}>Docker Engine</div>
                <div style={{ padding: '8px 0' }}>Host OS</div>
                <div style={{ padding: '8px 0' }}>硬件</div>
              </div>
            </div>
          </div>
        </div>

        {/* 右侧：特性卡片 */}
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {features.map((feature, i) => {
              const cardOpacity = interpolate(
                frame,
                [40 + i * 15, 55 + i * 15],
                [0, 1],
                { extrapolateRight: 'clamp' }
              );
              const cardX = interpolate(
                frame,
                [40 + i * 15, 55 + i * 15],
                [30, 0],
                { extrapolateRight: 'clamp' }
              );

              return (
                <div
                  key={feature.title}
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: `1px solid rgba(36, 150, 237, 0.3)`,
                    borderRadius: 16,
                    padding: 24,
                    opacity: cardOpacity,
                    transform: `translateX(${cardX}px)`,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ fontSize: 40 }}>{feature.icon}</div>
                    <div>
                      <div style={{ color: COLORS.text, fontSize: 24, fontWeight: 'bold' }}>
                        {feature.title}
                      </div>
                      <div style={{ color: COLORS.textMuted, fontSize: 16, marginTop: 4 }}>
                        {feature.desc}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
