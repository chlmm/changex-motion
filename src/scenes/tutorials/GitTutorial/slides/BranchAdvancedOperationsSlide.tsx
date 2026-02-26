// 终端演示：高级分支操作
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { Terminal } from '../components/Terminal';
import { COLORS, BACKGROUND } from '../config';
import {
  switchBranch,
  switchCreate,
  switchPrevious,
  branchDelete,
  branchDeleteForce,
  branchDeleteRemote,
  branchRename,
  branchListAll,
  branchVerbose,
} from '../config';

export const BranchAdvancedOperationsSlide: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

  // 合并多个场景：switch 命令、删除分支、重命名、查看信息
  const allLines = [
    ...switchBranch,
    ...switchCreate,
    ...switchPrevious,
    ...branchDelete,
    ...branchDeleteForce,
    ...branchDeleteRemote,
    ...branchRename,
    ...branchListAll,
    ...branchVerbose,
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
        高级分支操作演示
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
