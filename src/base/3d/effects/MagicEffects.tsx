import { useMemo } from 'react';

// ==================== 基础特效 ====================

// 粒子爆发
type ParticleBurstProps = {
  position?: [number, number, number];
  frame: number;
  fps: number;
  color?: string;
  count?: number;
  duration?: number;
};

export const ParticleBurst = ({
  position = [0, 0, 0],
  frame,
  fps,
  color = '#ff6600',
  count = 50,
  duration = 60,
}: ParticleBurstProps) => {
  const progress = (frame % (duration * fps)) / (duration * fps);
  
  // 生成粒子
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const angle = (i / count) * Math.PI * 2;
      const speed = 0.5 + Math.random() * 1;
      const verticalSpeed = Math.random() * 0.5;
      
      return {
        x: Math.cos(angle) * speed * progress * 2,
        y: verticalSpeed * progress * 2 - progress * progress * 2,
        z: Math.sin(angle) * speed * progress * 2,
        size: 0.02 + Math.random() * 0.03,
      };
    });
  }, [count, progress]);

  return (
    <group position={position}>
      {particles.map((p, i) => (
        <mesh key={i} position={[p.x, p.y, p.z]}>
          <sphereGeometry args={[p.size, 6, 6]} />
          <meshBasicMaterial color={color} transparent opacity={1 - progress} />
        </mesh>
      ))}
    </group>
  );
};

// 魔法阵
type MagicCircleProps = {
  position?: [number, number, number];
  frame: number;
  fps: number;
  color?: string;
  radius?: number;
};

export const MagicCircle = ({
  position = [0, 0, 0],
  frame,
  fps,
  color = '#00ffff',
  radius = 1,
}: MagicCircleProps) => {
  const rotation = frame / fps * Math.PI;
  const pulse = 1 + Math.sin(frame / fps * 4) * 0.1;
  const opacity = 0.5 + Math.sin(frame / fps * 2) * 0.3;

  return (
    <group position={position} scale={pulse}>
      {/* 外圈 */}
      <mesh rotation={[Math.PI / 2, 0, rotation]}>
        <torusGeometry args={[radius, 0.02, 8, 64]} />
        <meshBasicMaterial color={color} transparent opacity={opacity} />
      </mesh>
      {/* 内圈 */}
      <mesh rotation={[Math.PI / 2, 0, -rotation * 1.5]}>
        <torusGeometry args={[radius * 0.6, 0.015, 8, 48]} />
        <meshBasicMaterial color={color} transparent opacity={opacity * 0.8} />
      </mesh>
      {/* 六芒星 */}
      {Array.from({ length: 6 }, (_, i) => {
        const angle = (i / 6) * Math.PI * 2 + rotation * 0.5;
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * radius * 0.8,
              0,
              Math.sin(angle) * radius * 0.8,
            ]}
            rotation={[Math.PI / 2, 0, angle]}
          >
            <coneGeometry args={[0.05, 0.3, 4]} />
            <meshBasicMaterial color={color} transparent opacity={opacity} />
          </mesh>
        );
      })}
    </group>
  );
};

// 火焰
type FlameProps = {
  position?: [number, number, number];
  frame: number;
  fps: number;
  scale?: number;
};

export const Flame = ({
  position = [0, 0, 0],
  frame,
  fps,
  scale = 1,
}: FlameProps) => {
  const flicker = Math.sin(frame / fps * 10) * 0.1;
  const height = 0.5 + Math.sin(frame / fps * 8) * 0.1;

  return (
    <group position={position} scale={scale}>
      {/* 核心火焰 */}
      <mesh position={[0, height / 2, 0]} scale={[1, 1 + flicker, 1]}>
        <coneGeometry args={[0.2, height, 8]} />
        <meshBasicMaterial color="#ffff00" transparent opacity={0.9} />
      </mesh>
      {/* 外层火焰 */}
      <mesh position={[0, height * 0.4, 0]} scale={[1.2, 1 + flicker * 1.5, 1.2]}>
        <coneGeometry args={[0.25, height * 0.8, 8]} />
        <meshBasicMaterial color="#ff6600" transparent opacity={0.7} />
      </mesh>
      {/* 最外层 */}
      <mesh position={[0, height * 0.3, 0]} scale={[1.5, 1 + flicker * 2, 1.5]}>
        <coneGeometry args={[0.3, height * 0.6, 8]} />
        <meshBasicMaterial color="#ff3300" transparent opacity={0.4} />
      </mesh>
      {/* 点光源 */}
      <pointLight color="#ff6600" intensity={0.5 + flicker * 2} distance={3} />
    </group>
  );
};

