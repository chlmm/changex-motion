// 数据卷操作 - 创建、查看、删除
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from 'remotion';
import { Terminal } from '../../components/Terminal';
import { COLORS, BACKGROUND } from '../../config';
import {
  listVolumes,
  createVolume,
  inspectVolume,
  mountVolume,
  mountVolumeExplicit,
  readOnlyMount,
  removeVolume,
  pruneVolumes,
} from '../../config/terminal/volumeConfig';

export const VolumeOps: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = { fps: 30 };

  // 场景配置
  const scenes = [
    { name: 'list', duration: 25, lines: listVolumes, title: '列出数据卷', subtitle: 'docker volume ls' },
    { name: 'create', duration: 25, lines: createVolume, title: '创建数据卷', subtitle: 'docker volume create' },
    { name: 'inspect', duration: 30, lines: inspectVolume, title: '查看数据卷详情', subtitle: 'docker volume inspect' },
    { name: 'mount', duration: 30, lines: mountVolume, title: '挂载数据卷', subtitle: '-v volume:/path' },
    { name: 'mountExplicit', duration: 30, lines: mountVolumeExplicit, title: '显式挂载（推荐）', subtitle: '--mount' },
    { name: 'readonly', duration: 25, lines: readOnlyMount, title: '只读挂载', subtitle: ':ro' },
    { name: 'remove', duration: 25, lines: removeVolume, title: '删除数据卷', subtitle: 'docker volume rm' },
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
          title="Docker Volume"
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
        数据卷操作
      </div>
    </AbsoluteFill>
  );
};
