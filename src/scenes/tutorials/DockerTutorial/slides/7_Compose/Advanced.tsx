// 高级特性 - 扩展、多环境
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from 'remotion';
import { Terminal } from '../../components/Terminal';
import { COLORS, BACKGROUND } from '../../config';
import { composeScale, composeBuild } from '../../config/terminal/composeConfig';

import { RemotionTerminalLine } from '../../components/Terminal';

// 多环境配置示例
const multiEnvExample: RemotionTerminalLine[] = [
  { type: 'input', content: '# 使用不同环境配置', delay: 0 },
  { type: 'input', content: 'docker compose -f docker-compose.yml -f docker-compose.prod.yml up', delay: 10 },
  { type: 'output', content: '[+] Running 3/3', delay: 15 },
  { type: 'output', content: ' ✔ Container myapp-web-1      Started', delay: 5 },
  { type: 'output', content: ' ✔ Container myapp-db-1       Started', delay: 5 },
];

export const Advanced: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = { fps: 30 };

  // 场景配置
  const scenes = [
    { name: 'scale', duration: 40, lines: composeScale, title: '扩展服务', subtitle: '--scale' },
    { name: 'build', duration: 35, lines: composeBuild, title: '构建服务', subtitle: 'docker compose build' },
    { name: 'env', duration: 45, lines: multiEnvExample, title: '多环境配置', subtitle: '多文件覆盖' },
    { name: 'tips', duration: 40, lines: null, title: '常用技巧' },
  ];

  // 计算当前场景
  let currentSceneIndex = 0;
  let currentFrameInScene = frame;
  let accumulatedFrame = 0;

  for (let i = 0; i < scenes.length; i++) {
    if (frame < accumulatedFrame + scenes[i].duration) {
      currentSceneIndex = i;
      currentFrameInScene = frame - accumulatedFrame;
      break;
    }
    accumulatedFrame += scenes[i].duration;
    if (i === scenes.length - 1) {
      currentSceneIndex = i;
      currentFrameInScene = frame - accumulatedFrame;
    }
  }

  const currentScene = scenes[currentSceneIndex];

  // 动画
  const titleProgress = spring({ frame: currentFrameInScene, fps, config: { damping: 20, stiffness: 100 } });
  const titleY = interpolate(titleProgress, [0, 1], [-30, 0]);
  const contentOpacity = interpolate(currentFrameInScene, [5, 15], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ background: BACKGROUND }}>
      {/* 标题区域 */}
      <div
        style={{
          position: 'absolute',
          top: 40,
          left: 60,
          right: 60,
        }}
      >
        <div
          style={{
            fontSize: 42,
            fontWeight: 'bold',
            color: COLORS.primary,
            transform: `translateY(${titleY}px)`,
            opacity: titleProgress,
          }}
        >
          {currentScene.title}
        </div>
        {currentScene.subtitle && (
          <div
            style={{
              fontSize: 20,
              color: COLORS.textMuted,
              marginTop: 8,
              fontFamily: 'monospace',
              opacity: titleProgress,
            }}
          >
            {currentScene.subtitle}
          </div>
        )}
      </div>

      {/* 常用技巧 */}
      {currentSceneIndex === 3 && (
        <div
          style={{
            position: 'absolute',
            top: 120,
            left: 60,
            right: 60,
            bottom: 80,
            display: 'flex',
            gap: 30,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: contentOpacity,
          }}
        >
          {/* 命令列表 */}
          <div style={{ maxWidth: 350 }}>
            <div style={{ fontSize: 16, color: COLORS.primary, fontWeight: 'bold', marginBottom: 15 }}>
              常用命令速查
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { cmd: 'docker compose up -d', desc: '后台启动' },
                { cmd: 'docker compose logs -f', desc: '实时日志' },
                { cmd: 'docker compose pull', desc: '拉取镜像' },
                { cmd: 'docker compose config', desc: '验证配置' },
                { cmd: 'docker compose top', desc: '查看进程' },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    padding: '8px 12px',
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: 6,
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <span style={{ fontSize: 11, fontFamily: 'monospace', color: COLORS.accent }}>{item.cmd}</span>
                  <span style={{ fontSize: 11, color: COLORS.textMuted }}>{item.desc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 最佳实践 */}
          <div style={{ maxWidth: 350 }}>
            <div style={{ fontSize: 16, color: COLORS.accent, fontWeight: 'bold', marginBottom: 15 }}>
              最佳实践
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                '使用 .env 文件管理敏感配置',
                '为生产环境使用单独配置文件',
                '合理设置服务依赖关系',
                '使用 healthcheck 检查服务健康',
                '限制容器资源使用',
              ].map((tip, i) => (
                <div
                  key={i}
                  style={{
                    padding: '10px 12px',
                    background: 'rgba(72, 187, 120, 0.1)',
                    borderRadius: 6,
                    fontSize: 12,
                    color: COLORS.text,
                  }}
                >
                  ✓ {tip}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 终端场景 */}
      {currentScene.lines && (
        <div
          style={{
            position: 'absolute',
            top: 120,
            left: 60,
            right: 60,
            bottom: 80,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}
        >
          <Terminal
            title="Docker Compose"
            lines={currentScene.lines}
            width={900}
            height={400}
            frameOffset={0}
          />
        </div>
      )}

      {/* 场景指示器 */}
      <div
        style={{
          position: 'absolute',
          bottom: 30,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 8,
        }}
      >
        {scenes.map((scene, i) => (
          <div
            key={scene.name}
            style={{
              width: i === currentSceneIndex ? 40 : 20,
              height: 4,
              background: i === currentSceneIndex ? COLORS.primary : 'rgba(255,255,255,0.2)',
              borderRadius: 2,
            }}
          />
        ))}
      </div>

      {/* 进度标签 */}
      <div
        style={{
          position: 'absolute',
          bottom: 50,
          right: 60,
          fontSize: 14,
          color: COLORS.textMuted,
        }}
      >
        高级特性
      </div>
    </AbsoluteFill>
  );
};
