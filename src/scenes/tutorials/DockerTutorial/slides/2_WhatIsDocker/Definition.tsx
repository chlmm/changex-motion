// Docker 定义幻灯片
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from 'remotion';
import { COLORS, BACKGROUND } from '../../config';
import { DockerWhale } from '../../components/DockerWhale';

export const Definition: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = { fps: 30 };

  // 标题动画
  const titleSpring = spring({ frame, fps, config: { damping: 20, stiffness: 100 } });
  const titleScale = interpolate(titleSpring, [0, 1], [0.8, 1]);
  const titleOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });

  // 定义文字动画
  const definitionOpacity = interpolate(frame, [20, 40], [0, 1], { extrapolateRight: 'clamp' });
  const definitionY = interpolate(frame, [20, 40], [30, 0], { extrapolateRight: 'clamp' });

  // 副标题动画
  const subtitleOpacity = interpolate(frame, [40, 60], [0, 1], { extrapolateRight: 'clamp' });

  // 关键词高亮动画
  const keywords = ['打包', '分发', '运行'];
  const keywordOpacities = keywords.map((_, i) =>
    interpolate(frame, [60 + i * 10, 70 + i * 10], [0, 1], { extrapolateRight: 'clamp' })
  );

  return (
    <AbsoluteFill
      style={{
        background: BACKGROUND,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      {/* Docker 鲸鱼图标 */}
      <div style={{ marginBottom: 40 }}>
        <DockerWhale
          scale={interpolate(titleSpring, [0, 1], [0.5, 1])}
          rotate={interpolate(titleSpring, [0, 1], [-10, 0])}
        />
      </div>

      {/* 标题 */}
      <div
        style={{
          fontSize: 72,
          fontWeight: 'bold',
          color: COLORS.text,
          opacity: titleOpacity,
          transform: `scale(${titleScale})`,
          textShadow: '0 0 60px rgba(36, 150, 237, 0.5)',
          marginBottom: 30,
        }}
      >
        什么是 Docker？
      </div>

      {/* 核心定义 */}
      <div
        style={{
          fontSize: 32,
          color: COLORS.text,
          opacity: definitionOpacity,
          transform: `translateY(${definitionY}px)`,
          textAlign: 'center',
          maxWidth: 900,
          lineHeight: 1.8,
        }}
      >
        Docker 是一个开源的{' '}
        <strong style={{ color: COLORS.primary }}>容器化平台</strong>
        ，让开发者可以轻松
        {keywords.map((kw, i) => (
          <span key={kw}>
            <strong style={{ color: COLORS.success, opacity: keywordOpacities[i] }}>
              {kw}
            </strong>
            {i < keywords.length - 1 ? '、' : ''}
          </span>
        ))}
        应用程序
      </div>

      {/* 副标题 */}
      <div
        style={{
          fontSize: 24,
          color: COLORS.textMuted,
          marginTop: 40,
          opacity: subtitleOpacity,
          textAlign: 'center',
        }}
      >
        一次构建，随处运行
      </div>

      {/* 底部关键词 */}
      <div
        style={{
          position: 'absolute',
          bottom: 80,
          display: 'flex',
          gap: 30,
          opacity: subtitleOpacity,
        }}
      >
        {['标准化交付', '环境一致性', '快速部署', '资源隔离'].map((item, i) => (
          <div
            key={item}
            style={{
              padding: '12px 24px',
              background: 'rgba(36, 150, 237, 0.15)',
              borderRadius: 25,
              border: `1px solid ${COLORS.primary}40`,
              color: COLORS.text,
              fontSize: 18,
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </AbsoluteFill>
  );
};
