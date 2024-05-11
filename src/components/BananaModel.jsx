import React from 'react';
import { Gltf, useGLTF } from '@react-three/drei';

const BananaModel = ({ position }) => {
  const { scene } = useGLTF('/banana_toon/scene.gltf');

  return (
    <Gltf src="/banana_toon/scene.gltf" scale={2} object={scene} position={position} />
  );
}

export default BananaModel;