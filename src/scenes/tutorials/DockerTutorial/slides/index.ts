/**
 * Docker 教程幻灯片导出
 * 
 * 幻灯片结构（按播放顺序）：
 * ┌─────────────────────────────────────────────────────────┐
 * │  1_Title              标题页           (160帧, 5.3秒)   │
 * │  2_WhatIsDocker       什么是Docker     (540帧, 18秒)    │
 * │  3_BasicCommands      基础命令         (480帧, 16秒)    │
 * │  4_ImageOperations    镜像操作         (680帧, 22.7秒)  │
 * │  5_ContainerOperations 容器操作        (740帧, 24.7秒)  │
 * │  6_Dockerfile         Dockerfile       (740帧, 24.7秒)  │
 * │  7_Compose            Compose编排      (700帧, 23.3秒)  │
 * │  8_Network            网络配置         (580帧, 19.3秒)  │
 * │  9_Volume             数据卷           (580帧, 19.3秒)  │
 * │  10_BestPractices     最佳实践         (140帧, 4.7秒)   │
 * │  11_Summary           课程总结         (180帧, 6秒)     │
 * └─────────────────────────────────────────────────────────┘
 * 总计: 5520帧 (约184秒 / 3分4秒)
 */

// Title 已重构为文件夹结构
export {
  TitleScene,
  TITLE_TOTAL_FRAMES,
  SLIDE_DURATIONS as TITLE_SLIDE_DURATIONS,
  MainTitle,
  BottomTags,
} from './1_Title';
// 兼容旧名称
export { TitleScene as TitleSlide } from './1_Title';

// WhatIsDocker 已重构为文件夹结构，包含多个子幻灯片
export { 
  WhatIsDockerScene,
  WHAT_IS_DOCKER_TOTAL_FRAMES,
  SLIDE_DURATIONS as WHAT_IS_DOCKER_SLIDE_DURATIONS,
  Definition,
  CoreConcepts,
  Compare,
} from './2_WhatIsDocker';
// 兼容旧名称
export { WhatIsDockerScene as WhatIsDockerSlide } from './2_WhatIsDocker';

// BasicCommands 已重构为文件夹结构
export {
  BasicCommandsScene,
  BASIC_COMMANDS_TOTAL_FRAMES,
  SLIDE_DURATIONS as BASIC_COMMANDS_SLIDE_DURATIONS,
  Overview as BasicCommandsOverview,
  CommandParams,
} from './3_BasicCommands';
// 兼容旧名称
export { BasicCommandsScene as BasicCommandsSlide } from './3_BasicCommands';

// ImageOperations 已重构为文件夹结构
export {
  ImageOperationsScene,
  IMAGE_OPERATIONS_TOTAL_FRAMES,
  SLIDE_DURATIONS as IMAGE_OPERATIONS_SLIDE_DURATIONS,
  LayerConcept,
  PullPush,
  BuildManage,
} from './4_ImageOperations';
// 兼容旧名称
export { ImageOperationsScene as ImageOperationsSlide } from './4_ImageOperations';

// ContainerOperations 已重构为文件夹结构
export {
  ContainerOperationsScene,
  CONTAINER_OPERATIONS_TOTAL_FRAMES,
  SLIDE_DURATIONS as CONTAINER_OPERATIONS_SLIDE_DURATIONS,
  Lifecycle,
  PortMapping,
  EnvResources,
  Management,
} from './5_ContainerOperations';
// 兼容旧名称
export { ContainerOperationsScene as ContainerOperationsSlide } from './5_ContainerOperations';

// Dockerfile 已重构为文件夹结构
export {
  DockerfileScene,
  DOCKERFILE_TOTAL_FRAMES,
  SLIDE_DURATIONS as DOCKERFILE_SLIDE_DURATIONS,
  BasicStructure,
  Instructions,
  MultiStage,
  BestPractices,
} from './6_Dockerfile';
// 兼容旧名称
export { DockerfileScene as DockerfileSlide } from './6_Dockerfile';

// Compose 已重构为文件夹结构
export {
  ComposeScene,
  COMPOSE_TOTAL_FRAMES,
  SLIDE_DURATIONS as COMPOSE_SLIDE_DURATIONS,
  Concept,
  ConfigFile,
  Operations,
  Advanced,
} from './7_Compose';
// 兼容旧名称
export { ComposeScene as ComposeSlide } from './7_Compose';

// Network 已重构为文件夹结构
export {
  NetworkScene,
  NETWORK_TOTAL_FRAMES,
  SLIDE_DURATIONS as NETWORK_SLIDE_DURATIONS,
  NetworkTypes,
  NetworkOps,
  DNSIsolation,
} from './8_Network';
// 兼容旧名称
export { NetworkScene as NetworkSlide } from './8_Network';

// Volume 已重构为文件夹结构
export {
  VolumeScene,
  VOLUME_TOTAL_FRAMES,
  SLIDE_DURATIONS as VOLUME_SLIDE_DURATIONS,
  MountTypes,
  VolumeOps,
  DataPersistence,
} from './9_Volume';
// 兼容旧名称
export { VolumeScene as VolumeSlide } from './9_Volume';

// BestPractices 已重构为文件夹结构
export {
  BestPracticesScene,
  BEST_PRACTICES_TOTAL_FRAMES,
  SLIDE_DURATIONS as BEST_PRACTICES_SLIDE_DURATIONS,
  CorePractices,
  Tips,
} from './10_BestPractices';
// 兼容旧名称
export { BestPracticesScene as BestPracticesSlide } from './10_BestPractices';

// Summary 已重构为文件夹结构
export {
  SummaryScene,
  SUMMARY_TOTAL_FRAMES,
  SLIDE_DURATIONS as SUMMARY_SLIDE_DURATIONS,
  Overview as SummaryOverview,
  CoreReview,
  EndingMessage,
} from './11_Summary';
// 兼容旧名称
export { SummaryScene as SummarySlide } from './11_Summary';
