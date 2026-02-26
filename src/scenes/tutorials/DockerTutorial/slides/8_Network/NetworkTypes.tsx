// 三种网络类型对比
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring } from 'remotion';
import { Terminal } from '../../components/Terminal';
import { COLORS, BACKGROUND } from '../../config';
import { listNetworks } from '../../config/terminal/networkConfig';

export const NetworkTypes: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = { fps: 30 };

  // 场景配置
  const scenes = [
    { name: 'overview', duration: 60, lines: null, title: 'Docker 网络概述' },
    { name: 'bridge', duration: 50, lines: null, title: 'Bridge 网络' },
    { name: 'host', duration: 45, lines: null, title: 'Host 网络' },
    { name: 'none', duration: 45, lines: null, title: 'None 网络' },
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

  // 网络类型卡片数据
  const networkTypes = [
    {
      name: 'bridge',
      color: COLORS.primary,
      description: '默认网络模式',
      features: ['容器间隔离', '端口映射', '自定义网络'],
      useCase: 'Web 应用、微服务',
    },
    {
      name: 'host',
      color: COLORS.accent,
      description: '共享主机网络',
      features: ['无网络隔离', '高性能', '直接使用主机端口'],
      useCase: '网络密集型应用',
    },
    {
      name: 'none',
      color: '#ED8936',
      description: '无网络',
      features: ['完全隔离', '无网络接口', '安全性最高'],
      useCase: '安全敏感任务',
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

      {/* 概述场景 - 三种网络类型总览 */}
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
          <div style={{ display: 'flex', gap: 30 }}>
            {networkTypes.map((type, index) => {
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
                    padding: '25px 30px',
                    background: `rgba(${type.name === 'bridge' ? '66, 153, 225' : type.name === 'host' ? '72, 187, 120' : '237, 137, 54'}, 0.15)`,
                    border: `2px solid ${type.color}`,
                    borderRadius: 12,
                    width: 220,
                    transform: `scale(${cardScale})`,
                    opacity: cardProgress,
                  }}
                >
                  <div style={{ fontSize: 28, fontWeight: 'bold', color: type.color, marginBottom: 8 }}>
                    {type.name}
                  </div>
                  <div style={{ fontSize: 14, color: COLORS.textMuted, marginBottom: 15 }}>
                    {type.description}
                  </div>
                  <div style={{ fontSize: 13, color: COLORS.text, lineHeight: 1.6 }}>
                    {type.features.map((f, i) => (
                      <div key={i}>• {f}</div>
                    ))}
                  </div>
                  <div style={{ 
                    fontSize: 12, 
                    color: COLORS.textMuted, 
                    marginTop: 15,
                    paddingTop: 10,
                    borderTop: '1px solid rgba(255,255,255,0.1)'
                  }}>
                    适用: {type.useCase}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Bridge 网络详解 */}
      {currentSceneIndex === 1 && (
        <div
          style={{
            position: 'absolute',
            top: 120,
            left: 60,
            right: 60,
            bottom: 80,
            display: 'flex',
            gap: 40,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: contentOpacity,
          }}
        >
          {/* 图示 */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontSize: 18, color: COLORS.textMuted, marginBottom: 20 }}>Bridge 网络架构</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              {/* 容器组 */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
                {['Container A', 'Container B'].map((name, i) => (
                  <div
                    key={name}
                    style={{
                      padding: '15px 25px',
                      background: 'rgba(66, 153, 225, 0.15)',
                      border: `2px solid ${COLORS.primary}`,
                      borderRadius: 8,
                      textAlign: 'center',
                    }}
                  >
                    <div style={{ fontSize: 14, color: COLORS.text }}>{name}</div>
                    <div style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 5 }}>172.17.0.{i + 2}</div>
                  </div>
                ))}
              </div>
              
              {/* Bridge */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ fontSize: 24, color: COLORS.accent }}>←→</div>
                <div
                  style={{
                    padding: '10px 20px',
                    background: 'rgba(72, 187, 120, 0.2)',
                    border: `2px solid ${COLORS.accent}`,
                    borderRadius: 6,
                    marginTop: 10,
                  }}
                >
                  <div style={{ fontSize: 14, color: COLORS.accent, fontWeight: 'bold' }}>docker0</div>
                  <div style={{ fontSize: 11, color: COLORS.textMuted }}>Bridge</div>
                </div>
              </div>
              
              {/* 主机 */}
              <div
                style={{
                  padding: '20px 30px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '2px solid rgba(255,255,255,0.2)',
                  borderRadius: 8,
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: 14, color: COLORS.text }}>Host</div>
                <div style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 5 }}>eth0</div>
              </div>
            </div>
          </div>
          
          {/* 说明 */}
          <div style={{ flex: 1, maxWidth: 350 }}>
            <div style={{ fontSize: 16, color: COLORS.primary, fontWeight: 'bold', marginBottom: 15 }}>
              Bridge 网络特点
            </div>
            <div style={{ fontSize: 14, color: COLORS.text, lineHeight: 1.8 }}>
              <div style={{ marginBottom: 10 }}>✓ 每个容器分配独立 IP</div>
              <div style={{ marginBottom: 10 }}>✓ 容器间通过 IP 通信</div>
              <div style={{ marginBottom: 10 }}>✓ 需要端口映射才能被外部访问</div>
              <div style={{ marginBottom: 10 }}>✓ 可创建自定义 bridge 网络</div>
            </div>
            <div
              style={{
                marginTop: 20,
                padding: '12px 15px',
                background: 'rgba(66, 153, 225, 0.1)',
                borderRadius: 6,
                fontSize: 13,
                fontFamily: 'monospace',
                color: COLORS.accent,
              }}
            >
              docker run --network bridge nginx
            </div>
          </div>
        </div>
      )}

      {/* Host 网络详解 */}
      {currentSceneIndex === 2 && (
        <div
          style={{
            position: 'absolute',
            top: 120,
            left: 60,
            right: 60,
            bottom: 80,
            display: 'flex',
            gap: 40,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: contentOpacity,
          }}
        >
          {/* 图示 */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontSize: 18, color: COLORS.textMuted, marginBottom: 20 }}>Host 网络架构</div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
              {/* 容器直接在主机上 */}
              <div
                style={{
                  padding: '15px 25px',
                  background: 'rgba(72, 187, 120, 0.15)',
                  border: `2px solid ${COLORS.accent}`,
                  borderRadius: 8,
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: 14, color: COLORS.text }}>Container</div>
                <div style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 5 }}>共享主机网络栈</div>
              </div>
              
              <div style={{ fontSize: 20, color: COLORS.accent }}>↕</div>
              
              {/* 主机 */}
              <div
                style={{
                  padding: '20px 40px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '2px solid rgba(255,255,255,0.2)',
                  borderRadius: 8,
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: 14, color: COLORS.text }}>Host Network Stack</div>
                <div style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 5 }}>直接使用主机端口</div>
              </div>
            </div>
          </div>
          
          {/* 说明 */}
          <div style={{ flex: 1, maxWidth: 350 }}>
            <div style={{ fontSize: 16, color: COLORS.accent, fontWeight: 'bold', marginBottom: 15 }}>
              Host 网络特点
            </div>
            <div style={{ fontSize: 14, color: COLORS.text, lineHeight: 1.8 }}>
              <div style={{ marginBottom: 10 }}>✓ 无网络隔离，直接使用主机网络</div>
              <div style={{ marginBottom: 10 }}>✓ 无需端口映射</div>
              <div style={{ marginBottom: 10 }}>✓ 网络性能最优</div>
              <div style={{ marginBottom: 10 }}>✓ 端口冲突风险</div>
            </div>
            <div
              style={{
                marginTop: 20,
                padding: '12px 15px',
                background: 'rgba(72, 187, 120, 0.1)',
                borderRadius: 6,
                fontSize: 13,
                fontFamily: 'monospace',
                color: COLORS.accent,
              }}
            >
              docker run --network host nginx
            </div>
          </div>
        </div>
      )}

      {/* None 网络详解 */}
      {currentSceneIndex === 3 && (
        <div
          style={{
            position: 'absolute',
            top: 120,
            left: 60,
            right: 60,
            bottom: 80,
            display: 'flex',
            gap: 40,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: contentOpacity,
          }}
        >
          {/* 图示 */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontSize: 18, color: COLORS.textMuted, marginBottom: 20 }}>None 网络架构</div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
              {/* 完全隔离的容器 */}
              <div
                style={{
                  padding: '20px 30px',
                  background: 'rgba(237, 137, 54, 0.15)',
                  border: `2px solid #ED8936`,
                  borderRadius: 8,
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: 14, color: COLORS.text }}>Container</div>
                <div style={{ fontSize: 12, color: COLORS.textMuted, marginTop: 5 }}>完全隔离</div>
              </div>
              
              <div style={{ 
                fontSize: 14, 
                color: COLORS.textMuted,
                padding: '10px 20px',
                border: '1px dashed rgba(255,255,255,0.2)',
                borderRadius: 4,
              }}>
                ✗ 无网络接口
              </div>
            </div>
          </div>
          
          {/* 说明 */}
          <div style={{ flex: 1, maxWidth: 350 }}>
            <div style={{ fontSize: 16, color: '#ED8936', fontWeight: 'bold', marginBottom: 15 }}>
              None 网络特点
            </div>
            <div style={{ fontSize: 14, color: COLORS.text, lineHeight: 1.8 }}>
              <div style={{ marginBottom: 10 }}>✓ 完全网络隔离</div>
              <div style={{ marginBottom: 10 }}>✓ 只有 loopback 接口</div>
              <div style={{ marginBottom: 10 }}>✓ 最大安全性</div>
              <div style={{ marginBottom: 10 }}>✓ 适用于安全敏感场景</div>
            </div>
            <div
              style={{
                marginTop: 20,
                padding: '12px 15px',
                background: 'rgba(237, 137, 54, 0.1)',
                borderRadius: 6,
                fontSize: 13,
                fontFamily: 'monospace',
                color: '#ED8936',
              }}
            >
              docker run --network none alpine
            </div>
          </div>
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
        网络类型
      </div>
    </AbsoluteFill>
  );
};
