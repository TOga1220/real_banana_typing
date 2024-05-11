import * as THREE from 'three';
import React, { useState, useEffect } from 'react';
import { createBoxGeometry, createBoxMaterial, createBoxMesh, getRandomColor } from '../utils/three-utils';
import { Canvas } from '@react-three/fiber';
import ScoreBoard from '../components/ScoreBoard';
import GameBoard from '../components/GameBoard';


// 立方体のメッシュをレンダリングするコンポーネント
const Cubes = ({ objects }) => {
    return objects.map((obj, index) => (
      <mesh key={index} position={obj.position}>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color={obj.color} />
      </mesh>
    ));
  };


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
        // Three.jsのシーン、カメラ、レンダラーを作成
        const sceneInstance = new THREE.Scene();
        const cameraInstance = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const rendererInstance = new THREE.WebGLRenderer();

        
        // 状態を更新
        setScene(sceneInstance);
        setCamera(cameraInstance);
        setRenderer(rendererInstance);

        // キーボードイベントのハンドラ
        const handleTyping = (event) => {
            // 'a'キーが押された場合
            if (event.key === 'a') {
            // 立方体のジオメトリ、マテリアル、メッシュを作成
            const geometry = createBoxGeometry();
            const material = createBoxMaterial(getRandomColor());
            const cube = createBoxMesh(geometry, material);
            // 立方体の位置をランダムに設定
            const position = [Math.random() * 4 - 2, Math.random() * 4 - 2, Math.random() * 4 - 2];
            cube.position.set(...position);
            // 立方体をシーンに追加
            sceneInstance.add(cube);
            // 立方体のデータを状態に追加
            setObjects([...objects, { mesh: cube, position, color: material.color.getHex() }]);
            // スコアを増加
            setScore(score + 1);
            }
        };

        // キーボードイベントを追加
        window.addEventListener('keydown', handleTyping);


        // コンポーネントがアンマウントされたときの処理
        return () => {
            // キーボードイベントのリスナーを解除
            window.removeEventListener('keydown', handleTyping);
            // レンダラーのリソースを解放
            rendererInstance.dispose();
        };
    }, [objects, score]);

    return (
        <div>
            <ScoreBoard score={score} />
            <GameBoard />
            {/* Three.jsのキャンバスをレンダリング */}
            <Canvas>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <Cubes objects={objects} />
            </Canvas>
        </div>
    );
  };

export default GameScene;
