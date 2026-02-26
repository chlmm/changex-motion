// Git 教程专用主题配置

// Git 主题颜色
export const COLORS = {
  primary: '#f05032',      // Git 橙
  secondary: '#60a5fa',    // 蓝色
  success: '#4ade80',      // 绿色
  warning: '#fbbf24',      // 黄色
  error: '#f87171',        // 红色
  background: '#1a1a2e',
  card: '#16213e',
  text: '#ffffff',
  textMuted: '#94a3b8',
} as const;

// Git 教程背景
export const BACKGROUND = 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)';

// 命令颜色
export const COMMAND_COLORS = {
  init: '#4ade80',
  add: '#60a5fa',
  commit: '#fbbf24',
  push: '#f472b6',
  pull: '#fbbf24',
  branch: '#a78bfa',
} as const;
