import * as THREE from 'three';

// ランダムな色を生成する関数
export const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '0x';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return parseInt(color, 16);
};

// 立方体のジオメトリを生成する関数
export const createBoxGeometry = (size = 1) => {
  return new THREE.BoxGeometry(size, size, size);
};

// 立方体のマテリアルを生成する関数
export const createBoxMaterial = (color = 0xffffff) => {
  return new THREE.MeshBasicMaterial({ color });
};

// 立方体のメッシュを生成する関数
export const createBoxMesh = (geometry, material) => {
  return new THREE.Mesh(geometry, material);
};

// カメラを生成する関数
export const createCamera = (fov = 75, aspect, near = 0.1, far = 1000) => {
  return new THREE.PerspectiveCamera(fov, aspect, near, far);
};

// レンダラーを生成する関数
export const createRenderer = (container, options = {}) => {
  const renderer = new THREE.WebGLRenderer(options);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);
  return renderer;
};