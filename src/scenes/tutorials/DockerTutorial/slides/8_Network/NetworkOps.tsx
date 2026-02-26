// 网络操作 - 创建、连接、删除
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from 'remotion';
import { Terminal } from '../../components/Terminal';
import { COLORS, BACKGROUND } from '../../config';
import {
  listNetworks,
  createNetwork,
  createSubnetNetwork,
  connectNetwork,
  disconnectNetwork,
  runWithNetwork,
  removeNetwork,
} from '../../config/terminal/networkConfig';

export const NetworkOps: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = { fps: 30 };

  // 场景配置
  const scenes = [
    { name: 'list', duration: 35, lines: listNetworks, title: '列出网络', subtitle: 'docker network ls' },
    { name: 'create', duration: 30, lines: createNetwork, title: '创建网络', subtitle: 'docker network create' },
    { name: 'createSubnet', duration: 35, lines: createSubnetNetwork, title: '创建指定子网', subtitle: '--subnet' },
    { name: 'run', duration: 35, lines: runWithNetwork, title: '运行容器并指定网络', subtitle: '--network' },
    { name: 'connect', duration: 30, lines: connectNetwork, title: '连接容器到网络', subtitle: 'docker network connect' },
    { name: 'disconnect', duration: 25, lines: disconnectNetwork, title: '断开网络连接', subtitle: 'docker network disconnect' },
    { name: 'remove', duration: 25, lines: removeNetwork, title: '删除网络', subtitle: 'docker network rm' },
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
        <div
          style={{
            fontSize: 20,
            color: COLORS.textMuted,
            marginTop: 8,
            fontFamily: 'monospace',
            opacity: titleProgress,
          }}
        >
          {currentScene.subtitle}
        </div>
      </div>

      {/* 终端区域 */}
      <div
        style={{
          position: 'absolute',
          top: 140,
          left: 60,
          right: 60,
          bottom: 80,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          opacity: contentOpacity,
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
        网络操作
      </div>
    </AbsoluteFill>
  );
};
