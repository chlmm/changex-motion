// 粒子特效组件
import { useRef } from 'react';
import { Points } from 'three';

type ParticleEffectProps = {
  count?: number;
  color?: string;
  size?: number;
  spread?: number;
};

// 粒子特效
export const ParticleEffect = ({
  count = 100,
  color = '#ffffff',
  size = 0.05,
  spread = 5,
}: ParticleEffectProps) => {
  // 生成随机粒子位置
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * spread;
    positions[i + 1] = Math.random() * spread;
    positions[i + 2] = (Math.random() - 0.5) * spread;
  }

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={size} color={color} transparent opacity={0.8} />
    </points>
  );
};

// 魔法光环特效
export const MagicRing = ({
  position = [0, 0, 0],
  frame,
  fps,
  radius = 1,
  color = '#00ffff',
}: {
  position?: [number, number, number];
  frame: number;
  fps: number;
  radius?: number;
  color?: string;
}) => {
  const rotation = frame / fps;

  return (
    <group position={position}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.02, 16, 100]} />
        <meshBasicMaterial color={color} transparent opacity={0.8} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, rotation]}>
        <torusGeometry args={[radius * 0.8, 0.015, 16, 100]} />
        <meshBasicMaterial color={color} transparent opacity={0.6} />
      </mesh>
    </group>
  );
};

// 能量球特效
export const EnergyBall = ({
  position = [0, 1, 0],
  frame,
  fps,
  color = '#ff00ff',
}: {
  position?: [number, number, number];
  frame: number;
  fps: number;
  color?: string;
}) => {
  const scale = 1 + Math.sin(frame / fps * 5) * 0.2;
  const intensity = 0.5 + Math.sin(frame / fps * 3) * 0.3;

  return (
    <group position={position} scale={scale}>
      <mesh>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.8} />
      </mesh>
      <pointLight color={color} intensity={intensity} distance={3} />
    </group>
  );
};

// 闪烁星星特效
export const Sparkle = ({
  position,
  frame,
  fps,
  duration = 30,
}: {
  position: [number, number, number];
  frame: number;
  fps: number;
  duration?: number;
}) => {
  const progress = (frame % (duration * fps)) / (duration * fps);
  const scale = Math.sin(progress * Math.PI);
  const opacity = scale;

  if (scale < 0.1) return null;

  return (
    <mesh position={position} scale={scale * 0.1}>
      <octahedronGeometry args={[1, 0]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={opacity} />
    </mesh>
  );
};
