// 终端演示：添加与提交操作
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { Terminal } from '../components/Terminal';
import { COLORS, BACKGROUND } from '../config';
import {
  addSingleFile,
  addMultipleFiles,
  addAllFiles,
  addWildcard,
  commitBasic,
  commitAmendAdd,
  commitAmend,
  addCommitWorkflow,
} from '../config';

export const AddCommitOperationsSlide: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

  // 合并多个场景：添加文件的各种方式 + 提交方式 + 完整工作流
  const allLines = [
    ...addSingleFile,
    ...addMultipleFiles,
    ...addAllFiles,
    ...addWildcard,
    ...commitBasic,
    ...commitAmendAdd,
    ...commitAmend,
    ...addCommitWorkflow,
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
        添加与提交演示
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
