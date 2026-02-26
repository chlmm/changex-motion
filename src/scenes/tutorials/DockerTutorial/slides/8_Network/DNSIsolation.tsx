// DNS 解析与网络隔离
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from 'remotion';
import { Terminal } from '../../components/Terminal';
import { COLORS, BACKGROUND } from '../../config';
import {
  inspectNetwork,
  multiNetworkExample,
} from '../../config/terminal/networkConfig';

import { RemotionTerminalLine } from '../../components/Terminal';

// DNS 解析示例
const dnsResolveExample: RemotionTerminalLine[] = [
  { type: 'input', content: '# 在自定义网络中，容器可通过名称解析', delay: 0 },
  { type: 'input', content: 'docker run -d --name web --network mynet nginx', delay: 10 },
  { type: 'output', content: 'container_id_1', delay: 15 },
  { type: 'input', content: 'docker run -it --name client --network mynet alpine', delay: 20 },
  { type: 'output', content: '/ # ping web', delay: 15 },
  { type: 'output', content: 'PING web (172.18.0.2): 56 data bytes', delay: 10 },
  { type: 'output', content: '64 bytes from 172.18.0.2: seq=0 ttl=64 time=0.1 ms', delay: 5 },
];

export const DNSIsolation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = { fps: 30 };

  // 场景配置
  const scenes = [
    { name: 'dnsIntro', duration: 50, lines: null, title: 'DNS 解析机制' },
    { name: 'dnsExample', duration: 50, lines: dnsResolveExample, title: 'DNS 解析示例' },
    { name: 'isolation', duration: 50, lines: null, title: '网络隔离' },
    { name: 'multiNetwork', duration: 50, lines: multiNetworkExample, title: '多网络架构示例' },
  ];

  // 计算当前场景
  let currentSceneIndex = 0;
  let currentFrameInScene = frame;
  let accumulatedFrame = 0;

  for (let i = 0; i < scenes.length; i++) {
    if (frame < accumulatedFrame + scenes[i].duration) {
      currentSceneIndex = i;
      currentFrameInScene = frame - accumulatedFrame;
      break;
    }
    accumulatedFrame += scenes[i].duration;
    if (i === scenes.length - 1) {
      currentSceneIndex = i;
      currentFrameInScene = frame - accumulatedFrame;
    }
  }

  const currentScene = scenes[currentSceneIndex];

  // 动画
  const titleProgress = spring({ frame: currentFrameInScene, fps, config: { damping: 20, stiffness: 100 } });
  const titleY = interpolate(titleProgress, [0, 1], [-30, 0]);
  const contentOpacity = interpolate(currentFrameInScene, [5, 15], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: BACKGROUND }}>
      {/* 标题区域 */}
      <div
        style={{
          position: 'absolute',
          top: 40,
          left: 60,
          right: 60,
        }}
      >
        <div
          style={{
            fontSize: 42,
            fontWeight: 'bold',
            color: COLORS.primary,
            transform: `translateY(${titleY}px)`,
            opacity: titleProgress,
          }}
        >
          {currentScene.title}
        </div>
      </div>

      {/* DNS 解析概念 */}
      {currentSceneIndex === 0 && (
        <div
          style={{
            position: 'absolute',
            top: 120,
            left: 60,
            right: 60,
            bottom: 80,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: contentOpacity,
          }}
        >
          {/* 图示 */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 40, marginBottom: 40 }}>
            {/* 容器 A */}
            <div
              style={{
                padding: '20px 30px',
                background: 'rgba(66, 153, 225, 0.15)',
                border: `2px solid ${COLORS.primary}`,
                borderRadius: 8,
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: 14, color: COLORS.text }}>web</div>
              <div style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 5 }}>172.18.0.2</div>
            </div>

            {/* 双向箭头 */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ fontSize: 24, color: COLORS.accent }}>⟷</div>
              <div style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 5 }}>DNS 解析</div>
            </div>

            {/* 容器 B */}
            <div
              style={{
                padding: '20px 30px',
                background: 'rgba(72, 187, 120, 0.15)',
                border: `2px solid ${COLORS.accent}`,
                borderRadius: 8,
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: 14, color: COLORS.text }}>client</div>
              <div style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 5 }}>172.18.0.3</div>
            </div>
          </div>

          {/* 说明 */}
          <div
            style={{
              padding: '25px 40px',
              background: 'rgba(255,255,255,0.05)',
              borderRadius: 8,
              maxWidth: 700,
            }}
          >
            <div style={{ fontSize: 18, color: COLORS.primary, fontWeight: 'bold', marginBottom: 15 }}>
              自定义网络中的 DNS 解析
            </div>
            <div style={{ fontSize: 14, color: COLORS.text, lineHeight: 1.8 }}>
              <div style={{ marginBottom: 10 }}>
                <span style={{ color: COLORS.accent }}>✓</span> 在自定义 bridge 网络中，容器可通过名称互相访问
              </div>
              <div style={{ marginBottom: 10 }}>
                <span style={{ color: COLORS.accent }}>✓</span> 默认 bridge 网络不支持 DNS 解析
              </div>
              <div>
                <span style={{ color: COLORS.accent }}>✓</span> 容器重启后 IP 可能变化，DNS 名称保持稳定
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 网络隔离概念 */}
      {currentSceneIndex === 2 && (
        <div
          style={{
            position: 'absolute',
            top: 120,
            left: 60,
            right: 60,
            bottom: 80,
            display: 'flex',
            gap: 50,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: contentOpacity,
          }}
        >
          {/* 网络 A */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div
              style={{
                padding: '15px 25px',
                background: 'rgba(66, 153, 225, 0.1)',
                border: `2px dashed ${COLORS.primary}`,
                borderRadius: 12,
                marginBottom: 15,
              }}
            >
              <div style={{ fontSize: 16, color: COLORS.primary, fontWeight: 'bold' }}>frontend</div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <div style={{ padding: '10px 15px', background: 'rgba(66, 153, 225, 0.15)', borderRadius: 6 }}>
                <div style={{ fontSize: 12, color: COLORS.text }}>web</div>
              </div>
              <div style={{ padding: '10px 15px', background: 'rgba(66, 153, 225, 0.15)', borderRadius: 6 }}>
                <div style={{ fontSize: 12, color: COLORS.text }}>nginx</div>
              </div>
            </div>
          </div>

          {/* 隔离符号 */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontSize: 32, color: COLORS.textMuted }}>⫫</div>
            <div style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 10 }}>网络隔离</div>
          </div>

          {/* 网络 B */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div
              style={{
                padding: '15px 25px',
                background: 'rgba(72, 187, 120, 0.1)',
                border: `2px dashed ${COLORS.accent}`,
                borderRadius: 12,
                marginBottom: 15,
              }}
            >
              <div style={{ fontSize: 16, color: COLORS.accent, fontWeight: 'bold' }}>backend</div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <div style={{ padding: '10px 15px', background: 'rgba(72, 187, 120, 0.15)', borderRadius: 6 }}>
                <div style={{ fontSize: 12, color: COLORS.text }}>api</div>
              </div>
              <div style={{ padding: '10px 15px', background: 'rgba(72, 187, 120, 0.15)', borderRadius: 6 }}>
                <div style={{ fontSize: 12, color: COLORS.text }}>db</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 终端场景 */}
      {currentScene.lines && (
        <div
          style={{
            position: 'absolute',
            top: 120,
            left: 60,
            right: 60,
            bottom: 80,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}
        >
          <Terminal
            title="Docker Network"
            lines={currentScene.lines}
            width={900}
            height={380}
            frameOffset={0}
          />
        </div>
      )}

      {/* 场景指示器 */}
      <div
        style={{
          position: 'absolute',
          bottom: 30,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 8,
        }}
      >
        {scenes.map((scene, i) => (
          <div
            key={scene.name}
            style={{
              width: i === currentSceneIndex ? 40 : 20,
              height: 4,
              background: i === currentSceneIndex ? COLORS.primary : 'rgba(255,255,255,0.2)',
              borderRadius: 2,
            }}
          />
        ))}
      </div>

      {/* 进度标签 */}
      <div
        style={{
          position: 'absolute',
          bottom: 50,
          right: 60,
          fontSize: 14,
          color: COLORS.textMuted,
        }}
      >
        DNS & 网络隔离
      </div>
    </AbsoluteFill>
  );
};
