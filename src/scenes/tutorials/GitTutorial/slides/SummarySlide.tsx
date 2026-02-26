// 总结幻灯片
import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { COLORS, BACKGROUND } from '../config';

const commands = [
  'init → 创建仓库',
  'add → 暂存更改',
  'commit → 提交更改',
  'push → 推送到远程',
  'pull → 拉取更新',
  'branch → 分支管理',
];

export const SummarySlide: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 80 },
  });

  return (
    <AbsoluteFill
      style={{
        background: BACKGROUND,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      {/* 标题 */}
      <div
        style={{
          fontSize: 100,
          fontWeight: 'bold',
          color: COLORS.primary,
          textShadow: `0 0 40px ${COLORS.primary}99`,
          marginBottom: 60,
          transform: `scale(${scale})`,
          opacity: scale,
        }}
      >
        开始使用 Git 吧！
      </div>

      {/* 命令速查 */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 25,
          opacity: interpolate(frame, [30, 60], [0, 1], { extrapolateRight: 'clamp' }),
        }}
      >
        {commands.map((cmd, index) => (
          <div
            key={index}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: 15,
              padding: '20px 30px',
              border: `1px solid ${COLORS.secondary}4D`,
            }}
          >
            <span style={{ fontFamily: 'monospace', fontSize: 28, color: COLORS.secondary }}>
              {cmd}
            </span>
          </div>
        ))}
      </div>

      {/* 底部 */}
      <div
        style={{
          marginTop: 80,
          fontSize: 35,
          color: COLORS.success,
          opacity: interpolate(frame, [60, 90], [0, 1], { extrapolateRight: 'clamp' }),
        }}
      >
        由 AetherViz Master 为你生成
      </div>
    </AbsoluteFill>
  );
};
