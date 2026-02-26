// 环境变量和资源限制
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from 'remotion';
import { Terminal } from '../../components/Terminal';
import { COLORS, BACKGROUND } from '../../config';
import {
  runWithEnv,
} from '../../config/terminal/containerConfig';

import { RemotionTerminalLine } from '../../components/Terminal';

// 环境变量示例
const envMultiple: RemotionTerminalLine[] = [
  { type: 'input', content: '# 设置多个环境变量', delay: 0 },
  { type: 'input', content: 'docker run -d \\', delay: 10 },
  { type: 'input', content: '  -e MYSQL_ROOT_PASSWORD=secret \\', delay: 5 },
  { type: 'input', content: '  -e MYSQL_DATABASE=mydb \\', delay: 5 },
  { type: 'input', content: '  -e MYSQL_USER=admin \\', delay: 5 },
  { type: 'input', content: '  --name mysql mysql:8', delay: 5 },
  { type: 'output', content: 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6', delay: 15 },
];

const envFile: RemotionTerminalLine[] = [
  { type: 'input', content: '# 从文件加载环境变量', delay: 0 },
  { type: 'input', content: 'docker run -d --env-file ./config.env --name app myapp', delay: 10 },
  { type: 'output', content: 'b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7', delay: 15 },
];

// 资源限制示例
const memoryLimit: RemotionTerminalLine[] = [
  { type: 'input', content: '# 内存限制', delay: 0 },
  { type: 'input', content: 'docker run -d --memory="512m" --memory-swap="1g" --name app nginx', delay: 10 },
  { type: 'output', content: 'c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8', delay: 15 },
];

const cpuLimit: RemotionTerminalLine[] = [
  { type: 'input', content: '# CPU 限制', delay: 0 },
  { type: 'input', content: 'docker run -d --cpus="1.5" --cpu-shares=512 --name app nginx', delay: 10 },
  { type: 'output', content: 'd4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9', delay: 15 },
];

const combinedLimits: RemotionTerminalLine[] = [
  { type: 'input', content: '# 综合资源限制', delay: 0 },
  { type: 'input', content: 'docker run -d \\', delay: 10 },
  { type: 'input', content: '  --memory="256m" \\', delay: 5 },
  { type: 'input', content: '  --cpus="0.5" \\', delay: 5 },
  { type: 'input', content: '  --restart=on-failure:3 \\', delay: 5 },
  { type: 'input', content: '  --name app nginx', delay: 5 },
  { type: 'output', content: 'e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0', delay: 15 },
];

export const EnvResources: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = { fps: 30 };

  // 场景配置
  const scenes = [
    { name: 'envIntro', duration: 40, lines: null, title: '环境变量配置' },
    { name: 'envMultiple', duration: 35, lines: envMultiple, title: '设置多个环境变量' },
    { name: 'envFile', duration: 25, lines: envFile, title: '从文件加载环境变量' },
    { name: 'resourceIntro', duration: 40, lines: null, title: '资源限制' },
    { name: 'memory', duration: 25, lines: memoryLimit, title: '内存限制' },
    { name: 'cpu', duration: 25, lines: cpuLimit, title: 'CPU 限制' },
    { name: 'combined', duration: 25, lines: combinedLimits, title: '综合资源限制' },
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

  // 概念场景动画
  const conceptOpacity = (currentSceneIndex === 0 || currentSceneIndex === 3) 
    ? interpolate(currentFrameInScene, [5, 15], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) 
    : 0;

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
      </div>

      {/* 环境变量概念 */}
      {currentSceneIndex === 0 && (
        <div
          style={{
            position: 'absolute',
            top: 130,
            left: 60,
            right: 60,
            bottom: 80,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: conceptOpacity,
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: 30,
              marginBottom: 40,
            }}
          >
            {/* -e 参数 */}
            <div
              style={{
                padding: '25px 35px',
                background: 'rgba(66, 153, 225, 0.15)',
                border: `2px solid ${COLORS.primary}`,
                borderRadius: 12,
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: 24, fontWeight: 'bold', color: COLORS.primary, fontFamily: 'monospace' }}>-e</div>
              <div style={{ fontSize: 14, color: COLORS.textMuted, marginTop: 8 }}>设置单个环境变量</div>
              <div style={{ fontSize: 12, color: COLORS.text, marginTop: 5, fontFamily: 'monospace' }}>-e KEY=VALUE</div>
            </div>

            {/* --env-file 参数 */}
            <div
              style={{
                padding: '25px 35px',
                background: 'rgba(72, 187, 120, 0.15)',
                border: `2px solid ${COLORS.accent}`,
                borderRadius: 12,
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: 24, fontWeight: 'bold', color: COLORS.accent, fontFamily: 'monospace' }}>--env-file</div>
              <div style={{ fontSize: 14, color: COLORS.textMuted, marginTop: 8 }}>从文件加载环境变量</div>
              <div style={{ fontSize: 12, color: COLORS.text, marginTop: 5, fontFamily: 'monospace' }}>--env-file ./config.env</div>
            </div>
          </div>

          {/* 使用场景 */}
          <div
            style={{
              padding: '20px 40px',
              background: 'rgba(255,255,255,0.05)',
              borderRadius: 8,
              maxWidth: 700,
            }}
          >
            <div style={{ fontSize: 16, color: COLORS.text, marginBottom: 10 }}>常见使用场景：</div>
            <div style={{ fontSize: 14, color: COLORS.textMuted, lineHeight: 1.8 }}>
              • 数据库连接配置（MYSQL_ROOT_PASSWORD）<br/>
              • API 密钥和令牌<br/>
              • 应用运行模式（NODE_ENV=production）
            </div>
          </div>
        </div>
      )}

      {/* 资源限制概念 */}
      {currentSceneIndex === 3 && (
        <div
          style={{
            position: 'absolute',
            top: 130,
            left: 60,
            right: 60,
            bottom: 80,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: conceptOpacity,
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: 30,
              marginBottom: 40,
            }}
          >
            {/* 内存限制 */}
            <div
              style={{
                padding: '25px 35px',
                background: 'rgba(237, 137, 54, 0.15)',
                border: `2px solid ${COLORS.warning || '#ED8936'}`,
                borderRadius: 12,
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: 24, fontWeight: 'bold', color: COLORS.warning || '#ED8936', fontFamily: 'monospace' }}>--memory</div>
              <div style={{ fontSize: 14, color: COLORS.textMuted, marginTop: 8 }}>内存限制</div>
              <div style={{ fontSize: 12, color: COLORS.text, marginTop: 5, fontFamily: 'monospace' }}>--memory="512m"</div>
            </div>

            {/* CPU 限制 */}
            <div
              style={{
                padding: '25px 35px',
                background: 'rgba(159, 122, 234, 0.15)',
                border: `2px solid ${COLORS.purple || '#9F7AEA'}`,
                borderRadius: 12,
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: 24, fontWeight: 'bold', color: COLORS.purple || '#9F7AEA', fontFamily: 'monospace' }}>--cpus</div>
              <div style={{ fontSize: 14, color: COLORS.textMuted, marginTop: 8 }}>CPU 核心数限制</div>
              <div style={{ fontSize: 12, color: COLORS.text, marginTop: 5, fontFamily: 'monospace' }}>--cpus="1.5"</div>
            </div>

            {/* 重启策略 */}
            <div
              style={{
                padding: '25px 35px',
                background: 'rgba(72, 187, 120, 0.15)',
                border: `2px solid ${COLORS.accent}`,
                borderRadius: 12,
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: 24, fontWeight: 'bold', color: COLORS.accent, fontFamily: 'monospace' }}>--restart</div>
              <div style={{ fontSize: 14, color: COLORS.textMuted, marginTop: 8 }}>重启策略</div>
              <div style={{ fontSize: 12, color: COLORS.text, marginTop: 5, fontFamily: 'monospace' }}>--restart=always</div>
            </div>
          </div>

          {/* 说明 */}
          <div
            style={{
              padding: '20px 40px',
              background: 'rgba(255,255,255,0.05)',
              borderRadius: 8,
              maxWidth: 700,
            }}
          >
            <div style={{ fontSize: 14, color: COLORS.textMuted, lineHeight: 1.8 }}>
              资源限制防止单个容器占用过多系统资源，确保服务稳定性
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
            title="Docker Terminal"
            lines={currentScene.lines}
            width={900}
            height={350}
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
        环境变量 & 资源
      </div>
    </AbsoluteFill>
  );
};
