/**
 * 11_Summary - Docker 教程总结
 * 
 * 本幻灯片回顾整个教程内容，分为3个顺序子幻灯片：
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 1. Overview (40帧) - 课程总结标题                               │
 * │    显示 "🎉 课程总结" 大标题                                    │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ 2. CoreReview (80帧) - 核心内容回顾                             │
 * │    4个总结卡片：镜像管理、容器操作、数据管理、网络配置          │
 * │    每个卡片列出对应的常用命令和概念                             │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ 3. EndingMessage (60帧) - 结束语                                │
 * │    "恭喜你完成了 Docker 教程！🐳 继续实践，成为容器化高手！"    │
 * └─────────────────────────────────────────────────────────────────┘
 * 
 * 总时长: 180帧 (约6秒 @30fps)
 */
import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { Overview } from './Overview';
import { CoreReview } from './CoreReview';
import { EndingMessage } from './EndingMessage';

// 重新导出子组件
export { Overview, CoreReview, EndingMessage };

// 各子幻灯片时长
export const SLIDE_DURATIONS = {
  overview: 40,
  coreReview: 80,
  endingMessage: 60,
};

export const SUMMARY_TOTAL_FRAMES = SLIDE_DURATIONS.overview + SLIDE_DURATIONS.coreReview + SLIDE_DURATIONS.endingMessage;

// 场景编排组件
export const SummaryScene: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* 概述标题 */}
      <Sequence from={0} durationInFrames={SLIDE_DURATIONS.overview}>
        <Overview />
      </Sequence>

      {/* 核心回顾 */}
      <Sequence from={SLIDE_DURATIONS.overview} durationInFrames={SLIDE_DURATIONS.coreReview}>
        <CoreReview />
      </Sequence>

      {/* 结束语 */}
      <Sequence from={SLIDE_DURATIONS.overview + SLIDE_DURATIONS.coreReview} durationInFrames={SLIDE_DURATIONS.endingMessage}>
        <EndingMessage />
      </Sequence>
    </AbsoluteFill>
  );
};

// 兼容旧名称
export { SummaryScene as SummarySlide };
