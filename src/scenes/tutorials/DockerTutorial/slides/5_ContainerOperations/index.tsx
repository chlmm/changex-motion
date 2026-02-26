/**
 * 5_ContainerOperations - Docker 容器操作
 * 
 * 本幻灯片介绍 Docker 容器的核心操作命令和实践方法，分为4个子幻灯片：
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 1. Lifecycle (200帧) - 容器生命周期                             │
 * │    展示容器的完整生命周期：create → start → stop → rm            │
 * │    以及 pause/unpause、kill 等控制命令                          │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ 2. PortMapping (180帧) - 端口映射                               │
 * │    讲解 -p 参数实现容器端口与主机端口的映射                      │
 * │    演示常用端口映射配置                                         │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ 3. EnvResources (180帧) - 环境变量和资源                        │
 * │    介绍 -e 设置环境变量，--memory/--cpus 限制资源               │
 * │    展示资源限制的最佳实践                                       │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ 4. Management (180帧) - 容器管理                                │
 * │    涵盖 exec、logs、inspect、stats 等管理命令                   │
 * │    演示如何查看和监控运行中的容器                                │
 * └─────────────────────────────────────────────────────────────────┘
 * 
 * 总时长: 740帧 (约24.7秒 @30fps)
 */
import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { Lifecycle } from './Lifecycle';
import { PortMapping } from './PortMapping';
import { EnvResources } from './EnvResources';
import { Management } from './Management';

// 重新导出子组件
export { Lifecycle, PortMapping, EnvResources, Management };

// 各子幻灯片时长
const LIFECYCLE_DURATION = 200;      // 容器生命周期
const PORT_MAPPING_DURATION = 180;   // 端口映射
const ENV_RESOURCES_DURATION = 180;  // 环境变量和资源
const MANAGEMENT_DURATION = 180;     // 容器管理

// 总时长导出
export const CONTAINER_OPERATIONS_TOTAL_FRAMES = 
  LIFECYCLE_DURATION + 
  PORT_MAPPING_DURATION + 
  ENV_RESOURCES_DURATION + 
  MANAGEMENT_DURATION;

// 子幻灯片时长导出（供外部使用）
export const SLIDE_DURATIONS = {
  lifecycle: LIFECYCLE_DURATION,
  portMapping: PORT_MAPPING_DURATION,
  envResources: ENV_RESOURCES_DURATION,
  management: MANAGEMENT_DURATION,
};

// 场景组件导出
export const ContainerOperationsScene: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* 场景 1: 容器生命周期 */}
      <Sequence from={0} durationInFrames={LIFECYCLE_DURATION}>
        <Lifecycle />
      </Sequence>

      {/* 场景 2: 端口映射 */}
      <Sequence from={LIFECYCLE_DURATION} durationInFrames={PORT_MAPPING_DURATION}>
        <PortMapping />
      </Sequence>

      {/* 场景 3: 环境变量和资源限制 */}
      <Sequence from={LIFECYCLE_DURATION + PORT_MAPPING_DURATION} durationInFrames={ENV_RESOURCES_DURATION}>
        <EnvResources />
      </Sequence>

      {/* 场景 4: 容器管理 */}
      <Sequence from={LIFECYCLE_DURATION + PORT_MAPPING_DURATION + ENV_RESOURCES_DURATION} durationInFrames={MANAGEMENT_DURATION}>
        <Management />
      </Sequence>
    </AbsoluteFill>
  );
};

// 默认导出
export default ContainerOperationsScene;
