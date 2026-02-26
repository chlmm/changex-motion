/**
 * 4_ImageOperations - Docker 镜像操作详解
 * 
 * 内容：从镜像分层原理到实际操作的完整讲解
 * 
 * 子幻灯片结构：
 * ┌─────────────────────────────────────────────────────────────┐
 * │  LayerConcept (220帧)                                       │
 * │    - 镜像分层原理：每层代表 Dockerfile 中的一个指令          │
 * │    - 对比示例：nginx:latest vs nginx:alpine                 │
 * │    - 共享层机制：相同层本地只存一份                          │
 * │    - 三大优势：快速分发、节省空间、高效构建                  │
 * ├─────────────────────────────────────────────────────────────┤
 * │  PullPush (220帧)                                           │
 * │    - 拉取镜像：docker pull、镜像标签、常用仓库              │
 * │    - 查看镜像：docker images、过滤选项                      │
 * │    - 推送镜像：docker tag/login/push、认证流程              │
 * ├─────────────────────────────────────────────────────────────┤
 * │  BuildManage (240帧)                                        │
 * │    - 构建镜像：docker build、-t/--build-arg/--no-cache      │
 * │    - 删除镜像：docker rmi、-f 强制删除                      │
 * │    - 清理镜像：docker image prune、悬空镜像概念              │
 * └─────────────────────────────────────────────────────────────┘
 * 总计: 680帧 (约22.7秒)
 */
import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { LayerConcept } from './LayerConcept';
import { PullPush } from './PullPush';
import { BuildManage } from './BuildManage';

// 子幻灯片时长配置（帧数）
const SLIDE_CONFIG = {
  layerConcept: 220,  // ~7.3秒 - 镜像分层概念
  pullPush: 220,      // ~7.3秒 - 拉取与推送操作
  buildManage: 240,   // ~8秒 - 构建与管理操作
} as const;

// 导出总帧数，供主入口使用
export const IMAGE_OPERATIONS_TOTAL_FRAMES = 
  SLIDE_CONFIG.layerConcept + 
  SLIDE_CONFIG.pullPush + 
  SLIDE_CONFIG.buildManage;

// 导出各子幻灯片时长
export const SLIDE_DURATIONS = SLIDE_CONFIG;

export const ImageOperationsScene: React.FC = () => {
  let currentFrame = 0;

  return (
    <AbsoluteFill>
      {/* 子幻灯片 1: 镜像分层概念 */}
      <Sequence
        from={currentFrame}
        durationInFrames={SLIDE_CONFIG.layerConcept}
      >
        <LayerConcept />
      </Sequence>
      {currentFrame += SLIDE_CONFIG.layerConcept}

      {/* 子幻灯片 2: 拉取与推送 */}
      <Sequence
        from={currentFrame}
        durationInFrames={SLIDE_CONFIG.pullPush}
      >
        <PullPush />
      </Sequence>
      {currentFrame += SLIDE_CONFIG.pullPush}

      {/* 子幻灯片 3: 构建与管理 */}
      <Sequence
        from={currentFrame}
        durationInFrames={SLIDE_CONFIG.buildManage}
      >
        <BuildManage />
      </Sequence>
    </AbsoluteFill>
  );
};

// 导出子组件，供单独使用
export { LayerConcept } from './LayerConcept';
export { PullPush } from './PullPush';
export { BuildManage } from './BuildManage';
