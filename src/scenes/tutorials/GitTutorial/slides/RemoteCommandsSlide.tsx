// 远程操作幻灯片
import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { COLORS, BACKGROUND } from '../config';

export const RemoteCommandsSlide: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const flowProgress = spring({
    frame: frame - 20,
    fps,
    config: { damping: 20, stiffness: 60 },
  });

  const arrowOpacity = interpolate(frame, [60, 90], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill
      style={{
        background: BACKGROUND,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          fontSize: 70,
          color: COLORS.primary,
          fontWeight: 'bold',
          marginBottom: 80,
          opacity: interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' }),
        }}
      >
        远程仓库操作
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 80,
          transform: `scale(${flowProgress})`,
          opacity: flowProgress,
        }}
      >
        {/* 本地仓库 */}
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              width: 250,
              height: 250,
              borderRadius: 30,
              background: `linear-gradient(135deg, ${COLORS.success}33, ${COLORS.success}11)`,
              border: `3px solid ${COLORS.success}`,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: 60,
              marginBottom: 20,
              boxShadow: `0 0 40px ${COLORS.success}4D`,
            }}
          >
            💻
          </div>
          <div style={{ fontSize: 40, color: COLORS.success, fontWeight: 'bold' }}>本地仓库</div>
        </div>

        {/* 双向箭头 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40, opacity: arrowOpacity }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <span style={{ fontSize: 50, color: COLORS.secondary }}>→</span>
            <div
              style={{
                background: `${COLORS.secondary}22`,
                border: `2px solid ${COLORS.secondary}`,
                borderRadius: 10,
                padding: '15px 25px',
              }}
            >
              <span style={{ fontFamily: 'monospace', fontSize: 30, color: COLORS.secondary }}>
                git push
              </span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <span style={{ fontSize: 50, color: COLORS.warning }}>←</span>
            <div
              style={{
                background: `${COLORS.warning}22`,
                border: `2px solid ${COLORS.warning}`,
                borderRadius: 10,
                padding: '15px 25px',
              }}
            >
              <span style={{ fontFamily: 'monospace', fontSize: 30, color: COLORS.warning }}>
                git pull
              </span>
            </div>
          </div>
        </div>

        {/* 远程仓库 */}
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              width: 250,
              height: 250,
              borderRadius: 30,
              background: `linear-gradient(135deg, ${COLORS.secondary}33, ${COLORS.secondary}11)`,
              border: `3px solid ${COLORS.secondary}`,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: 60,
              marginBottom: 20,
              boxShadow: `0 0 40px ${COLORS.secondary}4D`,
            }}
          >
            ☁️
          </div>
          <div style={{ fontSize: 40, color: COLORS.secondary, fontWeight: 'bold' }}>远程仓库</div>
        </div>
      </div>

      {/* Clone 命令 */}
      <div
        style={{
          marginTop: 60,
          opacity: interpolate(frame, [100, 130], [0, 1], { extrapolateRight: 'clamp' }),
        }}
      >
        <div
          style={{
            background: `${COLORS.error}22`,
            border: `2px solid ${COLORS.error}`,
            borderRadius: 15,
            padding: '20px 40px',
          }}
        >
          <span style={{ fontFamily: 'monospace', fontSize: 35, color: COLORS.error }}>
            git clone &lt;url&gt; → 克隆远程仓库
          </span>
        </div>
      </div>
    </AbsoluteFill>
  );
};
