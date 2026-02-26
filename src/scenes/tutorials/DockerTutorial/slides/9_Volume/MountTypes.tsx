// 三种挂载方式对比 - Volume / Bind / tmpfs
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from 'remotion';
import { Terminal } from '../../components/Terminal';
import { COLORS, BACKGROUND } from '../../config';
import {
  mountVolume,
  bindMount,
  tmpfsMount,
} from '../../config/terminal/volumeConfig';

export const MountTypes: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = { fps: 30 };

  // 场景配置
  const scenes = [
    { name: 'overview', duration: 50, lines: null, title: '数据挂载概述' },
    { name: 'volume', duration: 50, lines: mountVolume, title: 'Volume 挂载' },
    { name: 'bind', duration: 50, lines: bindMount, title: 'Bind Mount 挂载' },
    { name: 'tmpfs', duration: 50, lines: tmpfsMount, title: 'tmpfs 挂载' },
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
  const contentOpacity = interpolate(currentFrameInScene, [5, 20], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  // 挂载类型数据
  const mountTypes = [
    {
      name: 'Volume',
      color: COLORS.primary,
      description: 'Docker 管理的存储',
      features: ['Docker 自动管理', '最佳实践推荐', '易于备份迁移', '可命名共享'],
      path: '/var/lib/docker/volumes/',
      command: '-v myvol:/app/data',
    },
    {
      name: 'Bind Mount',
      color: COLORS.accent,
      description: '主机目录映射',
      features: ['直接映射主机路径', '开发环境常用', '配置文件热更新', '绝对路径要求'],
      path: '/host/path',
      command: '-v /host/path:/app/data',
    },
    {
      name: 'tmpfs',
      color: '#ED8936',
      description: '内存临时存储',
      features: ['存储在内存中', '容器停止即消失', '高性能临时存储', '敏感数据处理'],
      path: '内存',
      command: '--tmpfs /tmp',
    },
  ];

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

      {/* 概述场景 - 三种挂载类型总览 */}
      {currentSceneIndex === 0 && (
        <div
          style={{
            position: 'absolute',
            top: 120,
            left: 60,
            right: 60,
            bottom: 80,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: contentOpacity,
          }}
        >
          <div style={{ display: 'flex', gap: 25 }}>
            {mountTypes.map((type, index) => {
              const cardProgress = spring({ 
                frame: currentFrameInScene - 10 - index * 5, 
                fps, 
                config: { damping: 15, stiffness: 80 } 
              });
              const cardScale = interpolate(cardProgress, [0, 1], [0.8, 1]);
              
              return (
                <div
                  key={type.name}
                  style={{
                    padding: '20px 25px',
                    background: `rgba(${type.name === 'Volume' ? '66, 153, 225' : type.name === 'Bind Mount' ? '72, 187, 120' : '237, 137, 54'}, 0.15)`,
                    border: `2px solid ${type.color}`,
                    borderRadius: 12,
                    width: 200,
                    transform: `scale(${cardScale})`,
                    opacity: cardProgress,
                  }}
                >
                  <div style={{ fontSize: 24, fontWeight: 'bold', color: type.color, marginBottom: 6 }}>
                    {type.name}
                  </div>
                  <div style={{ fontSize: 13, color: COLORS.textMuted, marginBottom: 12 }}>
                    {type.description}
                  </div>
                  <div style={{ fontSize: 12, color: COLORS.text, lineHeight: 1.7 }}>
                    {type.features.map((f, i) => (
                      <div key={i}>• {f}</div>
                    ))}
                  </div>
                  <div
                    style={{
                      marginTop: 12,
                      padding: '8px 10px',
                      background: 'rgba(0,0,0,0.2)',
                      borderRadius: 4,
                      fontSize: 11,
                      fontFamily: 'monospace',
                      color: type.color,
                      wordBreak: 'break-all',
                    }}
                  >
                    {type.command}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Volume 挂载详解 */}
      {currentSceneIndex === 1 && (
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
          {/* 图示 */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontSize: 16, color: COLORS.textMuted, marginBottom: 15 }}>Volume 存储架构</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
              {/* Docker 区域 */}
              <div
                style={{
                  padding: '15px 20px',
                  background: 'rgba(66, 153, 225, 0.15)',
                  border: `2px dashed ${COLORS.primary}`,
                  borderRadius: 8,
                }}
              >
                <div style={{ fontSize: 12, color: COLORS.textMuted, marginBottom: 8 }}>Docker 管理</div>
                <div style={{ fontSize: 14, color: COLORS.text }}>
                  /var/lib/docker/volumes/myvol/_data
                </div>
              </div>
              
              <div style={{ fontSize: 20, color: COLORS.primary }}>⟷</div>
              
              {/* 容器 */}
              <div
                style={{
                  padding: '15px 20px',
                  background: 'rgba(72, 187, 120, 0.15)',
                  border: `2px solid ${COLORS.accent}`,
                  borderRadius: 8,
                }}
              >
                <div style={{ fontSize: 12, color: COLORS.textMuted, marginBottom: 8 }}>Container</div>
                <div style={{ fontSize: 14, color: COLORS.text }}>/app/data</div>
              </div>
            </div>
          </div>
          
          {/* 说明 */}
          <div style={{ flex: 1, maxWidth: 320 }}>
            <div style={{ fontSize: 16, color: COLORS.primary, fontWeight: 'bold', marginBottom: 12 }}>
              Volume 特点
            </div>
            <div style={{ fontSize: 13, color: COLORS.text, lineHeight: 1.8 }}>
              <div style={{ marginBottom: 8 }}>✓ Docker 自动管理存储位置</div>
              <div style={{ marginBottom: 8 }}>✓ 多容器安全共享</div>
              <div style={{ marginBottom: 8 }}>✓ 易于备份和迁移</div>
              <div style={{ marginBottom: 8 }}>✓ 可使用命名卷或匿名卷</div>
            </div>
            <div
              style={{
                marginTop: 15,
                padding: '10px 12px',
                background: 'rgba(66, 153, 225, 0.1)',
                borderRadius: 6,
                fontSize: 12,
                fontFamily: 'monospace',
                color: COLORS.accent,
              }}
            >
              docker volume create myvol
            </div>
          </div>
        </div>
      )}

      {/* Bind Mount 详解 */}
      {currentSceneIndex === 2 && (
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
          {/* 图示 */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontSize: 16, color: COLORS.textMuted, marginBottom: 15 }}>Bind Mount 架构</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
              {/* 主机目录 */}
              <div
                style={{
                  padding: '15px 20px',
                  background: 'rgba(72, 187, 120, 0.15)',
                  border: `2px solid ${COLORS.accent}`,
                  borderRadius: 8,
                }}
              >
                <div style={{ fontSize: 12, color: COLORS.textMuted, marginBottom: 8 }}>Host Path</div>
                <div style={{ fontSize: 14, color: COLORS.text }}>/home/user/app</div>
              </div>
              
              <div style={{ fontSize: 20, color: COLORS.accent }}>⟷</div>
              
              {/* 容器 */}
              <div
                style={{
                  padding: '15px 20px',
                  background: 'rgba(72, 187, 120, 0.15)',
                  border: `2px solid ${COLORS.accent}`,
                  borderRadius: 8,
                }}
              >
                <div style={{ fontSize: 12, color: COLORS.textMuted, marginBottom: 8 }}>Container</div>
                <div style={{ fontSize: 14, color: COLORS.text }}>/app</div>
              </div>
            </div>
          </div>
          
          {/* 说明 */}
          <div style={{ flex: 1, maxWidth: 320 }}>
            <div style={{ fontSize: 16, color: COLORS.accent, fontWeight: 'bold', marginBottom: 12 }}>
              Bind Mount 特点
            </div>
            <div style={{ fontSize: 13, color: COLORS.text, lineHeight: 1.8 }}>
              <div style={{ marginBottom: 8 }}>✓ 直接映射主机目录</div>
              <div style={{ marginBottom: 8 }}>✓ 开发环境首选</div>
              <div style={{ marginBottom: 8 }}>✓ 代码热更新</div>
              <div style={{ marginBottom: 8 }}>✓ 需要绝对路径</div>
            </div>
            <div
              style={{
                marginTop: 15,
                padding: '10px 12px',
                background: 'rgba(72, 187, 120, 0.1)',
                borderRadius: 6,
                fontSize: 12,
                fontFamily: 'monospace',
                color: COLORS.accent,
              }}
            >
              -v $(pwd)/app:/app
            </div>
          </div>
        </div>
      )}

      {/* tmpfs 详解 */}
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
          {/* 图示 */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontSize: 16, color: COLORS.textMuted, marginBottom: 15 }}>tmpfs 存储架构</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
              {/* 内存 */}
              <div
                style={{
                  padding: '15px 25px',
                  background: 'rgba(237, 137, 54, 0.15)',
                  border: `2px solid #ED8936`,
                  borderRadius: 8,
                }}
              >
                <div style={{ fontSize: 12, color: COLORS.textMuted, marginBottom: 8 }}>Host Memory</div>
                <div style={{ fontSize: 14, color: COLORS.text }}>RAM</div>
              </div>
              
              <div style={{ fontSize: 20, color: '#ED8936' }}>⟷</div>
              
              {/* 容器 */}
              <div
                style={{
                  padding: '15px 20px',
                  background: 'rgba(237, 137, 54, 0.15)',
                  border: `2px solid #ED8936`,
                  borderRadius: 8,
                }}
              >
                <div style={{ fontSize: 12, color: COLORS.textMuted, marginBottom: 8 }}>Container</div>
                <div style={{ fontSize: 14, color: COLORS.text }}>/tmp</div>
              </div>
            </div>
          </div>
          
          {/* 说明 */}
          <div style={{ flex: 1, maxWidth: 320 }}>
            <div style={{ fontSize: 16, color: '#ED8936', fontWeight: 'bold', marginBottom: 12 }}>
              tmpfs 特点
            </div>
            <div style={{ fontSize: 13, color: COLORS.text, lineHeight: 1.8 }}>
              <div style={{ marginBottom: 8 }}>✓ 存储在主机内存中</div>
              <div style={{ marginBottom: 8 }}>✓ 容器停止数据消失</div>
              <div style={{ marginBottom: 8 }}>✓ 高性能临时存储</div>
              <div style={{ marginBottom: 8 }}>✓ 适合敏感数据缓存</div>
            </div>
            <div
              style={{
                marginTop: 15,
                padding: '10px 12px',
                background: 'rgba(237, 137, 54, 0.1)',
                borderRadius: 6,
                fontSize: 12,
                fontFamily: 'monospace',
                color: '#ED8936',
              }}
            >
              --tmpfs /tmp
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
            title="Docker Volume"
            lines={currentScene.lines}
            width={900}
            height={380}
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
        挂载类型
      </div>
    </AbsoluteFill>
  );
};
