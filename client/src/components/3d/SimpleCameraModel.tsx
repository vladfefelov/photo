import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { Mesh, Object3D, Group } from 'three';

// Определяем путь к модели
const MODEL_PATH = './attached_assets/camera_canon_eos_400d.glb';

export function SimpleCameraModel() {
  // Загружаем модель
  const { scene } = useGLTF(MODEL_PATH);
  const modelRef = useRef<Group>(null);

  // Простая анимация вращения
  useFrame((state) => {
    if (modelRef.current) {
      modelRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <group position={[0, 0, 0]} ref={modelRef}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} castShadow />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} />
      
      {/* Клонируем сцену, чтобы избежать мутации оригинала */}
      <primitive object={scene.clone()} scale={0.01} position={[0, -1, 0]} />
    </group>
  );
}

export default SimpleCameraModel;

// Предзагрузка модели
useGLTF.preload(MODEL_PATH);