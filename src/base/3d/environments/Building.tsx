import { useMemo } from 'react';

type BuildingProps = {
  position?: [number, number, number];
  scale?: number;
  type?: 'house' | 'tower' | 'wall' | 'gate' | 'temple';
  frame?: number;
  fps?: number;
  color?: string;
};

// 建筑模型组件 - 多种类型
export const Building = ({
  position = [0, 0, 0],
  scale = 1,
  type = 'house',
  frame = 0,
  fps = 30,
  color = '#8B7355',
}: BuildingProps) => {
  const buildingContent = useMemo(() => {
    switch (type) {
      case 'house':
        return <House color={color} />;
      case 'tower':
        return <Tower color={color} />;
      case 'wall':
        return <Wall />;
      case 'gate':
        return <Gate frame={frame} fps={fps} />;
      case 'temple':
        return <Temple />;
      default:
        return <House color={color} />;
    }
  }, [type, color, frame, fps]);

  return (
    <group position={position} scale={scale}>
      {buildingContent}
    </group>
  );
};

// 简单房屋
const House = ({ color }: { color: string }) => (
  <group>
    {/* 地基 */}
    <mesh position={[0, 0.1, 0]}>
      <boxGeometry args={[2, 0.2, 2]} />
      <meshStandardMaterial color="#555" roughness={0.9} />
    </mesh>
    {/* 墙壁 */}
    <mesh position={[0, 0.9, 0]}>
      <boxGeometry args={[1.8, 1.4, 1.8]} />
      <meshStandardMaterial color={color} roughness={0.85} />
    </mesh>
    {/* 屋顶 */}
    <mesh position={[0, 1.9, 0]} rotation={[0, Math.PI / 4, 0]}>
      <coneGeometry args={[1.6, 0.8, 4]} />
      <meshStandardMaterial color="#8B4513" roughness={0.9} />
    </mesh>
    {/* 门 */}
    <mesh position={[0, 0.5, 0.91]}>
      <boxGeometry args={[0.4, 0.8, 0.05]} />
      <meshStandardMaterial color="#4a3020" roughness={0.95} />
    </mesh>
    {/* 窗户 */}
    <mesh position={[-0.5, 0.9, 0.91]}>
      <boxGeometry args={[0.3, 0.3, 0.05]} />
      <meshStandardMaterial color="#87CEEB" roughness={0.3} metalness={0.1} />
    </mesh>
    <mesh position={[0.5, 0.9, 0.91]}>
      <boxGeometry args={[0.3, 0.3, 0.05]} />
      <meshStandardMaterial color="#87CEEB" roughness={0.3} metalness={0.1} />
    </mesh>
  </group>
);

// 塔楼
const Tower = ({ color }: { color: string }) => (
  <group>
    {/* 基座 */}
    <mesh position={[0, 0.3, 0]}>
      <cylinderGeometry args={[1.2, 1.4, 0.6, 8]} />
      <meshStandardMaterial color="#666" roughness={0.9} />
    </mesh>
    {/* 塔身 */}
    <mesh position={[0, 1.8, 0]}>
      <cylinderGeometry args={[0.8, 1, 2.4, 8]} />
      <meshStandardMaterial color={color} roughness={0.85} />
    </mesh>
    {/* 塔顶平台 */}
    <mesh position={[0, 3.1, 0]}>
      <cylinderGeometry args={[1, 0.9, 0.2, 8]} />
      <meshStandardMaterial color="#555" roughness={0.9} />
    </mesh>
    {/* 塔尖 */}
    <mesh position={[0, 3.8, 0]}>
      <coneGeometry args={[0.7, 1.2, 8]} />
      <meshStandardMaterial color="#8B4513" roughness={0.9} />
    </mesh>
    {/* 窗户 */}
    {[0, Math.PI / 2, Math.PI, Math.PI * 1.5].map((angle, i) => (
      <mesh
        key={i}
        position={[Math.sin(angle) * 0.82, 1.8, Math.cos(angle) * 0.82]}
        rotation={[0, angle, 0]}
      >
        <boxGeometry args={[0.2, 0.5, 0.05]} />
        <meshStandardMaterial color="#333" roughness={0.9} />
      </mesh>
    ))}
  </group>
);

// 城墙段
const Wall = () => (
  <group>
    {/* 墙体 */}
    <mesh position={[0, 1, 0]}>
      <boxGeometry args={[3, 2, 0.4]} />
      <meshStandardMaterial color="#8B7355" roughness={0.9} />
    </mesh>
    {/* 城垛 */}
    {[-1.2, -0.4, 0.4, 1.2].map((x, i) => (
      <mesh key={i} position={[x, 2.2, 0]}>
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshStandardMaterial color="#8B7355" roughness={0.9} />
      </mesh>
    ))}
    {/* 石基 */}
    <mesh position={[0, 0.1, 0]}>
      <boxGeometry args={[3.2, 0.2, 0.6]} />
      <meshStandardMaterial color="#555" roughness={0.95} />
    </mesh>
  </group>
);

