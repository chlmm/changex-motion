/**
 * 7_Compose - Docker Compose 多容器编排
 * 
 * 本幻灯片介绍 Docker Compose 多容器编排工具，分为4个子幻灯片：
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 1. Concept (160帧) - 核心概念                                   │
 * │    2个场景：Compose简介、多服务架构                              │
 * │    展示 web→api→db→redis 多服务架构示例                         │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ 2. ConfigFile (200帧) - 配置文件详解                            │
 * │    4个场景：YAML结构、services配置、volumes/networks、.env文件  │
 * │    讲解 version/services/networks/volumes 顶层配置项            │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ 3. Operations (180帧) - 服务操作                                │
 * │    6个场景：up/ps/logs/exec/restart/down                        │
 * │    全部终端演示常用操作命令                                      │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ 4. Advanced (160帧) - 高级特性                                  │
 * │    4个场景：--scale扩展、构建服务、多环境配置、常用技巧          │
 * │    多文件覆盖、healthcheck、资源限制等最佳实践                   │
 * └─────────────────────────────────────────────────────────────────┘
 * 
 * 总时长: 700帧 (约23.3秒 @30fps)
 */
import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { Concept } from './Concept';
import { ConfigFile } from './ConfigFile';
import { Operations } from './Operations';
import { Advanced } from './Advanced';

// 重新导出子组件
export { Concept, ConfigFile, Operations, Advanced };

// 各子幻灯片时长
const CONCEPT_DURATION = 160;        // 核心概念
const CONFIG_FILE_DURATION = 200;    // 配置文件详解
const OPERATIONS_DURATION = 180;     // 服务操作
const ADVANCED_DURATION = 160;       // 高级特性

// 总时长导出
export const COMPOSE_TOTAL_FRAMES = 
  CONCEPT_DURATION + 
  CONFIG_FILE_DURATION + 
  OPERATIONS_DURATION + 
  ADVANCED_DURATION;

// 子幻灯片时长导出（供外部使用）
export const SLIDE_DURATIONS = {
  concept: CONCEPT_DURATION,
  configFile: CONFIG_FILE_DURATION,
  operations: OPERATIONS_DURATION,
  advanced: ADVANCED_DURATION,
};

// 场景组件导出
export const ComposeScene: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* 场景 1: 核心概念 */}
      <Sequence from={0} durationInFrames={CONCEPT_DURATION}>
        <Concept />
      </Sequence>

      {/* 场景 2: 配置文件详解 */}
      <Sequence from={CONCEPT_DURATION} durationInFrames={CONFIG_FILE_DURATION}>
        <ConfigFile />
      </Sequence>

      {/* 场景 3: 服务操作 */}
      <Sequence from={CONCEPT_DURATION + CONFIG_FILE_DURATION} durationInFrames={OPERATIONS_DURATION}>
        <Operations />
      </Sequence>

      {/* 场景 4: 高级特性 */}
      <Sequence from={CONCEPT_DURATION + CONFIG_FILE_DURATION + OPERATIONS_DURATION} durationInFrames={ADVANCED_DURATION}>
        <Advanced />
      </Sequence>
    </AbsoluteFill>
  );
};

// 默认导出
export default ComposeScene;
