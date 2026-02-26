// Docker 教程专用主题配置

// Docker 主题颜色
export const COLORS = {
  primary: '#2496ED',      // Docker 蓝
  secondary: '#1D63ED',    // 深蓝
  success: '#4ade80',      // 绿色
  warning: '#fbbf24',      // 黄色
  error: '#f87171',        // 红色
  background: '#0D1B2A',
  card: '#1B2838',
  text: '#ffffff',
  textMuted: '#94a3b8',
} as const;

// Docker 教程背景
export const BACKGROUND = 'linear-gradient(135deg, #0D1B2A 0%, #1B2838 50%, #243B53 100%)';

// 命令颜色
export const COMMAND_COLORS = {
  run: '#2496ED',
  build: '#4ade80',
  pull: '#60a5fa',
  push: '#f472b6',
  exec: '#a78bfa',
  compose: '#fbbf24',
} as const;
