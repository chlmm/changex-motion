// Git 教程主场景
import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
// 幻灯片
import {
  // 概念说明幻灯片
  TitleSlide,
  WhatIsGitSlide,
  BasicCommandsSlide,
  BranchSlide,
  RemoteCommandsSlide,
  WorkflowSlide,
  BestPracticesSlide,
  SummarySlide,
  GitInitCompareSlide,
  // 终端演示幻灯片 - 基础操作
  AddCommitOperationsSlide,
  DiffOperationsSlide,
  ViewHistorySlide,
  // 终端演示幻灯片 - 分支操作
  BranchOperationsSlide,
  BranchAdvancedOperationsSlide,
  // 终端演示幻灯片 - 合并与变基
  MergeConflictSlide,
  RebaseOperationsSlide,
  CherryPickOperationsSlide,
  // 终端演示幻灯片 - 远程操作
  RemoteOperationsSlide,
  FetchOperationsSlide,
  // 终端演示幻灯片 - 撤销操作
  UndoMistakesSlide,
  RevertOperationsSlide,
  ReflogOperationsSlide,
  // 终端演示幻灯片 - 暂存与标签
  StashChangesSlide,
  TagOperationsSlide,
  // 终端演示幻灯片 - 文件与清理
  FileOperationsSlide,
  CleanOperationsSlide,
  IgnoreOperationsSlide,
} from './slides';

// 幻灯片配置：定义每个幻灯片的时长（帧数）
const SLIDES_CONFIG = [
  { name: 'TitleSlide', duration: 90, component: TitleSlide },
  { name: 'WhatIsGitSlide', duration: 150, component: WhatIsGitSlide },
  { name: 'BasicCommandsSlide', duration: 180, component: BasicCommandsSlide },
  { name: 'AddCommitOperationsSlide', duration: 300, component: AddCommitOperationsSlide },
  { name: 'DiffOperationsSlide', duration: 300, component: DiffOperationsSlide },
  { name: 'GitInitCompareSlide', duration: 180, component: GitInitCompareSlide },
  { name: 'RemoteCommandsSlide', duration: 150, component: RemoteCommandsSlide },
  { name: 'RemoteOperationsSlide', duration: 300, component: RemoteOperationsSlide },
  { name: 'FetchOperationsSlide', duration: 300, component: FetchOperationsSlide },
  { name: 'BranchSlide', duration: 150, component: BranchSlide },
  { name: 'BranchOperationsSlide', duration: 300, component: BranchOperationsSlide },
  { name: 'BranchAdvancedOperationsSlide', duration: 300, component: BranchAdvancedOperationsSlide },
  { name: 'MergeConflictSlide', duration: 300, component: MergeConflictSlide },
  { name: 'RebaseOperationsSlide', duration: 300, component: RebaseOperationsSlide },
  { name: 'CherryPickOperationsSlide', duration: 300, component: CherryPickOperationsSlide },
  { name: 'UndoMistakesSlide', duration: 300, component: UndoMistakesSlide },
  { name: 'RevertOperationsSlide', duration: 300, component: RevertOperationsSlide },
  { name: 'ReflogOperationsSlide', duration: 300, component: ReflogOperationsSlide },
  { name: 'StashChangesSlide', duration: 300, component: StashChangesSlide },
  { name: 'ViewHistorySlide', duration: 300, component: ViewHistorySlide },
  { name: 'TagOperationsSlide', duration: 300, component: TagOperationsSlide },
  { name: 'FileOperationsSlide', duration: 300, component: FileOperationsSlide },
  { name: 'CleanOperationsSlide', duration: 300, component: CleanOperationsSlide },
  { name: 'IgnoreOperationsSlide', duration: 300, component: IgnoreOperationsSlide },
  { name: 'WorkflowSlide', duration: 150, component: WorkflowSlide },
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
export const GIT_TUTORIAL_TOTAL_FRAMES = SLIDES_CONFIG.reduce(
  (sum, slide) => sum + slide.duration,
  0
);

// 计算幻灯片时间表
const slideTimings = calculateTimings(SLIDES_CONFIG);

export const GitTutorialScene: React.FC = () => {
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
