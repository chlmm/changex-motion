// Docker 鲸鱼图标组件
import React from 'react';
import { COLORS } from '../config';

interface DockerWhaleProps {
  scale?: number;
  rotate?: number;
  containerOpacities?: number[];
}

export const DockerWhale: React.FC<DockerWhaleProps> = ({
  scale = 1,
  rotate = 0,
  containerOpacities = [1, 1, 1, 1, 1, 1],
}) => {
  const containerColors = [
    ['#4ade80', '#fbbf24', '#f87171'], // 第一层：绿、黄、红
    ['#a78bfa', '#60a5fa', '#f472b6'], // 第二层：紫、蓝、粉
  ];

  return (
    <div
      style={{
        transform: `scale(${scale}) rotate(${rotate}deg)`,
        marginBottom: 40,
      }}
    >
      {/* 鲸鱼身体 */}
      <div
        style={{
          width: 180,
          height: 100,
          background: `linear-gradient(180deg, ${COLORS.primary} 0%, #1D63ED 100%)`,
          borderRadius: '50px 50px 30px 30px',
          position: 'relative',
          boxShadow: '0 10px 40px rgba(36, 150, 237, 0.3)',
        }}
      >
        {/* 鲸鱼眼睛 */}
        <div
          style={{
            position: 'absolute',
            width: 12,
            height: 12,
            background: 'white',
            borderRadius: '50%',
            top: 30,
            left: 40,
          }}
        />

        {/* 鲸鱼尾巴 */}
        <div
          style={{
            position: 'absolute',
            right: -30,
            top: 30,
            width: 40,
            height: 40,
            background: COLORS.primary,
            borderRadius: '0 20px 20px 0',
          }}
        />

        {/* 第一层集装箱 */}
        <div
          style={{
            position: 'absolute',
            top: -25,
            left: 20,
            display: 'flex',
            gap: 4,
          }}
        >
          {containerColors[0].map((color, i) => (
            <div
              key={`row1-${i}`}
              style={{
                width: 40,
                height: 25,
                background: color,
                borderRadius: 4,
                opacity: containerOpacities[i],
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
              }}
            />
          ))}
        </div>

        {/* 第二层集装箱 */}
        <div
          style={{
            position: 'absolute',
            top: -50,
            left: 35,
            display: 'flex',
            gap: 4,
          }}
        >
          {containerColors[1].map((color, i) => (
            <div
              key={`row2-${i}`}
              style={{
                width: 40,
                height: 25,
                background: color,
                borderRadius: 4,
                opacity: containerOpacities[i + 3],
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
