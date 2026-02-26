// 光合作用教程专用主题配置

// 科学主题颜色
export const COLORS = {
  primary: '#4ade80',      // 绿色（叶绿素）
  secondary: '#22d3ee',    // 青色（水/氧气）
  accent: '#fbbf24',       // 黄色（阳光）
  background: '#0F172A',
  card: '#164E63',
  text: '#ffffff',
  textMuted: '#94a3b8',
} as const;

// 光合作用背景
export const BACKGROUND = 'linear-gradient(180deg, #0F172A 0%, #164E63 50%, #155E75 100%)';

// 分子颜色
export const MOLECULE_COLORS = {
  co2: '#6b7280',          // 二氧化碳 - 灰色
  h2o: '#3b82f6',          // 水 - 蓝色
  glucose: '#fbbf24',      // 葡萄糖 - 黄色
  o2: '#60a5fa',           // 氧气 - 浅蓝
} as const;
