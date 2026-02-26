import { useMemo } from 'react';

type NPCProps = {
  position?: [number, number, number];
  scale?: number;
  type?: 'villager' | 'guard' | 'merchant' | 'child' | 'elder';
  frame?: number;
  fps?: number;
  action?: 'idle' | 'walk' | 'talk';
};

// 背景NPC组件 - 低多边形风格
export const NPC = ({
  position = [0, 0, 0],
  scale = 1,
  type = 'villager',
  frame = 0,
  fps = 30,
  action = 'idle',
}: NPCProps) => {
  // 随机种子
  const seed = useMemo(() => Math.random(), []);
  
  // 基础动画
  const breathe = Math.sin(frame / fps * 2) * 0.01;
  const sway = Math.sin(frame / fps * 1.5 + seed * 10) * 0.02;

  const npcContent = useMemo(() => {
    switch (type) {
      case 'villager':
        return <Villager breathe={breathe} sway={sway} action={action} frame={frame} fps={fps} seed={seed} />;
      case 'guard':
        return <Guard breathe={breathe} action={action} frame={frame} fps={fps} />;
      case 'merchant':
        return <Merchant breathe={breathe} sway={sway} frame={frame} fps={fps} />;
      case 'child':
        return <Child breathe={breathe} action={action} frame={frame} fps={fps} />;
      case 'elder':
        return <Elder breathe={breathe} frame={frame} fps={fps} />;
      default:
        return <Villager breathe={breathe} sway={sway} action={action} frame={frame} fps={fps} seed={seed} />;
    }
  }, [type, breathe, sway, action, frame, fps, seed]);

  return (
    <group position={position} scale={scale}>
      {npcContent}
    </group>
  );
};

// 村民 - 简单造型
const Villager = ({
  breathe,
  sway,
  action,
  frame,
  fps,
  seed,
}: {
  breathe: number;
  sway: number;
  action: string;
  frame: number;
  fps: number;
  seed: number;
}) => {
  // 行走动画
  const walkCycle = action === 'walk' ? Math.sin(frame / fps * 6) : 0;
  // 颜色变化
  const shirtColor = ['#4a6a8a', '#6a4a8a', '#8a6a4a', '#4a8a6a'][Math.floor(seed * 4)];
  
  return (
    <group rotation={[0, sway, 0]}>
      {/* 身体 */}
      <mesh position={[0, 0.6 + breathe, 0]}>
        <boxGeometry args={[0.35, 0.6, 0.2]} />
        <meshStandardMaterial color={shirtColor} roughness={0.8} />
      </mesh>
      {/* 头 */}
      <mesh position={[0, 1.05, 0]}>
        <boxGeometry args={[0.25, 0.25, 0.25]} />
        <meshStandardMaterial color="#e0c8a8" roughness={0.8} />
      </mesh>
      {/* 腿 */}
      <mesh position={[-0.08, 0.15, walkCycle * 0.05]}>
        <boxGeometry args={[0.12, 0.3, 0.12]} />
        <meshStandardMaterial color="#4a3a2a" roughness={0.9} />
      </mesh>
      <mesh position={[0.08, 0.15, -walkCycle * 0.05]}>
        <boxGeometry args={[0.12, 0.3, 0.12]} />
        <meshStandardMaterial color="#4a3a2a" roughness={0.9} />
      </mesh>
      {/* 手臂 */}
      <mesh position={[-0.25, 0.6, walkCycle * 0.1]} rotation={[walkCycle * 0.3, 0, 0]}>
        <boxGeometry args={[0.08, 0.35, 0.08]} />
        <meshStandardMaterial color={shirtColor} roughness={0.8} />
      </mesh>
      <mesh position={[0.25, 0.6, -walkCycle * 0.1]} rotation={[-walkCycle * 0.3, 0, 0]}>
        <boxGeometry args={[0.08, 0.35, 0.08]} />
        <meshStandardMaterial color={shirtColor} roughness={0.8} />
      </mesh>
    </group>
  );
};