// 城门
const Gate = ({ frame, fps }: { frame: number; fps: number }) => {
  // 门开启动画
  const gateOpen = Math.min(1, frame / (fps * 2));
  const leftGateRotation = gateOpen * Math.PI * 0.4;
  const rightGateRotation = -gateOpen * Math.PI * 0.4;
  
  return (
    <group>
      {/* 左柱 */}
      <mesh position={[-1.2, 1.5, 0]}>
        <boxGeometry args={[0.4, 3, 0.4]} />
        <meshStandardMaterial color="#666" roughness={0.9} />
      </mesh>
      {/* 右柱 */}
      <mesh position={[1.2, 1.5, 0]}>
        <boxGeometry args={[0.4, 3, 0.4]} />
        <meshStandardMaterial color="#666" roughness={0.9} />
      </mesh>
      {/* 横梁 */}
      <mesh position={[0, 3.2, 0]}>
        <boxGeometry args={[2.8, 0.4, 0.4]} />
        <meshStandardMaterial color="#555" roughness={0.9} />
      </mesh>
      {/* 左门 */}
      <mesh
        position={[-0.5, 1.2, 0.2]}
        rotation={[0, leftGateRotation, 0]}
      >
        <boxGeometry args={[1, 2.2, 0.1]} />
        <meshStandardMaterial color="#4a3020" roughness={0.95} />
      </mesh>
      {/* 右门 */}
      <mesh
        position={[0.5, 1.2, 0.2]}
        rotation={[0, rightGateRotation, 0]}
      >
        <boxGeometry args={[1, 2.2, 0.1]} />
        <meshStandardMaterial color="#4a3020" roughness={0.95} />
      </mesh>
      {/* 门上装饰 */}
      <mesh position={[0, 2.8, 0.2]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#FFD700" roughness={0.3} metalness={0.6} />
      </mesh>
    </group>
  );
};

// 寺庙
const Temple = () => (
  <group>
    {/* 台阶 */}
    {[0, 1, 2].map((step) => (
      <mesh key={step} position={[0, 0.15 + step * 0.15, -1 + step * 0.5]}>
        <boxGeometry args={[4 - step * 0.3, 0.3, 2 - step * 0.1]} />
        <meshStandardMaterial color="#888" roughness={0.9} />
      </mesh>
    ))}
    {/* 柱子 */}
    {[-1.5, -0.5, 0.5, 1.5].map((x, i) => (
      <mesh key={i} position={[x, 1.5, 0]}>
        <cylinderGeometry args={[0.15, 0.2, 2, 12]} />
        <meshStandardMaterial color="#c41e3a" roughness={0.7} />
      </mesh>
    ))}
    {/* 横梁 */}
    <mesh position={[0, 2.6, 0]}>
      <boxGeometry args={[4, 0.3, 0.4]} />
      <meshStandardMaterial color="#8B4513" roughness={0.9} />
    </mesh>
    {/* 屋顶 */}
    <mesh position={[0, 3.2, 0]} rotation={[0, Math.PI / 4, 0]}>
      <coneGeometry args={[3, 1, 4]} />
      <meshStandardMaterial color="#2a5a2a" roughness={0.85} />
    </mesh>
    {/* 屋檐 */}
    <mesh position={[0, 2.7, 0]}>
      <boxGeometry args={[4.5, 0.1, 3.5]} />
      <meshStandardMaterial color="#2a5a2a" roughness={0.85} />
    </mesh>
  </group>
);

// 村庄生成器
export const Village = ({
  houseCount = 5,
  radius = 8,
  frame = 0,
  fps = 30,
}: {
  houseCount?: number;
  radius?: number;
  frame?: number;
  fps?: number;
}) => {
  const buildings = useMemo(() => {
    const result = [];
    const colors = ['#8B7355', '#A0522D', '#6B4423', '#8B6914'];
    
    for (let i = 0; i < houseCount; i++) {
      const angle = (i / houseCount) * Math.PI * 2;
      const r = radius * (0.6 + Math.random() * 0.4);
      const x = Math.cos(angle) * r;
      const z = Math.sin(angle) * r;
      const scale = 0.6 + Math.random() * 0.5;
      const color = colors[Math.floor(Math.random() * colors.length)];
      
      result.push(
        <Building
          key={i}
          position={[x, 0, z]}
          type="house"
          scale={scale}
          color={color}
          frame={frame}
          fps={fps}
        />
      );
    }
    return result;
  }, [houseCount, radius, frame, fps]);

  return <group>{buildings}</group>;
};
