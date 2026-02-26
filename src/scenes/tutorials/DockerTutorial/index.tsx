// Docker 教程主场景
import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
// 幻灯片
import {
  // Title 已重构为文件夹结构
  TitleSlide,
  TITLE_TOTAL_FRAMES,
  WhatIsDockerSlide,
  WHAT_IS_DOCKER_TOTAL_FRAMES,
  BasicCommandsSlide,
  BASIC_COMMANDS_TOTAL_FRAMES,
  ImageOperationsSlide,
  IMAGE_OPERATIONS_TOTAL_FRAMES,
  ContainerOperationsSlide,
  CONTAINER_OPERATIONS_TOTAL_FRAMES,
  // 操作演示幻灯片
  DockerfileSlide,
  DOCKERFILE_TOTAL_FRAMES,
  ComposeSlide,
  COMPOSE_TOTAL_FRAMES,
  NetworkSlide,
  NETWORK_TOTAL_FRAMES,
  VolumeSlide,
  VOLUME_TOTAL_FRAMES,
  // 总结幻灯片
  BestPracticesSlide,
  BEST_PRACTICES_TOTAL_FRAMES,
  SummarySlide,
  SUMMARY_TOTAL_FRAMES,
} from './slides';

// 幻灯片配置：定义每个幻灯片的时长（帧数）
const SLIDES_CONFIG = [
  // Title 已重构为文件夹结构，时长由内部子幻灯片决定
  { name: 'TitleSlide', duration: TITLE_TOTAL_FRAMES, component: TitleSlide },
  // WhatIsDocker 已重构为文件夹结构，时长由内部子幻灯片决定
  { name: 'WhatIsDockerSlide', duration: WHAT_IS_DOCKER_TOTAL_FRAMES, component: WhatIsDockerSlide },
  // BasicCommands 已重构为文件夹结构，时长由内部子幻灯片决定
  { name: 'BasicCommandsSlide', duration: BASIC_COMMANDS_TOTAL_FRAMES, component: BasicCommandsSlide },
  // ImageOperations 已重构为文件夹结构，时长由内部子幻灯片决定
  { name: 'ImageOperationsSlide', duration: IMAGE_OPERATIONS_TOTAL_FRAMES, component: ImageOperationsSlide },
  // ContainerOperations 已重构为文件夹结构，时长由内部子幻灯片决定
  { name: 'ContainerOperationsSlide', duration: CONTAINER_OPERATIONS_TOTAL_FRAMES, component: ContainerOperationsSlide },
  // Dockerfile 已重构为文件夹结构，时长由内部子幻灯片决定
  { name: 'DockerfileSlide', duration: DOCKERFILE_TOTAL_FRAMES, component: DockerfileSlide },
  // Compose 已重构为文件夹结构，时长由内部子幻灯片决定
  { name: 'ComposeSlide', duration: COMPOSE_TOTAL_FRAMES, component: ComposeSlide },
  // Network 已重构为文件夹结构，时长由内部子幻灯片决定
  { name: 'NetworkSlide', duration: NETWORK_TOTAL_FRAMES, component: NetworkSlide },
  // Volume 已重构为文件夹结构，时长由内部子幻灯片决定
  { name: 'VolumeSlide', duration: VOLUME_TOTAL_FRAMES, component: VolumeSlide },
  // BestPractices 已重构为文件夹结构，时长由内部子幻灯片决定
  { name: 'BestPracticesSlide', duration: BEST_PRACTICES_TOTAL_FRAMES, component: BestPracticesSlide },
  // Summary 已重构为文件夹结构，时长由内部子幻灯片决定
  { name: 'SummarySlide', duration: SUMMARY_TOTAL_FRAMES, component: SummarySlide },
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
