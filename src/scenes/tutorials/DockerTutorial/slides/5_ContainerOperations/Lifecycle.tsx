// 容器生命周期 - 运行、停止、启动、删除
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from 'remotion';
import { Terminal } from '../../components/Terminal';
import { COLORS, BACKGROUND } from '../../config';
import {
  runDetached,
  listContainers,
  listAllContainers,
  stopContainer,
  startContainer,
  restartContainer,
  removeContainer,
  forceRemoveContainer,
} from '../../config/terminal/containerConfig';

export const Lifecycle: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = { fps: 30 };

  // 场景配置
  const scenes = [
    { name: 'run', duration: 35, lines: runDetached, title: '创建并运行容器', subtitle: 'docker run -d --name webserver -p 8080:80 nginx' },
    { name: 'list', duration: 25, lines: listContainers, title: '列出运行中的容器', subtitle: 'docker ps' },
    { name: 'listAll', duration: 25, lines: listAllContainers, title: '列出所有容器', subtitle: 'docker ps -a' },
    { name: 'stop', duration: 20, lines: stopContainer, title: '停止容器', subtitle: 'docker stop webserver' },
    { name: 'start', duration: 20, lines: startContainer, title: '启动容器', subtitle: 'docker start webserver' },
    { name: 'remove', duration: 20, lines: removeContainer, title: '删除容器', subtitle: 'docker rm webserver' },
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
          title="Docker Terminal"
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
              transition: 'all 0.3s ease',
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
        容器生命周期
      </div>
    </AbsoluteFill>
  );
};
