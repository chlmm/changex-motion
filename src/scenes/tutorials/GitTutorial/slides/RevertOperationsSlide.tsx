// 终端演示：安全撤销操作
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { Terminal } from '../components/Terminal';
import { COLORS, BACKGROUND } from '../config';
import {
  revertBasic,
  revertNoCommit,
  revertMultiple,
  revertConflict,
  revertAbort,
  revertMerge,
  revertVsReset,
} from '../config';

export const RevertOperationsSlide: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

  // 合并多个场景：基本撤销、多提交撤销、冲突处理、合并提交撤销、与 reset 对比
  const allLines = [
    ...revertBasic,
    ...revertNoCommit,
    ...revertMultiple,
    ...revertConflict,
    ...revertAbort,
    ...revertMerge,
    ...revertVsReset,
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
        安全撤销演示
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
