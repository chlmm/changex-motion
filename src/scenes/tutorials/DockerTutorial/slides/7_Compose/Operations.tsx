// 服务操作命令
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from 'remotion';
import { Terminal } from '../../components/Terminal';
import { COLORS, BACKGROUND } from '../../config';
import {
  composeUp,
  composePs,
  composeLogs,
  composeDown,
  composeExec,
  composeRestart,
} from '../../config/terminal/composeConfig';

export const Operations: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = { fps: 30 };

  // 场景配置
  const scenes = [
    { name: 'up', duration: 35, lines: composeUp, title: '启动服务', subtitle: 'docker compose up' },
    { name: 'ps', duration: 30, lines: composePs, title: '查看状态', subtitle: 'docker compose ps' },
    { name: 'logs', duration: 30, lines: composeLogs, title: '查看日志', subtitle: 'docker compose logs' },
    { name: 'exec', duration: 35, lines: composeExec, title: '执行命令', subtitle: 'docker compose exec' },
    { name: 'restart', duration: 25, lines: composeRestart, title: '重启服务', subtitle: 'docker compose restart' },
    { name: 'down', duration: 25, lines: composeDown, title: '停止服务', subtitle: 'docker compose down' },
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
          title="Docker Compose"
          lines={currentScene.lines}
          width={900}
          height={400}
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
        服务操作
      </div>
    </AbsoluteFill>
  );
};