// 冰霜效果
type FrostEffectProps = {
  position?: [number, number, number];
  frame: number;
  fps: number;
  radius?: number;
};

export const FrostEffect = ({
  position = [0, 0, 0],
  frame,
  fps,
  radius = 1,
}: FrostEffectProps) => {
  const shimmer = Math.sin(frame / fps * 5) * 0.2;

  return (
    <group position={position}>
      {/* 冰晶 */}
      {Array.from({ length: 8 }, (_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const r = radius * (0.8 + shimmer);
        return (
          <mesh
            key={i}
            position={[Math.cos(angle) * r, 0, Math.sin(angle) * r]}
            rotation={[Math.random() * 0.5, angle, Math.random() * 0.5]}
          >
            <octahedronGeometry args={[0.1, 0]} />
            <meshStandardMaterial
              color="#aaddff"
              roughness={0.1}
              metalness={0.5}
              transparent
              opacity={0.7}
            />
          </mesh>
        );
      })}
      {/* 地面霜冻 */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[radius, 32]} />
        <meshBasicMaterial color="#ccffff" transparent opacity={0.3} />
      </mesh>
      <pointLight color="#88ddff" intensity={0.3} distance={2} />
    </group>
  );
};

// 闪电
type LightningProps = {
  position?: [number, number, number];
  frame: number;
  fps: number;
  duration?: number;
};

export const Lightning = ({
  position = [0, 0, 0],
  frame,
  fps,
  duration = 10,
}: LightningProps) => {
  const progress = (frame % (duration * fps)) / (duration * fps);
  const visible = progress < 0.3 || (progress > 0.5 && progress < 0.7);
  
  if (!visible) return null;

  // 生成锯齿形闪电路径
  const points = useMemo(() => {
    const result = [];
    const segments = 8;
    for (let i = 0; i <= segments; i++) {
      result.push({
        x: (Math.random() - 0.5) * 0.3 * (i / segments),
        y: i / segments * 2,
        z: (Math.random() - 0.5) * 0.3 * (i / segments),
      });
    }
    return result;
  }, [frame]);

  return (
    <group position={position}>
      {points.slice(0, -1).map((p, i) => (
        <mesh
          key={i}
          position={[(p.x + points[i + 1].x) / 2, (p.y + points[i + 1].y) / 2, (p.z + points[i + 1].z) / 2]}
          rotation={[
            Math.atan2(points[i + 1].y - p.y, points[i + 1].x - p.x),
            0,
            Math.atan2(points[i + 1].z - p.z, points[i + 1].y - p.y),
          ]}
        >
          <cylinderGeometry args={[0.02, 0.02, 0.3, 4]} />
          <meshBasicMaterial color="#ffffcc" />
        </mesh>
      ))}
      <pointLight color="#ffffff" intensity={2} distance={5} />
    </group>
  );
};

// 治愈光环
type HealAuraProps = {
  position?: [number, number, number];
  frame: number;
  fps: number;
  radius?: number;
};

export const HealAura = ({
  position = [0, 0, 0],
  frame,
  fps,
  radius = 1,
}: HealAuraProps) => {
  const pulse = 1 + Math.sin(frame / fps * 3) * 0.15;
  const rise = (frame / fps * 0.5) % 1;

  return (
    <group position={position}>
      {/* 上升光环 */}
      {Array.from({ length: 3 }, (_, i) => {
        const y = ((rise + i / 3) % 1) * 2;
        const opacity = 1 - ((rise + i / 3) % 1);
        return (
          <mesh key={i} position={[0, y, 0]} scale={pulse * (1 + y * 0.3)}>
            <torusGeometry args={[radius * 0.3, 0.02, 8, 32]} />
            <meshBasicMaterial color="#88ff88" transparent opacity={opacity * 0.5} />
          </mesh>
        );
      })}
      {/* 十字符号 */}
      <mesh position={[0, 1.2, 0]} rotation={[0, frame / fps, 0]}>
        <boxGeometry args={[0.05, 0.3, 0.05]} />
        <meshBasicMaterial color="#aaffaa" transparent opacity={0.6} />
      </mesh>
      <mesh position={[0, 1.2, 0]} rotation={[0, frame / fps, Math.PI / 2]}>
        <boxGeometry args={[0.05, 0.2, 0.05]} />
        <meshBasicMaterial color="#aaffaa" transparent opacity={0.6} />
      </mesh>
      <pointLight color="#88ff88" intensity={0.3} distance={3} />
    </group>
  );
};

