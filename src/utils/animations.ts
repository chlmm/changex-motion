// 动画工具函数
import { interpolate, Easing } from 'remotion';

// 角色动画状态类型
export type AnimationState = 'idle' | 'walk' | 'run' | 'jump' | 'attack' | 'talk';

// 动画配置
export const ANIMATION_CONFIG = {
  idle: { speed: 1, loop: true },
  walk: { speed: 1.5, loop: true },
  run: { speed: 2, loop: true },
  jump: { speed: 1, loop: false },
  attack: { speed: 2, loop: false },
  talk: { speed: 0.8, loop: true },
} as const;

// 缓动函数
export const easing = {
  linear: Easing.linear,
  easeIn: Easing.in(Easing.quad),
  easeOut: Easing.out(Easing.quad),
  easeInOut: Easing.inOut(Easing.quad),
  bounce: Easing.out(Easing.back(2)),
  elastic: Easing.out(Easing.elastic(1)),
};

// 创建循环动画
export const createLoopAnimation = (
  frame: number,
  fps: number,
  duration: number,
  minValue: number,
  maxValue: number
) => {
  const progress = (frame % (duration * fps)) / (duration * fps);
  return interpolate(progress, [0, 0.5, 1], [minValue, maxValue, minValue], {
    easing: Easing.inOut(Easing.sin),
  });
};

// 呼吸动画
export const breathe = (frame: number, fps: number, intensity = 0.02) => {
  return createLoopAnimation(frame, fps, 3, 1 - intensity, 1 + intensity);
};

// 摆动动画
export const swing = (frame: number, fps: number, amplitude = 0.1, speed = 2) => {
  const progress = (frame / fps) * speed * Math.PI * 2;
  return Math.sin(progress) * amplitude;
};

// 行走动画 - 腿部摆动
export const walkCycle = (frame: number, fps: number, speed = 1.5) => {
  const progress = (frame / fps) * speed * Math.PI * 2;
  return Math.sin(progress) * 0.5; // 弧度
};

// 跳跃动画
export const jumpArc = (
  frame: number,
  startFrame: number,
  duration: number,
  height: number
) => {
  const progress = interpolate(
    frame,
    [startFrame, startFrame + duration / 2, startFrame + duration],
    [0, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.quad) }
  );
  return progress * height;
};

// 渐入渐出
export const fadeInOut = (
  frame: number,
  fps: number,
  fadeInDuration: number,
  holdDuration: number,
  fadeOutDuration: number
) => {
  const fadeInEnd = fadeInDuration * fps;
  const holdEnd = fadeInEnd + holdDuration * fps;
  const fadeOutEnd = holdEnd + fadeOutDuration * fps;

  return interpolate(
    frame,
    [0, fadeInEnd, holdEnd, fadeOutEnd],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
};
