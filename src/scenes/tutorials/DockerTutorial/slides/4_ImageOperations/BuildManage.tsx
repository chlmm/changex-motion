// Docker 镜像构建与管理
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from 'remotion';
import { Terminal } from '../../components/Terminal';
import { COLORS, BACKGROUND } from '../../config';
import { buildImage } from '../../config/terminal';

// 删除镜像配置
const removeImage = [
  { type: 'input', content: 'docker rmi nginx', delay: 0 },
  { type: 'output', content: 'Untagged: nginx:latest', delay: 15 },
  { type: 'output', content: 'Deleted: sha256:605c77e624dd...', delay: 5 },
];

// 清理镜像配置
const pruneImages = [
  { type: 'input', content: 'docker image prune -a', delay: 0 },
  { type: 'output', content: 'WARNING! This will remove all images without at least one container.', delay: 15 },
  { type: 'output', content: 'Deleted Images:', delay: 10 },
  { type: 'output', content: 'untagged: python:3.11', delay: 3 },
  { type: 'output', content: 'Total reclaimed space: 2.5GB', delay: 5 },
];

export const BuildManage: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = { fps: 30 };

  // 场景配置
  const scenes = [
    { name: 'build', duration: 100, lines: buildImage, title: '构建镜像', subtitle: '从 Dockerfile 创建镜像' },
    { name: 'remove', duration: 60, lines: removeImage, title: '删除镜像', subtitle: '移除不需要的镜像' },
    { name: 'prune', duration: 80, lines: pruneImages, title: '清理镜像', subtitle: '批量清理悬空镜像' },
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

        {/* 右侧提示 */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {currentScene.name === 'build' && (
            <>
              <TipCard
                type="tip"
                content="使用 -t 参数指定镜像名称和标签"
                frame={currentFrameInScene}
                startFrame={20}
              />
              <TipCard
                type="tip"
                content="使用 --build-arg 传递构建参数"
                frame={currentFrameInScene}
                startFrame={35}
              />
              <TipCard
                type="warning"
                content="使用 --no-cache 忽略缓存重新构建"
                frame={currentFrameInScene}
                startFrame={50}
              />
            </>
          )}
          {currentScene.name === 'remove' && (
            <>
              <TipCard
                type="tip"
                content="使用镜像 ID 或名称删除"
                frame={currentFrameInScene}
                startFrame={20}
              />
              <TipCard
                type="warning"
                content="使用 -f 强制删除运行中容器的镜像"
                frame={currentFrameInScene}
                startFrame={35}
              />
            </>
          )}
          {currentScene.name === 'prune' && (
            <>
              <TipCard
                type="tip"
                content="悬空镜像: 没有标签的镜像层"
                frame={currentFrameInScene}
                startFrame={20}
              />
              <TipCard
                type="warning"
                content="-a 参数会删除所有未使用的镜像"
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

// 提示卡片组件
interface TipCardProps {
  type: 'tip' | 'warning';
  content: string;
  frame: number;
  startFrame: number;
}

const TipCard: React.FC<TipCardProps> = ({ type, content, frame, startFrame }) => {
  const opacity = interpolate(frame, [startFrame, startFrame + 15], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const translateY = interpolate(frame, [startFrame, startFrame + 15], [15, 0], {
    extrapolateRight: 'clamp',
  });

  const bgColor = type === 'tip' ? 'rgba(74, 222, 128, 0.08)' : 'rgba(251, 191, 36, 0.08)';
  const borderColor = type === 'tip' ? `${COLORS.success}30` : `${COLORS.warning}30`;
  const iconColor = type === 'tip' ? COLORS.success : COLORS.warning;
  const icon = type === 'tip' ? '💡' : '⚠️';

  return (
    <div
      style={{
        background: bgColor,
        border: `1px solid ${borderColor}`,
        borderRadius: 10,
        padding: 14,
        opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
        <span style={{ fontSize: 16 }}>{icon}</span>
        <span style={{ color: COLORS.text, fontSize: 14, flex: 1 }}>{content}</span>
      </div>
    </div>
  );
};
