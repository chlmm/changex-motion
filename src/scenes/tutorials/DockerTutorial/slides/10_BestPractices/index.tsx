/**
 * 10_BestPractices - Docker 最佳实践
 * 
 * 本幻灯片总结 Docker 最佳实践，采用叠加显示模式：
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ CorePractices (0-140帧) - 核心实践卡片，全程显示               │
 * │    6个最佳实践：.dockerignore、多阶段构建、最小化基础镜像       │
 * │    不使用root用户、利用缓存层、单一职责                         │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ Tips (80-140帧) - 底部提示，叠加显示                           │
 * │    显示提示：遵循最佳实践让容器更安全、更高效、更易维护          │
 * └─────────────────────────────────────────────────────────────────┘
 * 
 * 总时长: 140帧 (约4.7秒 @30fps)
 */
import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { CorePractices } from './CorePractices';
import { Tips } from './Tips';

// 重新导出子组件
export { CorePractices, Tips };

// 各子幻灯片时长配置
export const SLIDE_DURATIONS = {
  corePractices: 100,   // 核心卡片动画完成时间
  tipsStart: 80,        // 底部提示开始显示时间
  tips: 60,             // 底部提示显示时长
};

export const BEST_PRACTICES_TOTAL_FRAMES = 140;

// 场景编排组件
export const BestPracticesScene: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* 核心实践卡片 - 全程显示 */}
      <Sequence from={0} durationInFrames={BEST_PRACTICES_TOTAL_FRAMES}>
        <CorePractices />
      </Sequence>

      {/* 底部提示 - 叠加显示 */}
      <Sequence from={SLIDE_DURATIONS.tipsStart} durationInFrames={SLIDE_DURATIONS.tips}>
        <Tips />
      </Sequence>
    </AbsoluteFill>
  );
};

// 兼容旧名称
export { BestPracticesScene as BestPracticesSlide };
