// Docker Compose 幻灯片
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from 'remotion';
import { Terminal } from '../components/Terminal';
import { COLORS, BACKGROUND } from '../config';
import { viewComposeFile, composeUp, composePs, composeLogs, composeDown } from '../config/terminal';

export const ComposeSlide: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = { fps: 30 };

  // 场景配置
  const scenes = [
    { name: 'view', duration: 80, lines: viewComposeFile, title: 'Docker Compose - 配置文件' },
    { name: 'up', duration: 60, lines: composeUp, title: 'Docker Compose - 启动服务' },
    { name: 'ps', duration: 50, lines: composePs, title: 'Docker Compose - 查看状态' },
    { name: 'logs', duration: 50, lines: composeLogs, title: 'Docker Compose - 查看日志' },
    { name: 'down', duration: 60, lines: composeDown, title: 'Docker Compose - 停止服务' },
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

  // 标题动画
  const titleProgress = spring({ frame: currentFrameInScene, fps, config: { damping: 20, stiffness: 100 } });
  const titleScale = interpolate(titleProgress, [0, 1], [0.9, 1]);

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
          color: COLORS.primary,
          marginBottom: 30,
          transform: `scale(${titleScale})`,
          opacity: titleProgress,
        }}
      >
        {currentScene.title}
      </div>

      {/* 终端 */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Terminal
          title="Docker Compose"
          lines={currentScene.lines}
          width={1000}
          height={450}
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
          gap: 10,
        }}
      >
        {scenes.map((scene, i) => (
          <div
            key={scene.name}
            style={{
              width: 50,
              height: 4,
              background: i === currentSceneIndex ? COLORS.primary : 'rgba(255,255,255,0.2)',
              borderRadius: 2,
            }}
          />
        ))}
      </div>
    </AbsoluteFill>
  );
};
