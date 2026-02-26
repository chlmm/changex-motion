// 终端演示：文件操作
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { Terminal } from '../components/Terminal';
import { COLORS, BACKGROUND } from '../config';
import {
  rmFile,
  rmCached,
  rmDirectory,
  rmForce,
  mvRename,
  mvMove,
  mvMoveRename,
  syncDeleted,
  removeFromVersionControl,
} from '../config';

export const FileOperationsSlide: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

  // 合并多个场景：删除文件、保留本地删除、移动重命名、同步删除
  const allLines = [
    ...rmFile,
    ...rmCached,
    ...rmDirectory,
    ...rmForce,
    ...mvRename,
    ...mvMove,
    ...mvMoveRename,
    ...syncDeleted,
    ...removeFromVersionControl,
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
        文件操作演示
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
