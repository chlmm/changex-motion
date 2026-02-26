/**
 * 6_Dockerfile - Dockerfile 构建镜像
 * 
 * 本幻灯片深入讲解 Dockerfile 的编写方法，分为4个子幻灯片：
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 1. BasicStructure (180帧) - 基本结构与构建                      │
 * │    3个场景：Dockerfile简介、查看结构、docker build 构建          │
 * │    展示 Dockerfile → docker build → Image 的完整流程            │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ 2. Instructions (200帧) - 核心指令详解                          │
 * │    5个场景：指令概览、FROM、RUN、CMD vs ENTRYPOINT、COPY vs ADD │
 * │    详解 FROM/RUN/CMD/ENTRYPOINT/COPY/ADD/WORKDIR/EXPOSE 等指令  │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ 3. MultiStage (180帧) - 多阶段构建                              │
 * │    4个场景：多阶段概念、示例代码、缓存优化、构建参数             │
 * │    展示 Builder→Runtime 两阶段构建，500MB→50MB 优化效果         │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ 4. BestPractices (180帧) - 最佳实践                             │
 * │    4个场景：实践概述、.dockerignore、优化示例、构建技巧         │
 * │    涵盖特定版本标签、非root用户、最小化层数、缓存利用等实践      │
 * └─────────────────────────────────────────────────────────────────┘
 * 
 * 总时长: 740帧 (约24.7秒 @30fps)
 */
import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { BasicStructure } from './BasicStructure';
import { Instructions } from './Instructions';
import { MultiStage } from './MultiStage';
import { BestPractices } from './BestPractices';

// 重新导出子组件
export { BasicStructure, Instructions, MultiStage, BestPractices };

// 各子幻灯片时长
const BASIC_STRUCTURE_DURATION = 180;   // 基本结构与构建
const INSTRUCTIONS_DURATION = 200;      // 核心指令详解
const MULTI_STAGE_DURATION = 180;       // 多阶段构建
const BEST_PRACTICES_DURATION = 180;    // 最佳实践

// 总时长导出
export const DOCKERFILE_TOTAL_FRAMES = 
  BASIC_STRUCTURE_DURATION + 
  INSTRUCTIONS_DURATION + 
  MULTI_STAGE_DURATION + 
  BEST_PRACTICES_DURATION;

// 子幻灯片时长导出（供外部使用）
export const SLIDE_DURATIONS = {
  basicStructure: BASIC_STRUCTURE_DURATION,
  instructions: INSTRUCTIONS_DURATION,
  multiStage: MULTI_STAGE_DURATION,
  bestPractices: BEST_PRACTICES_DURATION,
};

// 场景组件导出
export const DockerfileScene: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* 场景 1: 基本结构与构建 */}
      <Sequence from={0} durationInFrames={BASIC_STRUCTURE_DURATION}>
        <BasicStructure />
      </Sequence>

      {/* 场景 2: 核心指令详解 */}
      <Sequence from={BASIC_STRUCTURE_DURATION} durationInFrames={INSTRUCTIONS_DURATION}>
        <Instructions />
      </Sequence>

      {/* 场景 3: 多阶段构建 */}
      <Sequence from={BASIC_STRUCTURE_DURATION + INSTRUCTIONS_DURATION} durationInFrames={MULTI_STAGE_DURATION}>
        <MultiStage />
      </Sequence>

      {/* 场景 4: 最佳实践 */}
      <Sequence from={BASIC_STRUCTURE_DURATION + INSTRUCTIONS_DURATION + MULTI_STAGE_DURATION} durationInFrames={BEST_PRACTICES_DURATION}>
        <BestPractices />
      </Sequence>
    </AbsoluteFill>
  );
};

// 默认导出
export default DockerfileScene;