// ==================== 组合特效 ====================

// 火球术
type FireballProps = {
  position?: [number, number, number];
  frame: number;
  fps: number;
  flying?: boolean;
};

export const Fireball = ({
  position = [0, 1, 0],
  frame,
  fps,
  flying = false,
}: FireballProps) => {
  const trail = flying ? Math.min(1, frame / (fps * 0.5)) : 0;
  
  return (
    <group position={position}>
      {/* 核心火球 */}
      <mesh>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshBasicMaterial color="#ffcc00" />
      </mesh>
      {/* 外层火焰 */}
      <mesh scale={1.2 + Math.sin(frame / fps * 10) * 0.2}>
        <sphereGeometry args={[0.18, 12, 12]} />
        <meshBasicMaterial color="#ff6600" transparent opacity={0.7} />
      </mesh>
      {/* 尾焰 */}
      {flying && Array.from({ length: 5 }, (_, i) => (
        <mesh
          key={i}
          position={[-(i + 1) * 0.15 * trail, 0, 0]}
          scale={1 - i * 0.15}
        >
          <sphereGeometry args={[0.12, 8, 8]} />
          <meshBasicMaterial color="#ff3300" transparent opacity={0.5 - i * 0.08} />
        </mesh>
      ))}
      <pointLight color="#ff6600" intensity={1} distance={4} />
    </group>
  );
};

// 冰霜新星
type FrostNovaProps = {
  position?: [number, number, number];
  frame: number;
  fps: number;
  maxRadius?: number;
};

export const FrostNova = ({
  position = [0, 0, 0],
  frame,
  fps,
  maxRadius = 3,
}: FrostNovaProps) => {
  const progress = Math.min(1, frame / (fps * 1.5));
  const radius = progress * maxRadius;
  const opacity = 1 - progress * 0.7;

  return (
    <group position={position}>
      {/* 扩散圆环 */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[radius - 0.1, radius, 32]} />
        <meshBasicMaterial color="#88ddff" transparent opacity={opacity} side={2} />
      </mesh>
      {/* 冰刺 */}
      {Array.from({ length: 12 }, (_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const r = radius * 0.9;
        return (
          <mesh
            key={i}
            position={[Math.cos(angle) * r, 0.1, Math.sin(angle) * r]}
            rotation={[Math.PI / 6, 0, angle]}
          >
            <coneGeometry args={[0.08, 0.3, 6]} />
            <meshStandardMaterial
              color="#aaddff"
              roughness={0.1}
              metalness={0.5}
              transparent
              opacity={opacity}
            />
          </mesh>
        );
      })}
      <pointLight color="#88ddff" intensity={1 * opacity} distance={5} />
    </group>
  );
};

// 治愈术
type HealSpellProps = {
  position?: [number, number, number];
  frame: number;
  fps: number;
};

export const HealSpell = ({
  position = [0, 0, 0],
  frame,
  fps,
}: HealSpellProps) => {
  return (
    <group position={position}>
      <HealAura frame={frame} fps={fps} radius={0.8} />
      <ParticleBurst
        frame={frame}
        fps={fps}
        color="#88ff88"
        count={20}
        duration={90}
      />
    </group>
  );
};

// 召唤法阵
type SummonCircleProps = {
  position?: [number, number, number];
  frame: number;
  fps: number;
  active?: boolean;
};

export const SummonCircle = ({
  position = [0, 0, 0],
  frame,
  fps,
  active = true,
}: SummonCircleProps) => {
  const intensity = active ? 0.5 + Math.sin(frame / fps * 4) * 0.3 : 0.2;

  return (
    <group position={position}>
      <MagicCircle frame={frame} fps={fps} color="#aa44ff" radius={1.2} />
      <FrostEffect frame={frame} fps={fps} radius={0.8} />
      {active && (
        <>
          <ParticleBurst
            frame={frame}
            fps={fps}
            color="#cc88ff"
            count={30}
            duration={120}
          />
          <pointLight color="#aa44ff" intensity={intensity} distance={4} />
        </>
      )}
    </group>
  );
};
