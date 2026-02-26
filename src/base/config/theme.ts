// 通用主题配置

// 通用颜色
export const COLORS = {
  white: '#ffffff',
  black: '#000000',
  gray: {
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
  blue: '#60a5fa',
  green: '#4ade80',
  yellow: '#fbbf24',
  red: '#f87171',
  purple: '#a78bfa',
} as const;

// 字体
export const FONTS = {
  title: {
    size: 120,
    weight: 'bold' as const,
  },
  subtitle: {
    size: 50,
    weight: 'normal' as const,
  },
  body: {
    size: 35,
    weight: 'normal' as const,
  },
  code: {
    family: 'monospace',
    size: 35,
  },
} as const;

// 动画预设
export const ANIMATION = {
  spring: {
    default: { damping: 15, stiffness: 100, mass: 0.5 },
    gentle: { damping: 20, stiffness: 80, mass: 0.8 },
    bouncy: { damping: 10, stiffness: 200, mass: 0.3 },
  },
  
  // 常用时长（帧数）
  duration: {
    title: 90,       // 3秒
    transition: 30,  // 1秒
    card: 20,        // 0.67秒
  },
} as const;

// 视频配置
export const VIDEO = {
  fps: 30,
  width: 1920,
  height: 1080,
} as const;

// 阴影
export const SHADOWS = {
  glow: (color: string, intensity: number = 0.6) => 
    `0 0 ${30 * intensity}px ${color}`,
  soft: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  strong: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
} as const;

// 通用背景
export const BACKGROUNDS = {
  dark: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
  light: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
} as const;
