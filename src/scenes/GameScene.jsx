import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import ScoreBoard from '../components/ScoreBoard';
import GameBoard from '../components/GameBoard';
import { OrbitControls } from '@react-three/drei';
import BananaModel from '../components/BananaModel';
import CameraController from '../components/CameraController';



const GameScene = () => {

    const [objects, setObjects] = useState([]); // 立方体のオブジェクトの状態を管理
    const [score, setScore] = useState(0);     // スコアの状態を管理
    const [gameOver, setGameOver] = useState(false); // ゲームオーバーフラグ
    const [timeRemaining, setTimeRemaining] = useState(10); // 制限時間
    const [gameStarted, setGameStarted] = useState(false); // ゲーム開始フラグ

    // ゲーム開始時の処理
    const handleStartGame = () => {
        setGameStarted(true);
    }

    // ゲームリセット時の処理
    const handleReset = () => {
        setObjects([]);
        setScore(0);
        setGameOver(false);
        setTimeRemaining(10);
        setGameStarted(false);
    }

    // キーボード入力を受け取る処理、aキーを押すとバナナが追加される
    useEffect(() => {
      const handleTyping = (event) => {
        if (event.key === 'a' && gameStarted && !gameOver) {
          const position = [Math.random() * 20 - 10, Math.random() * 20 - 10, Math.random() * 20 - 10];
          setObjects([...objects, { position }]);
          setScore(score + 1);
        }
      };
      window.addEventListener('keydown', handleTyping);
      return () => {
        window.removeEventListener('keydown', handleTyping);
      };
    }, [objects, score, gameOver, gameStarted]);


    // カウントダウン処理
    useEffect(() => {
      if (gameStarted && !gameOver) {
        const countdownInterval = setInterval(() => {
          setTimeRemaining((prevTime) => {
            if (prevTime === 0) {
              setGameOver(true);
              clearInterval(countdownInterval);
              return prevTime;
            } else {
              return prevTime - 1;
            }
          });
        }, 1000); // 1秒(1000ms)ごとにカウントダウン
  
        return () => clearInterval(countdownInterval);
      }
    }, [gameStarted, gameOver]);


    return (
      <div id="canvas-container">
        <GameBoard />
        <ScoreBoard score={score} />
        <div style={{ position: 'absolute', top: 10, left: 10, color: 'black', fontSize: 24 }}>
          Time Remaining: {timeRemaining} s
        </div>
        {!gameStarted && (
          <button onClick={handleStartGame} style={{ position: 'absolute', top: 50, left: 10, fontSize: 16 }}>
            Start Game
          </button>
        )}
        {gameOver && (
          <button onClick={handleReset} style={{ position: 'absolute', top: 50, left: 16, fontSize: 16 }}>
            Reset
          </button>
        )}
        <Canvas camera={{ position: [0, 0, 10] }}>
          <ambientLight intensity={1.5} />
          <OrbitControls />
          <CameraController gameOver={gameOver} />
          {objects.map((obj, index) => (
            <BananaModel key={index} position={obj.position} />
          ))}
        </Canvas>
      </div>
    );
  };
  
  export default GameScene;