// 守卫 - 持武器
const Guard = ({
  breathe,
  action,
  frame,
  fps,
}: {
  breathe: number;
  action: string;
  frame: number;
  fps: number;
}) => {
  const alert = action === 'idle' ? Math.sin(frame / fps * 0.5) * 0.1 : 0;
  
  return (
    <group rotation={[0, alert, 0]}>
      {/* 身体盔甲 */}
      <mesh position={[0, 0.65 + breathe, 0]}>
        <boxGeometry args={[0.4, 0.7, 0.25]} />
        <meshStandardMaterial color="#555" roughness={0.7} metalness={0.3} />
      </mesh>
      {/* 头盔 */}
      <mesh position={[0, 1.15, 0]}>
        <boxGeometry args={[0.28, 0.28, 0.28]} />
        <meshStandardMaterial color="#444" roughness={0.6} metalness={0.4} />
      </mesh>
      {/* 头盔顶部 */}
      <mesh position={[0, 1.35, 0]}>
        <coneGeometry args={[0.08, 0.15, 4]} />
        <meshStandardMaterial color="#444" roughness={0.6} metalness={0.4} />
      </mesh>
      {/* 腿 */}
      <mesh position={[-0.1, 0.15, 0]}>
        <boxGeometry args={[0.14, 0.3, 0.14]} />
        <meshStandardMaterial color="#444" roughness={0.8} />
      </mesh>
      <mesh position={[0.1, 0.15, 0]}>
        <boxGeometry args={[0.14, 0.3, 0.14]} />
        <meshStandardMaterial color="#444" roughness={0.8} />
      </mesh>
      {/* 长矛 */}
      <mesh position={[0.35, 0.8, 0]} rotation={[0, 0, 0.1]}>
        <cylinderGeometry args={[0.02, 0.02, 1.2, 6]} />
        <meshStandardMaterial color="#5a4a3a" roughness={0.8} />
      </mesh>
      <mesh position={[0.35, 1.5, 0]} rotation={[0, 0, 0.1]}>
        <coneGeometry args={[0.05, 0.15, 6]} />
        <meshStandardMaterial color="#888" roughness={0.5} metalness={0.5} />
      </mesh>
    </group>
  );
};

// 商人 - 有背包
const Merchant = ({
  breathe,
  sway,
  frame,
  fps,
}: {
  breathe: number;
  sway: number;
  frame: number;
  fps: number;
}) => {
  const bobHead = Math.sin(frame / fps * 3) * 0.03;
  
  return (
    <group rotation={[0, sway, 0]}>
      {/* 身体 */}
      <mesh position={[0, 0.6 + breathe, 0]}>
        <boxGeometry args={[0.35, 0.55, 0.2]} />
        <meshStandardMaterial color="#8B4513" roughness={0.85} />
      </mesh>
      {/* 背包 */}
      <mesh position={[0, 0.7, -0.2]}>
        <boxGeometry args={[0.3, 0.35, 0.15]} />
        <meshStandardMaterial color="#6B4423" roughness={0.9} />
      </mesh>
      {/* 头 */}
      <mesh position={[0, 1.05 + bobHead, 0]}>
        <boxGeometry args={[0.25, 0.25, 0.25]} />
        <meshStandardMaterial color="#e0c8a8" roughness={0.8} />
      </mesh>
      {/* 帽子 */}
      <mesh position={[0, 1.25, 0]}>
        <cylinderGeometry args={[0.18, 0.15, 0.15, 8]} />
        <meshStandardMaterial color="#4a3020" roughness={0.9} />
      </mesh>
      {/* 腿 */}
      <mesh position={[-0.08, 0.15, 0]}>
        <boxGeometry args={[0.1, 0.3, 0.1]} />
        <meshStandardMaterial color="#4a3a2a" roughness={0.9} />
      </mesh>
      <mesh position={[0.08, 0.15, 0]}>
        <boxGeometry args={[0.1, 0.3, 0.1]} />
        <meshStandardMaterial color="#4a3a2a" roughness={0.9} />
      </mesh>
    </group>
  );
};

