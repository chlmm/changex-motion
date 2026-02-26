import { ThreeCanvas } from '@remotion/three';
import { useCurrentFrame, useVideoConfig, AbsoluteFill } from 'remotion';
import { Character } from '../../base/3d/characters/Character';
import { NPC, NPCCrowd } from '../../base/3d/characters/NPC';
import { Tree, Forest } from '../../base/3d/environments/Tree';
import { Rock, RockField } from '../../base/3d/environments/Rock';
import { Cloud, SkyClouds } from '../../base/3d/environments/Cloud';
import { Building, Village } from '../../base/3d/environments/Building';
import {
  MagicCircle,
  Flame,
  ParticleBurst,
  Fireball,
  FrostNova,
  HealSpell,
  SummonCircle,
} from '../../base/3d/effects/MagicEffects';

// 完整的程序化场景展示
export const ProceduralScene = () => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();

  // 摄像机环绕动画
  const cameraAngle = frame / fps * 0.3;
  const cameraRadius = 12;
  const cameraX = Math.sin(cameraAngle) * cameraRadius;
  const cameraZ = Math.cos(cameraAngle) * cameraRadius;
  const cameraY = 6 + Math.sin(frame / fps * 0.5) * 1;

  return (
    <AbsoluteFill style={{ background: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' }}>
      <ThreeCanvas
        width={width}
        height={height}
        camera={{ position: [cameraX, cameraY, cameraZ], fov: 50 }}
      >
        {/* 环境 */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 20, 10]} intensity={0.8} />
        <pointLight position={[-5, 5, 5]} intensity={0.3} color="#fff5e6" />

        {/* 地面 */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
          <planeGeometry args={[100, 100]} />
          <meshStandardMaterial color="#2a4a2a" />
        </mesh>

        {/* === 环境元素 === */}
        
        {/* 天空云朵 */}
        <SkyClouds count={6} skyRadius={25} height={12} frame={frame} fps={fps} />

        {/* 森林 - 远景 */}
        <Forest count={15} areaSize={30} frame={frame} fps={fps} />

        {/* 石头 */}
        <RockField count={20} areaSize={20} />

        {/* 村庄 - 左侧 */}
        <Village houseCount={4} radius={6} frame={frame} fps={fps} />

        {/* 城墙段 - 右侧 */}
        <Building position={[8, 0, 0]} type="wall" scale={1.5} />
        <Building position={[12, 0, 0]} type="tower" scale={1} frame={frame} fps={fps} />
        <Building position={[16, 0, 0]} type="wall" scale={1.5} />

        {/* 寺庙 - 后方 */}
        <Building position={[0, 0, -15]} type="temple" scale={1.2} />

        {/* === 人物 === */}
        
        {/* 主角 */}
        <Character
          position={[0, 0, 3]}
          frame={frame}
          fps={fps}
          animation="idle"
          color="#4a90d9"
        />

        {/* NPC群体 */}
        <NPCCrowd count={8} areaSize={8} frame={frame} fps={fps} />

        {/* 守卫 */}
        <NPC position={[8, 0, -2]} type="guard" action="idle" frame={frame} fps={fps} />
        <NPC position={[16, 0, -2]} type="guard" action="idle" frame={frame} fps={fps} />

        {/* === 魔法特效 === */}
        
        {/* 主角魔法阵 */}
        <MagicCircle position={[0, 0.05, 3]} frame={frame} fps={fps} color="#00ffff" radius={0.8} />

        {/* 火焰 - 左侧 */}
        <Flame position={[-3, 0, 2]} frame={frame} fps={fps} scale={1.2} />

        {/* 治愈术 - 右侧 */}
        <HealSpell position={[3, 0, 2]} frame={frame} fps={fps} />

        {/* 火球 - 飞行中 */}
        <Fireball
          position={[-2 + frame / fps * 2, 1.5, -2]}
          frame={frame}
          fps={fps}
          flying
        />

        {/* 冰霜新星 - 中后方 */}
        <FrostNova position={[0, 0, -5]} frame={frame % (fps * 2)} fps={fps} maxRadius={2} />

        {/* 召唤法阵 - 寺庙前 */}
        <SummonCircle position={[0, 0.05, -10]} frame={frame} fps={fps} active />

        {/* 粒子爆发 */}
        <ParticleBurst
          position={[5, 2, 5]}
          frame={frame}
          fps={fps}
          color="#ffaa00"
          count={30}
        />
      </ThreeCanvas>

      {/* 场景标题 */}
      <div
        style={{
          position: 'absolute',
          top: 40,
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'white',
          fontSize: 48,
          fontWeight: 'bold',
          textShadow: '0 2px 10px rgba(0,0,0,0.5)',
        }}
      >
        程序化模型展示
      </div>

      {/* 模型统计 */}
      <div
        style={{
          position: 'absolute',
          bottom: 40,
          left: 40,
          color: 'white',
          fontSize: 20,
          textShadow: '0 1px 5px rgba(0,0,0,0.5)',
          lineHeight: 1.6,
        }}
      >
        <div>🌲 树木: 松树/橡树/竹子/樱花</div>
        <div>🪨 石头: 小石/巨石/水晶</div>
        <div>☁️ 云朵: 蓬松/纤细/风暴/日落</div>
        <div>🏠 建筑: 房屋/塔楼/城墙/城门/寺庙</div>
        <div>👤 NPC: 村民/守卫/商人/儿童/长者</div>
        <div>✨ 特效: 火焰/冰霜/治愈/召唤</div>
      </div>
    </AbsoluteFill>
  );
};
