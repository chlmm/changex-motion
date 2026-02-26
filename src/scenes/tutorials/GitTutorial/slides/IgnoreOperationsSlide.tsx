// 终端演示：忽略规则配置
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { Terminal } from '../components/Terminal';
import { COLORS, BACKGROUND } from '../config';
import {
  createGitignore,
  checkIgnore,
  checkIgnoreFile,
  listIgnored,
  globalGitignore,
  negatePattern,
  cleanTrackedIgnored,
} from '../config';

export const IgnoreOperationsSlide: React.FC = () => {
  const frame = useCurrentFrame();

  const titleOpacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });

  // 合并多个场景：创建 gitignore、检查忽略、全局配置、否定模式
  const allLines = [
    ...createGitignore,
    ...checkIgnore,
    ...checkIgnoreFile,
    ...listIgnored,
    ...globalGitignore,
    ...negatePattern,
    ...cleanTrackedIgnored,
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
        忽略规则配置演示
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
