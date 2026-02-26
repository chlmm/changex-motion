/**
 * 9_Volume - Docker 数据卷与持久化
 * 
 * 本幻灯片讲解 Docker 数据存储与持久化方案，分为3个子幻灯片：
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 1. MountTypes (200帧) - 三种挂载方式对比                        │
 * │    4个场景：挂载概述、Volume/Bind Mount/tmpfs 三种方式详解       │
 * │    展示各方式的架构图、特点和适用场景                            │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ 2. VolumeOps (180帧) - 数据卷操作                               │
 * │    7个场景：ls/create/inspect/mount/mountExplicit/readonly/rm   │
 * │    全部终端演示卷创建、挂载、只读挂载、删除等操作                │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ 3. DataPersistence (200帧) - 数据持久化与备份                   │
 * │    5个场景：持久化概念、演示、备份、恢复、容器间共享             │
 * │    展示容器删除后数据保留、tar备份恢复、多容器共享Volume         │
 * └─────────────────────────────────────────────────────────────────┘
 * 
 * 总时长: 580帧 (约19.3秒 @30fps)
 */
import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { MountTypes } from './MountTypes';
import { VolumeOps } from './VolumeOps';
import { DataPersistence } from './DataPersistence';

// 重新导出子组件
export { MountTypes, VolumeOps, DataPersistence };

// 各子幻灯片时长
const MOUNT_TYPES_DURATION = 200;       // 三种挂载方式对比
const VOLUME_OPS_DURATION = 180;        // 数据卷操作
const DATA_PERSISTENCE_DURATION = 200;  // 数据持久化与备份

// 总时长导出
export const VOLUME_TOTAL_FRAMES = 
  MOUNT_TYPES_DURATION + 
  VOLUME_OPS_DURATION + 
  DATA_PERSISTENCE_DURATION;

// 子幻灯片时长导出（供外部使用）
export const SLIDE_DURATIONS = {
  mountTypes: MOUNT_TYPES_DURATION,
  volumeOps: VOLUME_OPS_DURATION,
  dataPersistence: DATA_PERSISTENCE_DURATION,
};

// 场景组件导出
export const VolumeScene: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* 场景 1: 三种挂载方式对比 */}
      <Sequence from={0} durationInFrames={MOUNT_TYPES_DURATION}>
        <MountTypes />
      </Sequence>

      {/* 场景 2: 数据卷操作 */}
      <Sequence from={MOUNT_TYPES_DURATION} durationInFrames={VOLUME_OPS_DURATION}>
        <VolumeOps />
      </Sequence>

      {/* 场景 3: 数据持久化与备份 */}
      <Sequence from={MOUNT_TYPES_DURATION + VOLUME_OPS_DURATION} durationInFrames={DATA_PERSISTENCE_DURATION}>
        <DataPersistence />
      </Sequence>
    </AbsoluteFill>
  );
};

// 默认导出
export default VolumeScene;
