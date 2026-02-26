import React from 'react';
import { 
  AbsoluteFill, 
  useCurrentFrame, 
  useVideoConfig, 
  interpolate,
  spring,
  Sequence 
} from 'remotion';
import { ThreeCanvas } from '@remotion/three';
import { 
  OrbitControls, 
  Sphere, 
  MeshDistortMaterial,
  Float,
  Text3D,
  Center,
  Environment
} from '@react-three/drei';
import * as THREE from 'three';

// 标题场景
const TitleScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const titleOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: 'clamp',
  });
  
  const titleY = interpolate(frame, [0, 30], [50, 0], {
    extrapolateRight: 'clamp',
    extrapolateLeft: 'clamp',
  });
  
  const subtitleOpacity = interpolate(frame, [30, 60], [0, 1], {
    extrapolateRight: 'clamp',
  });
  
  const glowIntensity = interpolate(
    frame,
    [0, 60, 90],
    [0, 1, 0.5],
    { extrapolateRight: 'clamp' }
  );

  return (
    <AbsoluteFill style={{ 
      background: 'linear-gradient(180deg, #0F172A 0%, #164E63 50%, #155E75 100%)',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    }}>
      <div style={{
        fontSize: 120,
        fontWeight: 'bold',
        color: '#4ade80',
        textShadow: `0 0 ${30 * glowIntensity}px rgba(74, 222, 128, 0.8)`,
        opacity: titleOpacity,
        transform: `translateY(${titleY}px)`,
      }}>
        光合作用
      </div>
      <div style={{
        fontSize: 60,
        color: '#22d3ee',
        marginTop: 20,
        opacity: subtitleOpacity,
        textShadow: '0 0 20px rgba(34, 211, 238, 0.5)',
      }}>
        Photosynthesis
      </div>
    </AbsoluteFill>
  );
};

// 化学方程式场景
const EquationScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width } = useVideoConfig();
  
  const progress = spring({
    frame,
    fps,
    config: {
      damping: 20,
      stiffness: 100,
      mass: 0.5,
    },
  });
  
  const characters = "6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂";
  const visibleChars = Math.floor(progress * characters.length);
  const displayText = characters.substring(0, visibleChars);
  
  const underlineWidth = interpolate(progress, [0, 1], [0, 1]);

  return (
    <AbsoluteFill style={{ 
      background: 'linear-gradient(180deg, #0F172A 0%, #164E63 50%, #155E75 100%)',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
    }}>
      <div style={{
        fontSize: 80,
        color: '#fbbf24',
        fontFamily: 'monospace',
        marginBottom: 40,
        textShadow: '0 0 20px rgba(251, 191, 36, 0.6)',
      }}>
        {displayText}
      </div>
      <div style={{
        width: `${underlineWidth * 800}px`,
        height: 4,
        background: 'linear-gradient(90deg, #10b981, #22d3ee)',
        boxShadow: '0 0 20px rgba(16, 185, 129, 0.8)',
      }} />
      <div style={{
        fontSize: 40,
        color: '#94a3b8',
        marginTop: 60,
        opacity: interpolate(frame, [30, 60], [0, 1], { extrapolateRight: 'clamp' }),
      }}>
        光照 + 叶绿体
      </div>
    </AbsoluteFill>
  );
};

