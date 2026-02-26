// 终端演示：选择性合并操作
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { Terminal } from '../components/Terminal';
import { COLORS, BACKGROUND } from '../config';
import {
  cherryPickBasic,
  cherryPickMultiple,
  cherryPickNoCommit,
  cherryPickConflict,
  cherryPickContinue,
  cherryPickAbort,
  cherryPickMerge,
} from '../config';

export const CherryPickOperationsSlide: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

  // 合并多个场景：基本挑选、多提交挑选、不提交模式、冲突处理、合并提交挑选
  const allLines = [
    ...cherryPickBasic,
    ...cherryPickMultiple,
    ...cherryPickNoCommit,
    ...cherryPickConflict,
    ...cherryPickContinue,
    ...cherryPickAbort,
    ...cherryPickMerge,
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
        选择性合并演示
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
