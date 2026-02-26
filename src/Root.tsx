import { Composition, Folder } from 'remotion';
// 教程视频
import { GitTutorialScene, GIT_TUTORIAL_TOTAL_FRAMES } from './scenes/tutorials/GitTutorial';
import { DockerTutorialScene, DOCKER_TUTORIAL_TOTAL_FRAMES } from './scenes/tutorials/DockerTutorial';
import { PhotosynthesisScene } from './scenes/tutorials/Photosynthesis';
// 演示场景
import { Simple3D } from './scenes/demos/Simple3D';
import { Scene3D } from './scenes/demos/Scene3D';
import { ProceduralScene } from './scenes/demos/ProceduralScene';
// 人物场景
import { CharacterScene } from './scenes/characters';

export const RemotionRoot = () => {
  return (
    <>
      <Folder name="教育视频">
        <Composition
          id="Photosynthesis"
          component={PhotosynthesisScene}
          durationInFrames={750}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="GitTutorial"
          component={GitTutorialScene}
          durationInFrames={GIT_TUTORIAL_TOTAL_FRAMES}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="DockerTutorial"
          component={DockerTutorialScene}
          durationInFrames={DOCKER_TUTORIAL_TOTAL_FRAMES}
          fps={30}
          width={1920}
          height={1080}
        />
      </Folder>
      <Folder name="演示场景">
        <Composition
          id="Simple3D"
          component={Simple3D}
          durationInFrames={150}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="Scene3D"
          component={Scene3D}
          durationInFrames={300}
          fps={30}
          width={1920}
          height={1080}
        />
        <Composition
          id="ProceduralScene"
          component={ProceduralScene}
          durationInFrames={450}
          fps={30}
          width={1920}
          height={1080}
        />
      </Folder>
      <Folder name="人物场景">
        <Composition
          id="CharacterScene"
          component={CharacterScene}
          durationInFrames={300}
          fps={30}
          width={1920}
          height={1080}
        />
      </Folder>
    </>
  );
};
