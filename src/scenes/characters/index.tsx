import { useCurrentFrame, useVideoConfig, AbsoluteFill, staticFile } from 'remotion';
import { ThreeCanvas } from '@remotion/three';
import { OrbitControls, Environment, useGLTF, useAnimations } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import { Character, CHARACTER_PRESETS } from '../../base/3d/characters/Character';

// 外部 GLB 模型组件 - 使用 staticFile 加载
const ExternalModel = ({
  position = [0, 0, 0],
  scale = 1,
  frame,
  fps,
}: {
  position?: [number, number, number];
  scale?: number;
  frame: number;
  fps: number;
}) => {
  const { scene, animations } = useGLTF(staticFile('models/character.glb'));
  const { actions } = useAnimations(animations, scene);
  const groupRef = useRef<THREE.Group>(null);

  // 播放第一个动画（如果有）
  useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      const firstAction = Object.values(actions)[0];
      firstAction?.play();
    }
  }, [actions]);

  // 如果没有内置动画，用 frame 驱动旋转
  const rotationY = frame / fps * 0.5;

  return (
    <group ref={groupRef} position={position} scale={scale}>
      <primitive object={scene} rotation={[0, rotationY, 0]} />
    </group>
  );
};

export const CharacterScene = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();

  return (
    <AbsoluteFill style={{ background: '#1a1a2e' }}>
      <ThreeCanvas
        width={width}
        height={height}
        camera={{ position: [0, 2, 5], fov: 50 }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />

        {/* 主角 */}
        <Character
          position={[-1.5, 0, 0]}
          frame={frame}
          fps={fps}
          animation="idle"
          color={CHARACTER_PRESETS.hero.color}
          scale={CHARACTER_PRESETS.hero.scale}
        />

        {/* 女主 */}
        <Character
          position={[0, 0, 0]}
          frame={frame}
          fps={fps}
          animation="talk"
          color={CHARACTER_PRESETS.heroine.color}
          scale={CHARACTER_PRESETS.heroine.scale}
        />

        {/* 反派 */}
        <Character
          position={[1.5, 0, 0]}
          frame={frame}
          fps={fps}
          animation="walk"
          color={CHARACTER_PRESETS.villain.color}
          scale={CHARACTER_PRESETS.villain.scale}
        />

        {/* 外部 GLB 模型 - 自动旋转 + 播放内置动画 */}
        <ExternalModel position={[0, 0, 2]} scale={1} frame={frame} fps={fps} />

        {/* 调试网格 */}
        <gridHelper args={[10, 10]} />

        <OrbitControls />
        <Environment preset="city" />
      </ThreeCanvas>
    </AbsoluteFill>
  );
};
