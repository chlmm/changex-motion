/**
 * 1_Title - Docker 教程标题页
 * 
 * 内容：展示课程主标题和五大核心主题概览
 * 
 * 子幻灯片结构：
 * ┌─────────────────────────────────────────────────────────────┐
 * │  MainTitle (160帧, 全程显示)                                │
 * │    - Docker 鲸鱼图标动画（缩放旋转进入）                     │
 * │    - 主标题 "Docker 教程"（淡入上移）                        │
 * │    - 副标题 "容器化技术从入门到精通"                         │
 * │    - 7个集装箱依次出现动画                                   │
 * ├─────────────────────────────────────────────────────────────┤
 * │  BottomTags (120帧, 从第40帧叠加)                           │
 * │    - 5个课程标签依次淡入：镜像、容器、网络、数据卷、编排      │
 * └─────────────────────────────────────────────────────────────┘
 * 总计: 160帧 (约5.3秒)
 */
import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { MainTitle } from './MainTitle';
import { BottomTags } from './BottomTags';

// 重新导出子组件
export { MainTitle, BottomTags };

// 各子幻灯片时长配置
export const SLIDE_DURATIONS = {
  mainTitle: 100,      // 主标题动画完成时间
  bottomTagsStart: 40, // 底部标签开始显示时间
  bottomTags: 120,     // 底部标签显示时长
};

export const TITLE_TOTAL_FRAMES = 160;

// 场景编排组件
export const TitleScene: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* 主标题动画 - 全程显示 */}
      <Sequence from={0} durationInFrames={TITLE_TOTAL_FRAMES}>
        <MainTitle />
      </Sequence>

      {/* 底部标签动画 - 叠加显示 */}
      <Sequence from={SLIDE_DURATIONS.bottomTagsStart} durationInFrames={SLIDE_DURATIONS.bottomTags}>
        <BottomTags />
      </Sequence>
    </AbsoluteFill>
  );
};

// 兼容旧名称
export { TitleScene as TitleSlide };
