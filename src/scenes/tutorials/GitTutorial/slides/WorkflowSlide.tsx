// 工作流程幻灯片
import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { COLORS, BACKGROUND } from '../config';

const steps = [
  { step: '1', title: '修改代码', colorKey: 'success' as const },
  { step: '2', title: 'git add', colorKey: 'secondary' as const },
  { step: '3', title: 'git commit', colorKey: 'warning' as const },
  { step: '4', title: 'git push', colorKey: 'error' as const },
];

const colorMap = {
  success: COLORS.success,
  secondary: COLORS.secondary,
  warning: COLORS.warning,
  error: COLORS.error,
};

export const WorkflowSlide: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

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
        Git 工作流程
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 30 }}>
        {steps.map((item, index) => {
          const stepProgress = spring({
            frame: frame - 20 - index * 20,
            fps,
            config: { damping: 15, stiffness: 100 },
          });

          const color = colorMap[item.colorKey];

          return (
            <React.Fragment key={index}>
              <div
                style={{
                  textAlign: 'center',
                  transform: `scale(${stepProgress})`,
                  opacity: stepProgress,
                }}
              >
                <div
                  style={{
                    width: 180,
                    height: 180,
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${color}33, ${color}11)`,
                    border: `4px solid ${color}`,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: 70,
                    color,
                    fontWeight: 'bold',
                    boxShadow: `0 0 40px ${color}44`,
                    marginBottom: 20,
                  }}
                >
                  {item.step}
                </div>
                <div
                  style={{
                    fontSize: 35,
                    color,
                    fontWeight: 'bold',
                  }}
                >
                  {item.title}
                </div>
              </div>

              {/* 箭头 */}
              {index < steps.length - 1 && (
                <div
                  style={{
                    fontSize: 60,
                    color: COLORS.textMuted,
                    opacity: interpolate(
                      frame,
                      [40 + index * 20, 60 + index * 20],
                      [0, 1],
                      { extrapolateRight: 'clamp' }
                    ),
                  }}
                >
                  →
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* 提示文字 */}
      <div
        style={{
          marginTop: 80,
          fontSize: 35,
          color: COLORS.textMuted,
          textAlign: 'center',
          opacity: interpolate(frame, [100, 130], [0, 1], { extrapolateRight: 'clamp' }),
        }}
      >
        循环这个流程，完成你的每一次代码提交 💪
      </div>
    </AbsoluteFill>
  );
};
