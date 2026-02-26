// 终端演示：差异查看操作
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { Terminal } from '../components/Terminal';
import { COLORS, BACKGROUND } from '../config';
import {
  diffWorkingDir,
  diffStaged,
  diffFile,
  diffCommits,
  diffBranches,
  diffStat,
  diffNameOnly,
} from '../config';

export const DiffOperationsSlide: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

  // 合并多个场景：工作区差异、暂存区差异、文件差异、提交差异、分支差异
  const allLines = [
    ...diffWorkingDir,
    ...diffStaged,
    ...diffFile,
    ...diffCommits,
    ...diffBranches,
    ...diffStat,
    ...diffNameOnly,
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
        差异查看演示
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