// 儿童 - 小个子活泼
const Child = ({
  breathe,
  action,
  frame,
  fps,
}: {
  breathe: number;
  action: string;
  frame: number;
  fps: number;
}) => {
  const bounce = action === 'walk' ? Math.abs(Math.sin(frame / fps * 8)) * 0.1 : 0;
  const jump = action === 'idle' ? Math.abs(Math.sin(frame / fps * 2)) * 0.05 : 0;
  
  return (
    <group position={[0, jump, 0]}>
      {/* 身体 */}
      <mesh position={[0, 0.35 + breathe + bounce, 0]}>
        <boxGeometry args={[0.25, 0.35, 0.18]} />
        <meshStandardMaterial color="#ff9966" roughness={0.8} />
      </mesh>
      {/* 头 */}
      <mesh position={[0, 0.65, 0]}>
        <boxGeometry args={[0.22, 0.22, 0.22]} />
        <meshStandardMaterial color="#e0c8a8" roughness={0.8} />
      </mesh>
      {/* 腿 */}
      <mesh position={[-0.06, 0.1, 0]}>
        <boxGeometry args={[0.08, 0.18, 0.08]} />
        <meshStandardMaterial color="#4a6a8a" roughness={0.9} />
      </mesh>
      <mesh position={[0.06, 0.1, 0]}>
        <boxGeometry args={[0.08, 0.18, 0.08]} />
        <meshStandardMaterial color="#4a6a8a" roughness={0.9} />
      </mesh>
    </group>
  );
};

// 长者 - 弯腰拄拐
const Elder = ({
  breathe,
  frame,
  fps,
}: {
  breathe: number;
  frame: number;
  fps: number;
}) => {
  const tremble = Math.sin(frame / fps * 5) * 0.005;
  
  return (
    <group rotation={[0.1, 0, tremble]}>
      {/* 身体 */}
      <mesh position={[0, 0.55 + breathe, 0]} rotation={[0.15, 0, 0]}>
        <boxGeometry args={[0.32, 0.5, 0.2]} />
        <meshStandardMaterial color="#6a6a6a" roughness={0.85} />
      </mesh>
      {/* 头 */}
      <mesh position={[0, 0.9, 0.05]}>
        <boxGeometry args={[0.24, 0.24, 0.24]} />
        <meshStandardMaterial color="#d8c0a0" roughness={0.8} />
      </mesh>
      {/* 白发 */}
      <mesh position={[0, 0.95, 0]}>
        <boxGeometry args={[0.26, 0.1, 0.26]} />
        <meshStandardMaterial color="#ddd" roughness={0.9} />
      </mesh>
      {/* 腿 */}
      <mesh position={[-0.07, 0.12, 0]}>
        <boxGeometry args={[0.1, 0.25, 0.1]} />
        <meshStandardMaterial color="#4a4a4a" roughness={0.9} />
      </mesh>
      <mesh position={[0.07, 0.12, 0]}>
        <boxGeometry args={[0.1, 0.25, 0.1]} />
        <meshStandardMaterial color="#4a4a4a" roughness={0.9} />
      </mesh>
      {/* 拐杖 */}
      <mesh position={[0.35, 0.5, 0]} rotation={[0.3, 0, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.9, 6]} />
        <meshStandardMaterial color="#5a4a3a" roughness={0.8} />
      </mesh>
      <mesh position={[0.35, 0.95, 0.1]} rotation={[0.3, 0, 0]}>
        <torusGeometry args={[0.05, 0.015, 6, 12, Math.PI]} />
        <meshStandardMaterial color="#5a4a3a" roughness={0.8} />
      </mesh>
    </group>
  );
};

// NPC群体生成器
export const NPCCrowd = ({
  count = 10,
  areaSize = 10,
  frame = 0,
  fps = 30,
}: {
  count?: number;
  areaSize?: number;
  frame?: number;
  fps?: number;
}) => {
  const npcs = useMemo(() => {
    const result = [];
    const types: Array<'villager' | 'guard' | 'merchant' | 'child' | 'elder'> = [
      'villager', 'villager', 'villager', 'child', 'elder', 'merchant'
    ];
    const actions: Array<'idle' | 'walk' | 'talk'> = ['idle', 'walk', 'talk'];
    
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * areaSize;
      const z = (Math.random() - 0.5) * areaSize;
      const type = types[Math.floor(Math.random() * types.length)];
      const action = actions[Math.floor(Math.random() * actions.length)];
      const scale = 0.8 + Math.random() * 0.3;
      
      result.push(
        <NPC
          key={i}
          position={[x, 0, z]}
          type={type}
          action={action}
          scale={scale}
          frame={frame}
          fps={fps}
        />
      );
    }
    return result;
  }, [count, areaSize, frame, fps]);

  return <group>{npcs}</group>;
};
