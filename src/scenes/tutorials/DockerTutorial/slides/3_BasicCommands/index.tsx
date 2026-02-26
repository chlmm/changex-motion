/**
 * 3_BasicCommands - Docker 基础命令入门
 * 
 * 内容：系统介绍 Docker 常用命令及 docker run 核心参数
 * 
 * 子幻灯片结构：
 * ┌─────────────────────────────────────────────────────────────┐
 * │  Overview (200帧)                                           │
 * │    - 镜像命令：images、pull、rmi                            │
 * │    - 容器命令：ps、run、stop                                 │
 * │    - 系统命令：--version、info、system df                   │
 * │    - 打字机效果展示，逐命令呈现                              │
 * ├─────────────────────────────────────────────────────────────┤
 * │  CommandParams (280帧)                                      │
 * │    - docker run 六大常用参数：                              │
 * │      -d(后台运行)、-p(端口映射)、-v(数据卷挂载)             │
 * │      -e(环境变量)、--name(命名)、--rm(自动删除)             │
 * │    - 终端演示：实际命令执行效果                              │
 * │    - 组合使用示例                                           │
 * └─────────────────────────────────────────────────────────────┘
 * 总计: 480帧 (约16秒)
 */
import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { Overview } from './Overview';
import { CommandParams } from './CommandParams';

// 子幻灯片时长配置（帧数）
const SLIDE_CONFIG = {
  overview: 200,      // ~6.7秒 - 命令概览（分类展示）
  commandParams: 280, // ~9.3秒 - docker run 参数详解
} as const;

// 导出总帧数，供主入口使用
export const BASIC_COMMANDS_TOTAL_FRAMES = 
  SLIDE_CONFIG.overview + 
  SLIDE_CONFIG.commandParams;

// 导出各子幻灯片时长
export const SLIDE_DURATIONS = SLIDE_CONFIG;

export const BasicCommandsScene: React.FC = () => {
  let currentFrame = 0;

  return (
    <AbsoluteFill>
      {/* 子幻灯片 1: 命令概览 */}
      <Sequence
        from={currentFrame}
        durationInFrames={SLIDE_CONFIG.overview}
      >
        <Overview />
      </Sequence>
      {currentFrame += SLIDE_CONFIG.overview}

      {/* 子幻灯片 2: 参数详解 */}
      <Sequence
        from={currentFrame}
        durationInFrames={SLIDE_CONFIG.commandParams}
      >
        <CommandParams />
      </Sequence>
    </AbsoluteFill>
  );
};

// 导出子组件，供单独使用
export { Overview } from './Overview';
export { CommandParams } from './CommandParams';
