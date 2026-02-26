// 端口映射详解
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from 'remotion';
import { Terminal } from '../../components/Terminal';
import { COLORS, BACKGROUND } from '../../config';
import {
  runDetached,
} from '../../config/terminal/containerConfig';

// 端口映射示例命令
const portMappingBasic: RemotionTerminalLine[] = [
  { type: 'input', content: '# 单端口映射', delay: 0 },
  { type: 'input', content: 'docker run -d -p 8080:80 --name web nginx', delay: 10 },
  { type: 'output', content: 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6', delay: 15 },
];

const portMappingMultiple: RemotionTerminalLine[] = [
  { type: 'input', content: '# 多端口映射', delay: 0 },
  { type: 'input', content: 'docker run -d -p 8080:80 -p 443:443 --name web nginx', delay: 10 },
  { type: 'output', content: 'b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7', delay: 15 },
];

const portMappingInterface: RemotionTerminalLine[] = [
  { type: 'input', content: '# 指定绑定地址', delay: 0 },
  { type: 'input', content: 'docker run -d -p 127.0.0.1:8080:80 --name web nginx', delay: 10 },
  { type: 'output', content: 'c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8', delay: 15 },
];

const portMappingUDP: RemotionTerminalLine[] = [
  { type: 'input', content: '# UDP 端口映射', delay: 0 },
  { type: 'input', content: 'docker run -d -p 53:53/udp --name dns coredns/coredns', delay: 10 },
  { type: 'output', content: 'd4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9', delay: 15 },
];

import { RemotionTerminalLine } from '../../components/Terminal';

export const PortMapping: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = { fps: 30 };

  // 场景配置
  const scenes = [
    { name: 'concept', duration: 45, lines: null, title: '端口映射概念' },
    { name: 'basic', duration: 30, lines: portMappingBasic, title: '单端口映射' },
    { name: 'multiple', duration: 30, lines: portMappingMultiple, title: '多端口映射' },
    { name: 'interface', duration: 30, lines: portMappingInterface, title: '指定绑定地址' },
    { name: 'udp', duration: 25, lines: portMappingUDP, title: 'UDP 端口映射' },
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

  // 概念场景的动画
  const conceptOpacity = currentSceneIndex === 0 ? interpolate(currentFrameInScene, [5, 15], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) : 0;
  const diagramScale = currentSceneIndex === 0 ? spring({ frame: currentFrameInScene, fps, config: { damping: 15, stiffness: 80 } }) : 0;

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

      {/* 概念场景 - 端口映射示意图 */}
      {currentSceneIndex === 0 && (
        <div
          style={{
            position: 'absolute',
            top: 130,
            left: 60,
            right: 60,
            bottom: 80,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: conceptOpacity,
          }}
        >
          {/* 架构图 */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 40,
              transform: `scale(${diagramScale})`,
            }}
          >
            {/* 宿主机 */}
            <div
              style={{
                padding: '30px 40px',
                background: 'rgba(66, 153, 225, 0.15)',
                border: `2px solid ${COLORS.primary}`,
                borderRadius: 12,
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: 18, fontWeight: 'bold', color: COLORS.primary, marginBottom: 10 }}>宿主机</div>
              <div style={{ fontSize: 32, fontWeight: 'bold', color: COLORS.text }}>8080</div>
              <div style={{ fontSize: 14, color: COLORS.textMuted, marginTop: 5 }}>外部访问端口</div>
            </div>

            {/* 箭头 */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ fontSize: 36, color: COLORS.accent }}>→</div>
              <div style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 5 }}>-p 8080:80</div>
            </div>

            {/* 容器 */}
            <div
              style={{
                padding: '30px 40px',
                background: 'rgba(72, 187, 120, 0.15)',
                border: `2px solid ${COLORS.accent}`,
                borderRadius: 12,
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: 18, fontWeight: 'bold', color: COLORS.accent, marginBottom: 10 }}>容器</div>
              <div style={{ fontSize: 32, fontWeight: 'bold', color: COLORS.text }}>80</div>
              <div style={{ fontSize: 14, color: COLORS.textMuted, marginTop: 5 }}>内部服务端口</div>
            </div>
          </div>

          {/* 说明文字 */}
          <div
            style={{
              marginTop: 50,
              padding: '20px 40px',
              background: 'rgba(255,255,255,0.05)',
              borderRadius: 8,
              maxWidth: 700,
            }}
          >
            <div style={{ fontSize: 18, color: COLORS.text, lineHeight: 1.6 }}>
              <span style={{ color: COLORS.primary, fontWeight: 'bold' }}>-p</span> 参数格式：
              <span style={{ fontFamily: 'monospace', color: COLORS.accent }}> [hostPort]:containerPort</span>
            </div>
            <div style={{ fontSize: 14, color: COLORS.textMuted, marginTop: 10, lineHeight: 1.8 }}>
              • hostPort: 宿主机端口，外部访问入口<br/>
              • containerPort: 容器内部端口，应用监听端口
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
            title="Docker Terminal"
            lines={currentScene.lines}
            width={900}
            height={350}
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
        端口映射
      </div>
    </AbsoluteFill>
  );
};
