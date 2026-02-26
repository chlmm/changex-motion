// 终端演示：分支操作
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { Terminal } from '../components/Terminal';
import { COLORS, BACKGROUND } from '../config';
import { branchBasicOperations } from '../config';

export const BranchOperationsSlide: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

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
        分支操作演示
      </div>

      <Terminal
        title="~/project — bash"
        lines={branchBasicOperations}
        width={1100}
        height={480}
        typingSpeed={2}
      />
    </AbsoluteFill>
  );
};
