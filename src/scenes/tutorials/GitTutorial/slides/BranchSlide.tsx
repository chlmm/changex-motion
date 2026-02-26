// 分支管理幻灯片
import React from 'react';
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { COLORS, BACKGROUND } from '../config';

const branchCommands = [
  { cmd: 'git branch', desc: '查看分支' },
  { cmd: 'git branch <name>', desc: '创建分支' },
  { cmd: 'git checkout <name>', desc: '切换分支' },
  { cmd: 'git merge <name>', desc: '合并分支' },
];

export const BranchSlide: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        background: BACKGROUND,
        padding: 80,
      }}
    >
      <div
        style={{
          fontSize: 70,
          color: COLORS.primary,
          fontWeight: 'bold',
          marginBottom: 60,
          opacity: interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' }),
        }}
      >
        分支管理
      </div>

      <div style={{ display: 'flex', gap: 60, flex: 1 }}>
        {/* 左侧：分支可视化 */}
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 40, color: COLORS.secondary, marginBottom: 40 }}>分支图</div>
          <div style={{ position: 'relative', height: 400 }}>
            {/* Main 分支 */}
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: 50,
                width: '100%',
                height: 4,
                background: COLORS.success,
                borderRadius: 2,
              }}
            />
            {/* Develop 分支 */}
            <div
              style={{
                position: 'absolute',
                left: 100,
                top: 150,
                width: 'calc(100% - 100px)',
                height: 4,
                background: COLORS.secondary,
                borderRadius: 2,
                opacity: interpolate(frame, [30, 50], [0, 1], { extrapolateRight: 'clamp' }),
              }}
            />
            {/* Feature 分支 */}
            <div
              style={{
                position: 'absolute',
                left: 200,
                top: 250,
                width: 'calc(100% - 200px)',
                height: 4,
                background: COLORS.warning,
                borderRadius: 2,
                opacity: interpolate(frame, [60, 80], [0, 1], { extrapolateRight: 'clamp' }),
              }}
            />

            {/* 提交点 */}
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  left: 80 + i * 100,
                  top: 42,
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  background: COLORS.success,
                  border: '3px solid #fff',
                  opacity: interpolate(frame, [i * 15, i * 15 + 10], [0, 1], {
                    extrapolateRight: 'clamp',
                  }),
                }}
              />
            ))}
          </div>
        </div>

        {/* 右侧：命令列表 */}
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 40, color: COLORS.secondary, marginBottom: 40 }}>常用命令</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 25 }}>
            {branchCommands.map((item, index) => {
              const itemOpacity = interpolate(
                frame,
                [20 + index * 15, 40 + index * 15],
                [0, 1],
                { extrapolateRight: 'clamp' }
              );

              return (
                <div
                  key={index}
                  style={{
                    opacity: itemOpacity,
                    transform: `translateX(${(1 - itemOpacity) * 30}px)`,
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'monospace',
                      fontSize: 32,
                      color: COLORS.warning,
                      marginBottom: 8,
                    }}
                  >
                    {item.cmd}
                  </div>
                  <div style={{ fontSize: 26, color: COLORS.textMuted }}>{item.desc}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
