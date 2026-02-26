import { ThreeCanvas } from '@remotion/three';
import { useCurrentFrame, useVideoConfig, AbsoluteFill } from 'remotion';
import { Character } from '../../base/3d/characters/Character';
import { Environment } from '../../base/3d/environments/Environment';

// 3D 场景组件
export const Scene3D = () => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();

  // 摄像机动画
  const cameraZ = 5 + Math.sin(frame / fps * 0.5) * 0.5;
  const cameraY = 1.5 + Math.cos(frame / fps * 0.3) * 0.3;

  return (
    <AbsoluteFill style={{ background: '#1a1a2e' }}>
      <ThreeCanvas
        width={width}
        height={height}
        camera={{ position: [0, cameraY, cameraZ], fov: 50 }}
      >
        {/* 环境光 */}
        <ambientLight intensity={0.6} />
        
        {/* 主光源 */}
        <directionalLight
          position={[5, 10, 5]}
          intensity={1}
        />
        
        {/* 补光 */}
        <pointLight position={[-5, 5, 5]} intensity={0.5} color="#fff5e6" />
        
        {/* 环境 */}
        <Environment frame={frame} fps={fps} />
        
        {/* 角色 */}
        <Character
          position={[0, 0, 0]}
          frame={frame}
          fps={fps}
          animation="idle"
        />
      </ThreeCanvas>
    </AbsoluteFill>
  );
};
