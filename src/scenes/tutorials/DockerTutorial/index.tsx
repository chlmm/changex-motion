// Docker 教程主场景
import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
// 幻灯片
import {
  // 概念说明幻灯片
  TitleSlide,
  WhatIsDockerSlide,
  BasicCommandsSlide,
  // 操作演示幻灯片
  ImageOperationsSlide,
  ContainerOperationsSlide,
  DockerfileSlide,
  ComposeSlide,
  NetworkSlide,
  VolumeSlide,
  // 总结幻灯片
  BestPracticesSlide,
  SummarySlide,
} from './slides';

// 幻灯片配置：定义每个幻灯片的时长（帧数）
const SLIDES_CONFIG = [
  { name: 'TitleSlide', duration: 90, component: TitleSlide },
  { name: 'WhatIsDockerSlide', duration: 150, component: WhatIsDockerSlide },
  { name: 'BasicCommandsSlide', duration: 180, component: BasicCommandsSlide },
  { name: 'ImageOperationsSlide', duration: 300, component: ImageOperationsSlide },
  { name: 'ContainerOperationsSlide', duration: 300, component: ContainerOperationsSlide },
  { name: 'DockerfileSlide', duration: 300, component: DockerfileSlide },
  { name: 'ComposeSlide', duration: 300, component: ComposeSlide },
  { name: 'NetworkSlide', duration: 240, component: NetworkSlide },
  { name: 'VolumeSlide', duration: 240, component: VolumeSlide },
  { name: 'BestPracticesSlide', duration: 120, component: BestPracticesSlide },
  { name: 'SummarySlide', duration: 120, component: SummarySlide },
] as const;

// 计算每个幻灯片的起始帧和总帧数
type SlideTiming = {
  name: string;
  start: number;
  duration: number;
  component: React.FC;
};

const calculateTimings = (config: typeof SLIDES_CONFIG): SlideTiming[] => {
  const timings: SlideTiming[] = [];
  let currentFrame = 0;

  for (const slide of config) {
    timings.push({
      name: slide.name,
      start: currentFrame,
      duration: slide.duration,
      component: slide.component,
    });
    currentFrame += slide.duration;
  }

  return timings;
};

// 计算并导出总帧数
export const DOCKER_TUTORIAL_TOTAL_FRAMES = SLIDES_CONFIG.reduce(
  (sum, slide) => sum + slide.duration,
  0
);

// 计算幻灯片时间表
const slideTimings = calculateTimings(SLIDES_CONFIG);

export const DockerTutorialScene: React.FC = () => {
  return (
    <AbsoluteFill>
      {slideTimings.map((slide, index) => (
        <Sequence key={slide.name} from={slide.start} durationInFrames={slide.duration}>
          <slide.component />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
