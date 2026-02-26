// 终端演示：变基操作
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { Terminal } from '../components/Terminal';
import { COLORS, BACKGROUND } from '../config';
import {
  rebaseBasic,
  rebaseProcess,
  rebaseConflict,
  rebaseContinue,
  rebaseAbort,
  pullRebase,
} from '../config';

export const RebaseOperationsSlide: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

  // 合并多个场景：基础变基、变基过程、冲突处理、继续/中止、拉取变基
  const allLines = [
    ...rebaseBasic,
    ...rebaseProcess,
    ...rebaseConflict,
    ...rebaseContinue,
    ...rebaseAbort,
    ...pullRebase,
  ];

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
          fontSize: 60,
          color: COLORS.primary,
          fontWeight: 'bold',
          marginBottom: 50,
          opacity: titleOpacity,
        }}
      >
        变基操作演示
      </div>

      <Terminal
        title="~/project — bash"
        lines={allLines}
        width={1100}
        height={480}
        typingSpeed={2}
      />
    </AbsoluteFill>
  );
};
