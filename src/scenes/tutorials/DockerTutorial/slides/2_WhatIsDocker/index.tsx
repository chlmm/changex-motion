/**
 * 2_WhatIsDocker - Docker 基础概念介绍
 * 
 * 内容：从定义、核心概念到与传统虚拟机的对比，全面介绍 Docker
 * 
 * 子幻灯片结构：
 * ┌─────────────────────────────────────────────────────────────┐
 * │  Definition (90帧)                                          │
 * │    - Docker 定义：容器化平台，打包/分发/运行应用程序          │
 * │    - 核心理念："一次构建，随处运行"                          │
 * │    - 四大特性：标准化交付、环境一致性、快速部署、资源隔离     │
 * ├─────────────────────────────────────────────────────────────┤
 * │  CoreConcepts (200帧)                                       │
 * │    - 三大核心概念：镜像(Image)、容器(Container)、仓库(Registry)│
 * │    - 关系图：镜像 --run--> 容器 <--pull/push--> 仓库         │
 * │    - 比喻理解：镜像=蓝图、容器=房子、仓库=蓝图库              │
 * ├─────────────────────────────────────────────────────────────┤
 * │  Compare (250帧)                                            │
 * │    - 架构对比：传统虚拟机 vs Docker（共享内核）              │
 * │    - 性能对比：启动时间、内存占用、磁盘空间                  │
 * │    - 关键差异：无需Guest OS、秒级启动、资源少、环境标准化     │
 * └─────────────────────────────────────────────────────────────┘
 * 总计: 540帧 (约18秒)
 */
import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { Definition } from './Definition';
import { CoreConcepts } from './CoreConcepts';
import { Compare } from './Compare';

// 子幻灯片时长配置（帧数）
const SLIDE_CONFIG = {
  definition: 90,    // 3秒 - Docker 定义
  coreConcepts: 200, // ~6.7秒 - 核心概念
  compare: 250,      // ~8.3秒 - 与虚拟机对比
} as const;

// 导出总帧数，供主入口使用
export const WHAT_IS_DOCKER_TOTAL_FRAMES = 
  SLIDE_CONFIG.definition + 
  SLIDE_CONFIG.coreConcepts + 
  SLIDE_CONFIG.compare;

// 导出各子幻灯片时长，供外部使用
export const SLIDE_DURATIONS = SLIDE_CONFIG;

export const WhatIsDockerScene: React.FC = () => {
  let currentFrame = 0;

  return (
    <AbsoluteFill>
      {/* 子幻灯片 1: Docker 定义 */}
      <Sequence
        from={currentFrame}
        durationInFrames={SLIDE_CONFIG.definition}
      >
        <Definition />
      </Sequence>
      {currentFrame += SLIDE_CONFIG.definition}

      {/* 子幻灯片 2: 核心概念 */}
      <Sequence
        from={currentFrame}
        durationInFrames={SLIDE_CONFIG.coreConcepts}
      >
        <CoreConcepts />
      </Sequence>
      {currentFrame += SLIDE_CONFIG.coreConcepts}

      {/* 子幻灯片 3: 与虚拟机对比 */}
      <Sequence
        from={currentFrame}
        durationInFrames={SLIDE_CONFIG.compare}
      >
        <Compare />
      </Sequence>
    </AbsoluteFill>
  );
};

// 导出子组件，供单独使用
export { Definition } from './Definition';
export { CoreConcepts } from './CoreConcepts';
export { Compare } from './Compare';
