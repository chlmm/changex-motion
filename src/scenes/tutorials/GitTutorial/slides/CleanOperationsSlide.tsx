// 终端演示：清理操作
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { Terminal } from '../components/Terminal';
import { COLORS, BACKGROUND } from '../config';
import {
  cleanDryRun,
  cleanFiles,
  cleanDirectories,
  cleanIgnored,
  cleanAll,
  cleanInteractive,
  cleanWorkflow,
} from '../config';

export const CleanOperationsSlide: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

  // 合并多个场景：预览删除、删除文件、删除目录、删除忽略文件、交互式清理
  const allLines = [
    ...cleanDryRun,
    ...cleanFiles,
    ...cleanDirectories,
    ...cleanIgnored,
    ...cleanAll,
    ...cleanInteractive,
    ...cleanWorkflow,
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
        清理操作演示
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
