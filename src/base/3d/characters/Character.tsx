import { useRef } from 'react';
import { Mesh } from 'three';

type CharacterProps = {
  position: [number, number, number];
  frame: number;
  fps: number;
  animation?: 'idle' | 'walk' | 'talk';
  scale?: number;
  color?: string;
};

// 简单的人物模型组件
export const Character = ({
  position,
  frame,
  fps,
  animation = 'idle',
  scale = 1,
  color = '#4a90d9',
}: CharacterProps) => {
  const groupRef = useRef<THREE.Group>(null);

  // 呼吸动画
  const breatheAmount = Math.sin(frame / fps * 2) * 0.02;
  
  // 动画状态
  const animations = {
    idle: {
      leftArm: Math.sin(frame / fps * 1.5) * 0.1,
      rightArm: Math.sin(frame / fps * 1.5 + Math.PI) * 0.1,
      leftLeg: 0,
      rightLeg: 0,
      headBob: Math.sin(frame / fps * 2) * 0.05,
    },
    walk: {
      leftArm: Math.sin(frame / fps * 8) * 0.5,
      rightArm: Math.sin(frame / fps * 8 + Math.PI) * 0.5,
      leftLeg: Math.sin(frame / fps * 8) * 0.4,
      rightLeg: Math.sin(frame / fps * 8 + Math.PI) * 0.4,
      headBob: Math.abs(Math.sin(frame / fps * 8)) * 0.05,
    },
    talk: {
      leftArm: Math.sin(frame / fps * 2) * 0.2,
      rightArm: Math.sin(frame / fps * 3) * 0.3,
      leftLeg: 0,
      rightLeg: 0,
      headBob: Math.sin(frame / fps * 4) * 0.1,
    },
  };

  const currentAnim = animations[animation];

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* 身体 */}
      <mesh position={[0, 0.9 + breatheAmount, 0]}>
        <capsuleGeometry args={[0.25, 0.8, 8, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>

      {/* 头部 */}
      <mesh
        position={[0, 1.7 + currentAnim.headBob, 0]}
        rotation={[currentAnim.headBob * 0.5, 0, 0]}
      >
        <sphereGeometry args={[0.28, 32, 32]} />
        <meshStandardMaterial color="#ffe4c4" />
      </mesh>

      {/* 眼睛 */}
      <mesh position={[-0.1, 1.75, 0.25]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      <mesh position={[0.1, 1.75, 0.25]}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshStandardMaterial color="#333" />
      </mesh>

      {/* 嘴巴 */}
      {animation === 'talk' && (
        <mesh position={[0, 1.58, 0.26]} rotation={[0.3, 0, 0]}>
          <boxGeometry args={[0.1, Math.abs(Math.sin(frame / fps * 10)) * 0.05 + 0.02, 0.02]} />
          <meshStandardMaterial color="#c44" />
        </mesh>
      )}

      {/* 头发 */}
      <mesh position={[0, 1.9, -0.05]}>
        <capsuleGeometry args={[0.3, 0.15, 8, 16]} />
        <meshStandardMaterial color="#3a2a1a" />
      </mesh>

      {/* 左臂 */}
      <mesh
        position={[-0.35, 0.9, 0]}
        rotation={[currentAnim.leftArm, 0, 0.2]}
      >
        <capsuleGeometry args={[0.08, 0.5, 8, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>

      {/* 右臂 */}
      <mesh
        position={[0.35, 0.9, 0]}
        rotation={[currentAnim.rightArm, 0, -0.2]}
      >
        <capsuleGeometry args={[0.08, 0.5, 8, 16]} />
        <meshStandardMaterial color={color} />
      </mesh>

      {/* 左腿 */}
      <mesh
        position={[-0.12, 0.25, 0]}
        rotation={[currentAnim.leftLeg, 0, 0]}
      >
        <capsuleGeometry args={[0.1, 0.5, 8, 16]} />
        <meshStandardMaterial color="#2a4a6a" />
      </mesh>

      {/* 右腿 */}
      <mesh
        position={[0.12, 0.25, 0]}
        rotation={[currentAnim.rightLeg, 0, 0]}
      >
        <capsuleGeometry args={[0.1, 0.5, 8, 16]} />
        <meshStandardMaterial color="#2a4a6a" />
      </mesh>
    </group>
  );
};

// 人物预设配置
export const CHARACTER_PRESETS = {
  hero: {
    color: '#4a90d9',
    scale: 1,
    description: '主角 - 蓝色服装',
  },
  heroine: {
    color: '#d94a7b',
    scale: 0.95,
    description: '女主 - 粉色服装',
  },
  villain: {
    color: '#2a2a2a',
    scale: 1.1,
    description: '反派 - 黑色服装',
  },
  npc: {
    color: '#7a7a7a',
    scale: 0.9,
    description: 'NPC - 灰色服装',
  },
} as const;