// 叶绿体3D模型组件
const Chloroplast3D: React.FC<{ frame: number; width: number; height: number }> = ({ 
  frame, 
  width, 
  height 
}) => {
  const rotationY = frame * 0.01;
  const pulseIntensity = Math.sin(frame * 0.1) * 0.2 + 0.8;
  
  return (
    <ThreeCanvas width={width} height={height}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-5, -5, 5]} intensity={0.5} color="#22d3ee" />
      
      {/* 叶绿体外膜 */}
      <mesh rotation={[0, rotationY, 0]} scale={[1.5, 0.8, 1]}>
        <sphereGeometry args={[2, 32, 32]} />
        <MeshDistortMaterial
          color="#4ade80"
          transparent
          opacity={0.4}
          roughness={0.2}
          metalness={0.1}
          distort={0.1}
          speed={0.5}
        />
      </mesh>
      
      {/* 基粒（类囊体堆叠）*/}
      {[...Array(8)].map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 1.2;
        return (
          <group key={i}>
            {[...Array(5)].map((_, j) => (
              <mesh
                key={`${i}-${j}`}
                position={[
                  Math.cos(angle) * radius,
                  -0.4 + j * 0.2,
                  Math.sin(angle) * radius,
                ]}
                rotation={[Math.PI / 2, 0, 0]}
              >
                <cylinderGeometry args={[0.3, 0.3, 0.08, 16]} />
                <meshStandardMaterial
                  color="#22c55e"
                  transparent
                  opacity={0.8}
                  roughness={0.3}
                  metalness={0.2}
                />
              </mesh>
            ))}
          </group>
        );
      })}
      
      {/* 叶绿素分子 */}
      {[...Array(30)].map((_, i) => {
        const theta = (i / 30) * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        const r = 1.5 + Math.random() * 0.5;
        return (
          <Float key={i} speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh
              position={[
                r * Math.sin(phi) * Math.cos(theta),
                r * Math.cos(phi) * 0.5,
                r * Math.sin(phi) * Math.sin(theta),
              ]}
            >
              <sphereGeometry args={[0.06, 8, 8]} />
              <meshStandardMaterial
                color="#16a34a"
                emissive="#16a34a"
                emissiveIntensity={pulseIntensity * 0.5}
              />
            </mesh>
          </Float>
        );
      })}
      
      {/* 光子粒子 */}
      {[...Array(20)].map((_, i) => {
        const photonY = interpolate(
          frame,
          [i * 3, i * 3 + 60],
          [5, -3],
          { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
        );
        return (
          <mesh
            key={`photon-${i}`}
            position={[
              Math.sin(frame * 0.05 + i) * 2,
              photonY,
              Math.cos(frame * 0.05 + i) * 2,
            ]}
          >
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshBasicMaterial color="#ffff00" transparent opacity={0.9} />
          </mesh>
        );
      })}
      
      {/* 氧气气泡 */}
      {[...Array(10)].map((_, i) => {
        const o2Y = interpolate(
          frame,
          [i * 6, i * 6 + 90],
          [-2, 4],
          { extrapolateRight: 'clamp', extrapolateLeft: 'clamp' }
        );
        return (
          <Float key={`o2-${i}`} speed={1} floatIntensity={2}>
            <mesh
              position={[
                Math.sin(frame * 0.02 + i * 2) * 1.5,
                o2Y,
                Math.cos(frame * 0.02 + i * 2) * 1.5,
              ]}
            >
              <sphereGeometry args={[0.15, 16, 16]} />
              <meshStandardMaterial
                color="#60a5fa"
                transparent
                opacity={0.6}
                roughness={0.1}
              />
            </mesh>
          </Float>
        );
      })}
      
      <OrbitControls enableZoom={false} enablePan={false} />
    </ThreeCanvas>
  );
};

// 叶绿体3D场景
const ChloroplastScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();
  
  const labelOpacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ 
      background: 'linear-gradient(180deg, #0F172A 0%, #164E63 50%, #155E75 100%)',
    }}>
      <Chloroplast3D frame={frame} width={width} height={height} />
      
      {/* 标签 */}
      <div style={{
        position: 'absolute',
        top: 60,
        left: 60,
        fontSize: 50,
        color: '#4ade80',
        fontWeight: 'bold',
        textShadow: '0 0 20px rgba(74, 222, 128, 0.8)',
        opacity: labelOpacity,
      }}>
        叶绿体结构
      </div>
      
      <div style={{
        position: 'absolute',
        bottom: 60,
        right: 60,
        fontSize: 30,
        color: '#cbd5e1',
        opacity: labelOpacity,
        textAlign: 'right',
      }}>
        <div>外膜 · 基粒 · 叶绿素</div>
        <div style={{ color: '#22d3ee', marginTop: 10 }}>光合作用的场所</div>
      </div>
    </AbsoluteFill>
  );
};

