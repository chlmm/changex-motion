// 终端演示：操作历史与恢复
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { Terminal } from '../components/Terminal';
import { COLORS, BACKGROUND } from '../config';
import {
  reflogShow,
  reflogRecent,
  reflogRecover,
  reflogUndoReset,
  reflogRecoverBranch,
  reflogResetRecover,
} from '../config';

export const ReflogOperationsSlide: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

  // 合并多个场景：查看历史、恢复提交、撤销 reset、恢复分支
  const allLines = [
    ...reflogShow,
    ...reflogRecent,
    ...reflogRecover,
    ...reflogUndoReset,
    ...reflogRecoverBranch,
    ...reflogResetRecover,
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
        操作历史与恢复演示
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
