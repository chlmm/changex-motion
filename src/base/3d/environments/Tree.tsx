import { useMemo } from 'react';

type TreeProps = {
  position?: [number, number, number];
  scale?: number;
  type?: 'pine' | 'oak' | 'bamboo' | 'cherry';
  frame?: number;
  fps?: number;
};

// 树木模型组件 - 支持多种类型
export const Tree = ({
  position = [0, 0, 0],
  scale = 1,
  type = 'pine',
  frame = 0,
  fps = 30,
}: TreeProps) => {
  // 风吹摆动
  const windSway = Math.sin(frame / fps * 2) * 0.02;

  const treeContent = useMemo(() => {
    switch (type) {
      case 'pine':
        return <PineTree windSway={windSway} />;
      case 'oak':
        return <OakTree windSway={windSway} />;
      case 'bamboo':
        return <Bamboo windSway={windSway} />;
      case 'cherry':
        return <CherryTree windSway={windSway} frame={frame} fps={fps} />;
      default:
        return <PineTree windSway={windSway} />;
    }
  }, [type, windSway, frame, fps]);

  return (
    <group position={position} scale={scale}>
      {treeContent}
    </group>
  );
};

// 松树 - 圆锥形树冠
const PineTree = ({ windSway }: { windSway: number }) => (
  <group rotation={[0, 0, windSway]}>
    {/* 树干 */}
    <mesh position={[0, 0.5, 0]}>
      <cylinderGeometry args={[0.08, 0.15, 1, 8]} />
      <meshStandardMaterial color="#4a3728" roughness={0.9} />
    </mesh>
    {/* 三层树冠 */}
    {[0.8, 1.3, 1.8].map((y, i) => (
      <mesh key={i} position={[0, y, 0]}>
        <coneGeometry args={[0.6 - i * 0.15, 0.8, 8]} />
        <meshStandardMaterial color="#1a4a1a" roughness={0.8} />
      </mesh>
    ))}
  </group>
);

// 橡树 - 圆形树冠
const OakTree = ({ windSway }: { windSway: number }) => (
  <group rotation={[0, 0, windSway]}>
    {/* 粗树干 */}
    <mesh position={[0, 0.6, 0]}>
      <cylinderGeometry args={[0.15, 0.25, 1.2, 8]} />
      <meshStandardMaterial color="#5a4030" roughness={0.9} />
    </mesh>
    {/* 圆形树冠 */}
    <mesh position={[0, 1.8, 0]}>
      <sphereGeometry args={[0.8, 12, 12]} />
      <meshStandardMaterial color="#2a6a2a" roughness={0.8} />
    </mesh>
    <mesh position={[0.3, 2, 0.2]}>
      <sphereGeometry args={[0.5, 10, 10]} />
      <meshStandardMaterial color="#2a7a2a" roughness={0.8} />
    </mesh>
    <mesh position={[-0.3, 1.9, -0.2]}>
      <sphereGeometry args={[0.4, 10, 10]} />
      <meshStandardMaterial color="#2a5a2a" roughness={0.8} />
    </mesh>
  </group>
);

// 竹子
const Bamboo = ({ windSway }: { windSway: number }) => (
  <group rotation={[0, 0, windSway * 2]}>
    {/* 竹竿 - 多节 */}
    {[0, 0.5, 1, 1.5, 2].map((y, i) => (
      <mesh key={i} position={[0, y + 0.25, 0]}>
        <cylinderGeometry args={[0.05, 0.06, 0.5, 8]} />
        <meshStandardMaterial color="#3a8a3a" roughness={0.6} />
      </mesh>
    ))}
    {/* 竹叶 */}
    {[1, 1.5, 2, 2.5].map((y, i) => (
      <mesh
        key={i}
        position={[(i % 2 === 0 ? 0.15 : -0.15), y, 0]}
        rotation={[0, 0, (i % 2 === 0 ? 0.5 : -0.5)]}
      >
        <coneGeometry args={[0.1, 0.4, 4]} />
        <meshStandardMaterial color="#4a9a4a" roughness={0.7} />
      </mesh>
    ))}
  </group>
);

// 樱花树
const CherryTree = ({ windSway, frame, fps }: { windSway: number; frame: number; fps: number }) => {
  // 花瓣飘落效果
  const petalOpacity = 0.8 + Math.sin(frame / fps * 3) * 0.1;
  
  return (
    <group rotation={[0, 0, windSway]}>
      {/* 树干 */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.1, 0.2, 1, 8]} />
        <meshStandardMaterial color="#4a3020" roughness={0.9} />
      </mesh>
      {/* 分支 */}
      <mesh position={[0.3, 0.8, 0]} rotation={[0, 0, 0.5]}>
        <cylinderGeometry args={[0.03, 0.05, 0.6, 6]} />
        <meshStandardMaterial color="#4a3020" roughness={0.9} />
      </mesh>
      <mesh position={[-0.3, 0.8, 0]} rotation={[0, 0, -0.5]}>
        <cylinderGeometry args={[0.03, 0.05, 0.6, 6]} />
        <meshStandardMaterial color="#4a3020" roughness={0.9} />
      </mesh>
      {/* 樱花树冠 */}
      <mesh position={[0, 1.4, 0]}>
        <sphereGeometry args={[0.7, 12, 12]} />
        <meshStandardMaterial color="#ffb7c5" roughness={0.7} transparent opacity={petalOpacity} />
      </mesh>
      <mesh position={[0.4, 1.2, 0.2]}>
        <sphereGeometry args={[0.4, 10, 10]} />
        <meshStandardMaterial color="#ffc0cb" roughness={0.7} transparent opacity={petalOpacity} />
      </mesh>
      <mesh position={[-0.4, 1.3, -0.2]}>
        <sphereGeometry args={[0.35, 10, 10]} />
        <meshStandardMaterial color="#ffaabb" roughness={0.7} transparent opacity={petalOpacity} />
      </mesh>
    </group>
  );
};

// 树林生成器
export const Forest = ({
  count = 10,
  areaSize = 20,
  frame = 0,
  fps = 30,
}: {
  count?: number;
  areaSize?: number;
  frame?: number;
  fps?: number;
}) => {
  const trees = useMemo(() => {
    const result = [];
    const types: Array<'pine' | 'oak' | 'bamboo' | 'cherry'> = ['pine', 'oak', 'bamboo', 'cherry'];
    
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * areaSize;
      const z = (Math.random() - 0.5) * areaSize;
      const type = types[Math.floor(Math.random() * types.length)];
      const scale = 0.8 + Math.random() * 0.6;
      
      result.push(
        <Tree
          key={i}
          position={[x, 0, z]}
          type={type}
          scale={scale}
          frame={frame}
          fps={fps}
        />
      );
    }
    return result;
  }, [count, areaSize, frame, fps]);

  return <group>{trees}</group>;
};
