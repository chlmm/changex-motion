// Docker 镜像拉取与推送操作
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from 'remotion';
import { Terminal } from '../../components/Terminal';
import { COLORS, BACKGROUND } from '../../config';
import { pullImage, pushImage, listImages } from '../../config/terminal';

export const PullPush: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = { fps: 30 };

  // 场景配置
  const scenes = [
    { name: 'pull', duration: 80, lines: pullImage, title: '拉取镜像', subtitle: '从仓库下载镜像到本地' },
    { name: 'list', duration: 60, lines: listImages, title: '查看镜像', subtitle: '列出本地所有镜像' },
    { name: 'push', duration: 80, lines: pushImage, title: '推送镜像', subtitle: '上传镜像到仓库' },
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
      {/* 标题区 */}
      <div style={{ marginBottom: 20 }}>
        <div
          style={{
            fontSize: 42,
            fontWeight: 'bold',
            color: COLORS.text,
            transform: `scale(${titleScale})`,
            opacity: titleProgress,
          }}
        >
          {currentScene.title}
        </div>
        <div
          style={{
            fontSize: 18,
            color: COLORS.textMuted,
            opacity: interpolate(currentFrameInScene, [10, 25], [0, 1], { extrapolateRight: 'clamp' }),
          }}
        >
          {currentScene.subtitle}
        </div>
      </div>

      {/* 主内容区 */}
      <div style={{ display: 'flex', gap: 40, flex: 1 }}>
        {/* 终端 */}
        <div style={{ flex: 2 }}>
          <Terminal
            title="Docker Terminal"
            lines={currentScene.lines}
            width={700}
            height={400}
            frameOffset={0}
          />
        </div>

        {/* 右侧说明 */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {currentScene.name === 'pull' && (
            <>
              <InfoCard
                title="镜像标签"
                content="nginx:latest、nginx:alpine、nginx:1.25"
                frame={currentFrameInScene}
                startFrame={20}
              />
              <InfoCard
                title="常用仓库"
                content="Docker Hub、阿里云、私有仓库"
                frame={currentFrameInScene}
                startFrame={35}
              />
            </>
          )}
          {currentScene.name === 'list' && (
            <>
              <InfoCard
                title="镜像信息"
                content="REPOSITORY、TAG、IMAGE ID、CREATED、SIZE"
                frame={currentFrameInScene}
                startFrame={20}
              />
              <InfoCard
                title="过滤镜像"
                content="docker images --filter 'dangling=true'"
                frame={currentFrameInScene}
                startFrame={35}
              />
            </>
          )}
          {currentScene.name === 'push' && (
            <>
              <InfoCard
                title="镜像标签"
                content="docker tag myapp:latest user/myapp:v1.0"
                frame={currentFrameInScene}
                startFrame={20}
              />
              <InfoCard
                title="认证登录"
                content="docker login docker.io"
                frame={currentFrameInScene}
                startFrame={35}
              />
            </>
          )}
        </div>
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

// 信息卡片组件
interface InfoCardProps {
  title: string;
  content: string;
  frame: number;
  startFrame: number;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, content, frame, startFrame }) => {
  const opacity = interpolate(frame, [startFrame, startFrame + 15], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const translateY = interpolate(frame, [startFrame, startFrame + 15], [15, 0], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        background: 'rgba(36, 150, 237, 0.08)',
        border: `1px solid ${COLORS.primary}30`,
        borderRadius: 12,
        padding: 16,
        opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      <div style={{ color: COLORS.primary, fontSize: 14, fontWeight: 'bold', marginBottom: 8 }}>
        {title}
      </div>
      <div style={{ color: COLORS.textMuted, fontSize: 13, fontFamily: 'monospace' }}>
        {content}
      </div>
    </div>
  );
};
