import { useRef } from 'react';
import { Mesh } from 'three';

type EnvironmentProps = {
  frame: number;
  fps: number;
  type?: 'forest' | 'city' | 'room';
};

// 环境组件
export const Environment = ({ frame, fps, type = 'forest' }: EnvironmentProps) => {
  return (
    <group>
      {/* 地面 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#3a5a2a" />
      </mesh>

      {/* 天空盒效果 - 简单渐变背景 */}
      <mesh position={[0, 10, -20]}>
        <planeGeometry args={[100, 40]} />
        <meshBasicMaterial color="#87CEEB" />
      </mesh>

      {/* 远山 */}
      <mesh position={[-15, 2, -15]}>
        <coneGeometry args={[8, 10, 4]} />
        <meshStandardMaterial color="#2a4a3a" />
      </mesh>
      <mesh position={[15, 3, -18]}>
        <coneGeometry args={[10, 12, 4]} />
        <meshStandardMaterial color="#3a5a4a" />
      </mesh>

      {/* 树木 */}
      {[
        { x: -4, z: -3 },
        { x: 5, z: -5 },
        { x: -8, z: -8 },
        { x: 10, z: -10 },
      ].map((pos, i) => (
        <group key={i} position={[pos.x, 0, pos.z]}>
          {/* 树干 */}
          <mesh position={[0, 0.75, 0]}>
            <cylinderGeometry args={[0.2, 0.3, 1.5, 8]} />
            <meshStandardMaterial color="#5a3a2a" />
          </mesh>
          {/* 树冠 */}
          <mesh position={[0, 2, 0]}>
            <coneGeometry args={[1, 2, 8]} />
            <meshStandardMaterial color="#2a6a3a" />
          </mesh>
        </group>
      ))}

      {/* 装饰石头 */}
      <mesh position={[3, 0.2, 2]}>
        <dodecahedronGeometry args={[0.3]} />
        <meshStandardMaterial color="#6a6a6a" />
      </mesh>
      <mesh position={[-2, 0.15, 3]}>
        <dodecahedronGeometry args={[0.2]} />
        <meshStandardMaterial color="#5a5a5a" />
      </mesh>
    </group>
  );
};

// 室内环境
export const RoomEnvironment = () => {
  return (
    <group>
      {/* 地板 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* 后墙 */}
      <mesh position={[0, 2.5, -5]}>
        <planeGeometry args={[10, 5]} />
        <meshStandardMaterial color="#f5f5dc" />
      </mesh>

      {/* 左墙 */}
      <mesh rotation={[0, Math.PI / 2, 0]} position={[-5, 2.5, 0]}>
        <planeGeometry args={[10, 5]} />
        <meshStandardMaterial color="#f0e5d0" />
      </mesh>

      {/* 右墙 */}
      <mesh rotation={[0, -Math.PI / 2, 0]} position={[5, 2.5, 0]}>
        <planeGeometry args={[10, 5]} />
        <meshStandardMaterial color="#f0e5d0" />
      </mesh>

      {/* 窗户 */}
      <mesh position={[0, 2.5, -4.9]}>
        <planeGeometry args={[2, 2]} />
        <meshBasicMaterial color="#87CEEB" />
      </mesh>

      {/* 桌子 */}
      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[1.5, 0.1, 0.8]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      <mesh position={[-0.5, 0.2, 0]}>
        <boxGeometry args={[0.1, 0.4, 0.1]} />
        <meshStandardMaterial color="#6B3513" />
      </mesh>
      <mesh position={[0.5, 0.2, 0]}>
        <boxGeometry args={[0.1, 0.4, 0.1]} />
        <meshStandardMaterial color="#6B3513" />
      </mesh>
    </group>
  );
};

// 城市环境
export const CityEnvironment = () => {
  return (
    <group>
      {/* 地面 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#4a4a4a" />
      </mesh>

      {/* 建筑物 */}
      {[
        { x: -8, width: 3, height: 8 },
        { x: -3, width: 4, height: 12 },
        { x: 4, width: 3, height: 6 },
        { x: 10, width: 5, height: 15 },
      ].map((building, i) => (
        <mesh key={i} position={[building.x, building.height / 2, -10]}>
          <boxGeometry args={[building.width, building.height, 4]} />
          <meshStandardMaterial color="#5a6a7a" />
        </mesh>
      ))}

      {/* 路灯 */}
      {[-5, 5].map((x, i) => (
        <group key={i} position={[x, 0, 2]}>
          <mesh position={[0, 1.5, 0]}>
            <cylinderGeometry args={[0.05, 0.05, 3]} />
            <meshStandardMaterial color="#3a3a3a" />
          </mesh>
          <mesh position={[0, 3.2, 0]}>
            <sphereGeometry args={[0.2]} />
            <meshBasicMaterial color="#ffff99" />
          </mesh>
        </group>
      ))}
    </group>
  );
};
