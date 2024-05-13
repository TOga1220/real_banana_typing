import { useEffect, useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';

const CameraController = ({ gameOver }) => {
  const { camera } = useThree();
  const cameraRef = useRef(null); // カメラの参照を保持
  const initialCameraPositionRef = useRef(null); // カメラの初期位置を保持
  const rotationSpeed = 0.001; // 回転の速度 

  // カメラの初期位置を保存
  useEffect(() => {
    cameraRef.current = camera;
    initialCameraPositionRef.current = camera.position.clone();
  }, [camera]);

  // ゲームオーバー時のカメラの動き
  useFrame(() => {
    if (cameraRef.current) {
      const camera = cameraRef.current;
      if (gameOver) { 
        camera.position.x = Math.sin(Date.now() * rotationSpeed) * 5;
        camera.position.y = Math.cos(Date.now() * rotationSpeed) * 5; 
      } 

    }
  });

  return null;
};

export default CameraController;