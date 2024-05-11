import * as THREE from 'three';
import React, { useState, useEffect } from 'react';
import { createBoxGeometry, createBoxMaterial, createBoxMesh, getRandomColor } from '../utils/three-utils';
import { Canvas } from '@react-three/fiber';
import ScoreBoard from '../components/ScoreBoard';
import GameBoard from '../components/GameBoard';
import { OrbitControls } from '@react-three/drei';
import BananaModel from '../components/BananaModel';



const GameScene = () => {
    // Three.jsのシーン、カメラ、レンダラーを状態として管理
    const [scene, setScene] = useState(null);
    const [camera, setCamera] = useState(null);
    const [renderer, setRenderer] = useState(null);
    // 立方体のオブジェクトの状態を管理
    const [objects, setObjects] = useState([]);
    // スコアの状態を管理
    const [score, setScore] = useState(0);


    useEffect(() => {
      const handleTyping = (event) => {
        if (event.key === 'a') {
          const position = [Math.random() * 4 - 2, Math.random() * 4 - 2, Math.random() * 4 - 2];
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
      <div>
        <ScoreBoard score={score} />
        <GameBoard />
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <OrbitControls />
          {objects.map((obj, index) => (
            <BananaModel key={index} position={obj.position} />
          ))}
        </Canvas>
      </div>
    );
  };

export default GameScene;
