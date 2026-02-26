// Dockerfile 幻灯片
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from 'remotion';
import { Terminal } from '../components/Terminal';
import { COLORS, BACKGROUND } from '../config';
import { viewDockerfile, buildFromDockerfile, multiStageDockerfile, bestPracticesDockerfile } from '../config/terminal';

export const DockerfileSlide: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = { fps: 30 };

  // 场景配置
  const scenes = [
    { name: 'view', duration: 80, lines: viewDockerfile, title: 'Dockerfile - 基本结构' },
    { name: 'build', duration: 80, lines: buildFromDockerfile, title: 'Dockerfile - 构建镜像' },
    { name: 'multistage', duration: 70, lines: multiStageDockerfile, title: 'Dockerfile - 多阶段构建' },
    { name: 'best', duration: 70, lines: bestPracticesDockerfile, title: 'Dockerfile - 最佳实践' },
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
          title="Dockerfile"
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
              width: 60,
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
