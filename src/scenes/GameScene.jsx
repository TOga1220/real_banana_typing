import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import ScoreBoard from '../components/ScoreBoard';
import GameBoard from '../components/GameBoard';
import { OrbitControls } from '@react-three/drei';
import BananaModel from '../components/BananaModel';



const GameScene = () => {

    // 立方体のオブジェクトの状態を管理
    const [objects, setObjects] = useState([]);
    // スコアの状態を管理
    const [score, setScore] = useState(0);

    // キーボード入力を受け取る処理
    useEffect(() => {
      const handleTyping = (event) => {
        // キーボードの「a」キーが押されたら、ランダムな位置に立方体を追加
        if (event.key === 'a') {
          const position = [Math.random() * 20 - 10, Math.random() * 20 - 10, Math.random() * 20 - 10];
          setObjects([...objects, { position }]);
          setScore(score + 1);
        }
      };
      window.addEventListener('keydown', handleTyping);
  
      return () => {
        window.removeEventListener('keydown', handleTyping);
      };
    }, [objects, score]);

    return (
      <div id="canvas-container">
        <GameBoard />
        <ScoreBoard score={score} />
        <Canvas camera={{ position: [0, 0, 10] }}>
          <ambientLight intensity={1} />
          <OrbitControls />
          {objects.map((obj, index) => (
            <BananaModel key={index} position={obj.position} />
          ))}
        </Canvas>
      </div>
    );
};

export default GameScene;
