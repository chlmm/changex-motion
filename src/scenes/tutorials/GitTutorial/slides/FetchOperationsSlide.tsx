// 终端演示：远程获取操作
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { Terminal } from '../components/Terminal';
import { COLORS, BACKGROUND } from '../config';
import {
  fetchAll,
  fetchRemote,
  fetchBranch,
  fetchTags,
  fetchPrune,
  fetchCompare,
  fetchVsPull,
} from '../config';

export const FetchOperationsSlide: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

  // 合并多个场景：获取所有、获取特定、获取标签、清理删除分支、对比差异
  const allLines = [
    ...fetchAll,
    ...fetchRemote,
    ...fetchBranch,
    ...fetchTags,
    ...fetchPrune,
    ...fetchCompare,
    ...fetchVsPull,
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
        远程获取演示
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