// 分子动画场景
const MoleculesScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const phase = Math.floor(frame / 30);
  
  const co2Opacity = phase >= 0 ? 1 : 0;
  const h2oOpacity = phase >= 1 ? 1 : 0;
  const productsOpacity = phase >= 2 ? 1 : 0;
  
  const moleculeScale = spring({
    frame: frame % 30,
    fps,
    config: {
      damping: 15,
      stiffness: 200,
      mass: 0.5,
    },
  });

  return (
    <AbsoluteFill style={{ 
      background: 'linear-gradient(180deg, #0F172A 0%, #164E63 50%, #155E75 100%)',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 60,
      }}>
        {/* 反应物 */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 30,
        }}>
          {/* CO2 */}
          <div style={{
            opacity: co2Opacity,
            transform: `scale(${moleculeScale})`,
          }}>
            <div style={{
              width: 150,
              height: 80,
              borderRadius: 40,
              background: 'rgba(107, 114, 128, 0.3)',
              border: '3px solid #6b7280',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 36,
              color: '#f8fafc',
              fontWeight: 'bold',
            }}>
              CO₂
            </div>
            <div style={{
              textAlign: 'center',
              marginTop: 10,
              fontSize: 24,
              color: '#94a3b8',
            }}>
              二氧化碳
            </div>
          </div>
          
          {/* H2O */}
          <div style={{
            opacity: h2oOpacity,
            transform: `scale(${moleculeScale})`,
          }}>
            <div style={{
              width: 150,
              height: 80,
              borderRadius: 40,
              background: 'rgba(59, 130, 246, 0.3)',
              border: '3px solid #3b82f6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 36,
              color: '#f8fafc',
              fontWeight: 'bold',
            }}>
              H₂O
            </div>
            <div style={{
              textAlign: 'center',
              marginTop: 10,
              fontSize: 24,
              color: '#94a3b8',
            }}>
              水
            </div>
          </div>
        </div>
        
        {/* 箭头 */}
        <div style={{
          fontSize: 80,
          color: '#4ade80',
          opacity: productsOpacity,
        }}>
          →
        </div>
        
        {/* 产物 */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 30,
        }}>
          {/* Glucose */}
          <div style={{
            opacity: productsOpacity,
            transform: `scale(${moleculeScale})`,
          }}>
            <div style={{
              width: 150,
              height: 80,
              borderRadius: 40,
              background: 'rgba(251, 191, 36, 0.3)',
              border: '3px solid #fbbf24',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 28,
              color: '#f8fafc',
              fontWeight: 'bold',
            }}>
              C₆H₁₂O₆
            </div>
            <div style={{
              textAlign: 'center',
              marginTop: 10,
              fontSize: 24,
              color: '#94a3b8',
            }}>
              葡萄糖
            </div>
          </div>
          
          {/* O2 */}
          <div style={{
            opacity: productsOpacity,
            transform: `scale(${moleculeScale})`,
          }}>
            <div style={{
              width: 150,
              height: 80,
              borderRadius: 40,
              background: 'rgba(96, 165, 250, 0.3)',
              border: '3px solid #60a5fa',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 36,
              color: '#f8fafc',
              fontWeight: 'bold',
            }}>
              O₂
            </div>
            <div style={{
              textAlign: 'center',
              marginTop: 10,
              fontSize: 24,
              color: '#94a3b8',
            }}>
              氧气
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// 过程说明场景
const ProcessScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const steps = [
    { title: '光反应', desc: '光照 → ATP + NADPH + O₂', color: '#fbbf24' },
    { title: '暗反应', desc: 'CO₂ + ATP + NADPH → 葡萄糖', color: '#22d3ee' },
  ];
  
  return (
    <AbsoluteFill style={{ 
      background: 'linear-gradient(180deg, #0F172A 0%, #164E63 50%, #155E75 100%)',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 80,
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 60,
        width: '100%',
      }}>
        {steps.map((step, index) => {
          const opacity = interpolate(
            frame,
            [index * 30, index * 30 + 20],
            [0, 1],
            { extrapolateRight: 'clamp' }
          );
          
          const translateX = interpolate(
            frame,
            [index * 30, index * 30 + 20],
            [index === 0 ? -100 : 100, 0],
            { extrapolateRight: 'clamp' }
          );
          
          return (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 40,
                opacity,
                transform: `translateX(${translateX}px)`,
              }}
            >
              <div style={{
                width: 200,
                height: 200,
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${step.color}33, ${step.color}11)`,
                border: `3px solid ${step.color}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 60,
                color: step.color,
                fontWeight: 'bold',
                boxShadow: `0 0 40px ${step.color}66`,
              }}>
                {index + 1}
              </div>
              
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: 70,
                  color: step.color,
                  fontWeight: 'bold',
                  marginBottom: 20,
                  textShadow: `0 0 20px ${step.color}66`,
                }}>
                  {step.title}
                </div>
                <div style={{
                  fontSize: 40,
                  color: '#cbd5e1',
                  fontFamily: 'monospace',
                }}>
                  {step.desc}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// 总结场景
const SummaryScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  
  const opacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateRight: 'clamp',
  });
  
  const scale = spring({
    frame,
    fps,
    config: {
      damping: 15,
      stiffness: 100,
      mass: 0.5,
    },
  });

  return (
    <AbsoluteFill style={{ 
      background: 'linear-gradient(180deg, #0F172A 0%, #164E63 50%, #155E75 100%)',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Chloroplast3D frame={frame} width={width * 0.6} height={height * 0.6} />
      
      <div style={{
        position: 'absolute',
        textAlign: 'center',
        opacity,
        transform: `scale(${scale})`,
      }}>
        <div style={{
          fontSize: 80,
          color: '#4ade80',
          fontWeight: 'bold',
          textShadow: '0 0 30px rgba(74, 222, 128, 0.8)',
          marginBottom: 30,
        }}>
          光合作用的意义
        </div>
        <div style={{
          fontSize: 40,
          color: '#cbd5e1',
          maxWidth: 1200,
          lineHeight: 1.8,
        }}>
          提供氧气 · 食物链基础 · 调节气候
        </div>
        <div style={{
          marginTop: 60,
          fontSize: 30,
          color: '#22d3ee',
        }}>
          由 AetherViz Master 为你生成 ❤️
        </div>
      </div>
    </AbsoluteFill>
  );
};

// 主场景组件
export const PhotosynthesisScene: React.FC = () => {
  const { fps } = useVideoConfig();
  
  return (
    <AbsoluteFill>
      <Sequence from={0} durationInFrames={90}>
        <TitleScene />
      </Sequence>
      
      <Sequence from={90} durationInFrames={120}>
        <EquationScene />
      </Sequence>
      
      <Sequence from={210} durationInFrames={150}>
        <ChloroplastScene />
      </Sequence>
      
      <Sequence from={360} durationInFrames={150}>
        <MoleculesScene />
      </Sequence>
      
      <Sequence from={510} durationInFrames={120}>
        <ProcessScene />
      </Sequence>
      
      <Sequence from={630} durationInFrames={120}>
        <SummaryScene />
      </Sequence>
    </AbsoluteFill>
  );
};
