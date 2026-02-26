import { ThreeCanvas } from '@remotion/three';
import { useCurrentFrame, useVideoConfig, AbsoluteFill } from 'remotion';

// 最简单的 3D 测试场景
export const Simple3D = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const rotation = frame * 0.02;

  return (
    <AbsoluteFill style={{ background: '#1a1a2e' }}>
      <ThreeCanvas
        width={width}
        height={height}
        camera={{ position: [0, 0, 5], fov: 50 }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        
        {/* 旋转立方体 */}
        <mesh rotation={[rotation, rotation, 0]}>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial color="orange" />
        </mesh>
      </ThreeCanvas>
    </AbsoluteFill>
  );
};
