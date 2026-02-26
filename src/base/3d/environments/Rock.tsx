import { useMemo } from 'react';

type RockProps = {
  position?: [number, number, number];
  scale?: number;
  type?: 'small' | 'medium' | 'boulder' | 'crystal';
  rotation?: [number, number, number];
};

// 石头模型组件 - 多种类型随机形状
export const Rock = ({
  position = [0, 0, 0],
  scale = 1,
  type = 'medium',
  rotation = [0, 0, 0],
}: RockProps) => {
  // 随机种子用于生成随机形状
  const seed = useMemo(() => Math.random(), []);

  const rockContent = useMemo(() => {
    switch (type) {
      case 'small':
        return <SmallRock seed={seed} />;
      case 'medium':
        return <MediumRock seed={seed} />;
      case 'boulder':
        return <BoulderRock seed={seed} />;
      case 'crystal':
        return <Crystal />;
      default:
        return <MediumRock seed={seed} />;
    }
  }, [type, seed]);

  return (
    <group position={position} scale={scale} rotation={rotation}>
      {rockContent}
    </group>
  );
};

// 小石头
const SmallRock = ({ seed }: { seed: number }) => {
  const scaleX = 0.8 + seed * 0.4;
  const scaleY = 0.6 + (seed * 7 % 1) * 0.4;
  
  return (
    <mesh rotation={[seed * 0.3, seed * 0.5, seed * 0.2]}>
      <dodecahedronGeometry args={[0.15, 0]} />
      <meshStandardMaterial color="#6a6a6a" roughness={0.9} />
    </mesh>
  );
};

// 中等石头
const MediumRock = ({ seed }: { seed: number }) => {
  return (
    <group rotation={[seed * 0.2, seed * 0.4, seed * 0.1]}>
      {/* 主体 */}
      <mesh position={[0, 0.15, 0]}>
        <dodecahedronGeometry args={[0.3, 0]} />
        <meshStandardMaterial color="#5a5a5a" roughness={0.85} />
      </mesh>
      {/* 附加小块 */}
      <mesh position={[0.15, 0.08, 0.1]} scale={0.6}>
        <dodecahedronGeometry args={[0.15, 0]} />
        <meshStandardMaterial color="#4a4a4a" roughness={0.9} />
      </mesh>
    </group>
  );
};

// 巨石
const BoulderRock = ({ seed }: { seed: number }) => {
  return (
    <group rotation={[seed * 0.1, seed * 0.3, seed * 0.05]}>
      {/* 主体巨石 */}
      <mesh position={[0, 0.4, 0]}>
        <icosahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial color="#4a4a4a" roughness={0.9} />
      </mesh>
      {/* 底部扩展 */}
      <mesh position={[0.2, 0.15, 0.15]} scale={0.8}>
        <dodecahedronGeometry args={[0.3, 0]} />
        <meshStandardMaterial color="#3a3a3a" roughness={0.95} />
      </mesh>
      <mesh position={[-0.15, 0.2, -0.1]} scale={0.6}>
        <dodecahedronGeometry args={[0.25, 0]} />
        <meshStandardMaterial color="#5a5a5a" roughness={0.9} />
      </mesh>
      {/* 裂纹效果 - 用细长mesh模拟 */}
      <mesh position={[0.1, 0.5, 0.45]} rotation={[0.3, 0, 0.2]}>
        <boxGeometry args={[0.4, 0.02, 0.02]} />
        <meshStandardMaterial color="#2a2a2a" roughness={1} />
      </mesh>
    </group>
  );
};

// 水晶
const Crystal = () => {
  return (
    <group>
      {/* 主水晶 */}
      <mesh position={[0, 0.3, 0]}>
        <octahedronGeometry args={[0.2, 0]} />
        <meshStandardMaterial
          color="#88ccff"
          roughness={0.1}
          metalness={0.3}
          transparent
          opacity={0.8}
        />
      </mesh>
      {/* 周围小水晶 */}
      {[0.15, -0.15].map((x, i) => (
        <mesh key={i} position={[x, 0.15, (i % 2 === 0 ? 0.1 : -0.1)]} scale={0.5}>
          <octahedronGeometry args={[0.15, 0]} />
          <meshStandardMaterial
            color="#aaddff"
            roughness={0.1}
            metalness={0.2}
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}
    </group>
  );
};

// 石堆生成器
export const RockField = ({
  count = 15,
  areaSize = 15,
}: {
  count?: number;
  areaSize?: number;
}) => {
  const rocks = useMemo(() => {
    const result = [];
    const types: Array<'small' | 'medium' | 'boulder' | 'crystal'> = ['small', 'small', 'medium', 'boulder'];
    
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * areaSize;
      const z = (Math.random() - 0.5) * areaSize;
      const type = types[Math.floor(Math.random() * types.length)];
      const scale = 0.5 + Math.random() * 1;
      const rotation: [number, number, number] = [
        Math.random() * 0.3,
        Math.random() * Math.PI * 2,
        Math.random() * 0.3,
      ];
      
      result.push(
        <Rock
          key={i}
          position={[x, 0, z]}
          type={type}
          scale={scale}
          rotation={rotation}
        />
      );
    }
    return result;
  }, [count, areaSize]);

  return <group>{rocks}</group>;
};

// 碎石路
export const GravelPath = ({
  length = 5,
  width = 1,
  density = 20,
}: {
  length?: number;
  width?: number;
  density?: number;
}) => {
  const gravels = useMemo(() => {
    const result = [];
    
    for (let i = 0; i < density; i++) {
      const x = (Math.random() - 0.5) * width;
      const z = (Math.random() - 0.5) * length;
      const scale = 0.1 + Math.random() * 0.2;
      
      result.push(
        <mesh
          key={i}
          position={[x, 0.02, z]}
          rotation={[Math.random(), Math.random(), Math.random()]}
          scale={scale}
        >
          <dodecahedronGeometry args={[0.1, 0]} />
          <meshStandardMaterial color="#7a7a7a" roughness={0.95} />
        </mesh>
      );
    }
    return result;
  }, [length, width, density]);

  return <group>{gravels}</group>;
};
