import { useMemo } from 'react';

type CloudProps = {
  position?: [number, number, number];
  scale?: number;
  type?: 'fluffy' | 'thin' | 'storm' | 'sunset';
  frame?: number;
  fps?: number;
};

// 云朵模型组件 - 多种类型动态效果
export const Cloud = ({
  position = [0, 0, 0],
  scale = 1,
  type = 'fluffy',
  frame = 0,
  fps = 30,
}: CloudProps) => {
  // 云朵飘动
  const drift = Math.sin(frame / fps * 0.5) * 0.1;
  // 云朵形状变化
  const morph = 1 + Math.sin(frame / fps * 0.3) * 0.05;

  const cloudContent = useMemo(() => {
    switch (type) {
      case 'fluffy':
        return <FluffyCloud morph={morph} />;
      case 'thin':
        return <ThinCloud morph={morph} />;
      case 'storm':
        return <StormCloud morph={morph} />;
      case 'sunset':
        return <SunsetCloud morph={morph} frame={frame} fps={fps} />;
      default:
        return <FluffyCloud morph={morph} />;
    }
  }, [type, morph, frame, fps]);

  return (
    <group position={[position[0] + drift, position[1], position[2]]} scale={scale}>
      {cloudContent}
    </group>
  );
};

// 蓬松云朵 - 白色棉花糖
const FluffyCloud = ({ morph }: { morph: number }) => (
  <group>
    {/* 主体 */}
    <mesh position={[0, 0, 0]} scale={[1, morph, 1]}>
      <sphereGeometry args={[0.8, 16, 16]} />
      <meshStandardMaterial color="#ffffff" roughness={1} transparent opacity={0.9} />
    </mesh>
    {/* 左边球 */}
    <mesh position={[-0.6, -0.1, 0]} scale={[0.7, 0.7 * morph, 0.7]}>
      <sphereGeometry args={[0.6, 14, 14]} />
      <meshStandardMaterial color="#f8f8f8" roughness={1} transparent opacity={0.85} />
    </mesh>
    {/* 右边球 */}
    <mesh position={[0.6, 0, 0]} scale={[0.8, 0.8 * morph, 0.8]}>
      <sphereGeometry args={[0.55, 14, 14]} />
      <meshStandardMaterial color="#fafafa" roughness={1} transparent opacity={0.88} />
    </mesh>
    {/* 顶部球 */}
    <mesh position={[0.2, 0.4, 0.1]} scale={[0.6, 0.6 * morph, 0.6]}>
      <sphereGeometry args={[0.45, 12, 12]} />
      <meshStandardMaterial color="#ffffff" roughness={1} transparent opacity={0.9} />
    </mesh>
  </group>
);

// 纤细云朵 - 条状
const ThinCloud = ({ morph }: { morph: number }) => (
  <group>
    {/* 长条形云 */}
    <mesh position={[0, 0, 0]} scale={[2, 0.3 * morph, 0.5]}>
      <sphereGeometry args={[0.5, 12, 12]} />
      <meshStandardMaterial color="#f0f0f0" roughness={1} transparent opacity={0.7} />
    </mesh>
    {/* 额外层次 */}
    <mesh position={[-0.5, 0.05, 0.1]} scale={[1.5, 0.25 * morph, 0.4]}>
      <sphereGeometry args={[0.4, 10, 10]} />
      <meshStandardMaterial color="#f5f5f5" roughness={1} transparent opacity={0.6} />
    </mesh>
  </group>
);

// 风暴云朵 - 深色厚重
const StormCloud = ({ morph }: { morph: number }) => (
  <group>
    {/* 深色主体 */}
    <mesh position={[0, 0, 0]} scale={[1.2, morph, 1.2]}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial color="#4a4a5a" roughness={1} transparent opacity={0.95} />
    </mesh>
    {/* 多层堆叠 */}
    <mesh position={[-0.8, 0.2, 0]} scale={[0.9, 0.9 * morph, 0.9]}>
      <sphereGeometry args={[0.8, 14, 14]} />
      <meshStandardMaterial color="#3a3a4a" roughness={1} transparent opacity={0.9} />
    </mesh>
    <mesh position={[0.8, 0.15, 0.2]} scale={[0.85, 0.85 * morph, 0.85]}>
      <sphereGeometry args={[0.75, 14, 14]} />
      <meshStandardMaterial color="#3a3a4a" roughness={1} transparent opacity={0.92} />
    </mesh>
    <mesh position={[0, 0.5, -0.1]} scale={[0.7, 0.7 * morph, 0.7]}>
      <sphereGeometry args={[0.6, 12, 12]} />
      <meshStandardMaterial color="#4a4a5a" roughness={1} transparent opacity={0.88} />
    </mesh>
  </group>
);

// 日落云朵 - 橙红色
const SunsetCloud = ({ morph, frame, fps }: { morph: number; frame: number; fps: number }) => {
  // 颜色渐变动画
  const colorShift = Math.sin(frame / fps * 0.2) * 0.2;
  
  return (
    <group>
      {/* 橙色主体 */}
      <mesh position={[0, 0, 0]} scale={[1, morph, 1]}>
        <sphereGeometry args={[0.9, 16, 16]} />
        <meshStandardMaterial 
          color={`rgb(${255}, ${150 + colorShift * 100}, ${100 + colorShift * 50})`} 
          roughness={1} 
          transparent 
          opacity={0.9} 
        />
      </mesh>
      {/* 粉色部分 */}
      <mesh position={[-0.7, -0.1, 0]} scale={[0.75, 0.75 * morph, 0.75]}>
        <sphereGeometry args={[0.6, 14, 14]} />
        <meshStandardMaterial 
          color={`rgb(${255}, ${180 + colorShift * 80}, ${150 + colorShift * 40})`} 
          roughness={1} 
          transparent 
          opacity={0.85} 
        />
      </mesh>
      <mesh position={[0.7, 0.1, 0]} scale={[0.8, 0.8 * morph, 0.8]}>
        <sphereGeometry args={[0.55, 14, 14]} />
        <meshStandardMaterial 
          color={`rgb(${255}, ${130 + colorShift * 90}, ${80 + colorShift * 60})`} 
          roughness={1} 
          transparent 
          opacity={0.88} 
        />
      </mesh>
    </group>
  );
};

// 天空云层生成器
export const SkyClouds = ({
  count = 8,
  skyRadius = 30,
  height = 10,
  frame = 0,
  fps = 30,
}: {
  count?: number;
  skyRadius?: number;
  height?: number;
  frame?: number;
  fps?: number;
}) => {
  const clouds = useMemo(() => {
    const result = [];
    const types: Array<'fluffy' | 'thin' | 'storm' | 'sunset'> = ['fluffy', 'fluffy', 'thin'];
    
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = skyRadius * (0.5 + Math.random() * 0.5);
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = height + (Math.random() - 0.5) * 3;
      const type = types[Math.floor(Math.random() * types.length)];
      const scale = 0.8 + Math.random() * 0.8;
      
      result.push(
        <Cloud
          key={i}
          position={[x, y, z]}
          type={type}
          scale={scale}
          frame={frame}
          fps={fps}
        />
      );
    }
    return result;
  }, [count, skyRadius, height, frame, fps]);

  return <group>{clouds}</group>;
};
