import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { PresentationControls, Environment, ContactShadows, Float, useGLTF } from '@react-three/drei';
import { Group } from 'three';

// Custom hook для отслеживания скролла
const useScroll = () => {
  const scrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      scrollY.current = window.scrollY / 500; // Нормализуем значение скролла
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollY;
};

export function CameraModel(props: { scale?: number }) {
  const { scale = 0.5 } = props;
  const group = useRef<Group>(null);
  const scrollY = useScroll();
  
  // Вращаем модель при скролле
  useFrame(() => {
    if (group.current) {
      // Плавное вращение на основе скролла
      group.current.rotation.y = scrollY.current * 0.5;
      // Небольшое покачивание
      group.current.rotation.x = Math.sin(scrollY.current * 0.3) * 0.1;
    }
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <PresentationControls
        global
        rotation={[0.13, 0.1, 0]}
        polar={[-0.4, 0.2]}
        azimuth={[-1, 0.75]}
        config={{ mass: 2, tension: 400 }}
        snap={{ mass: 4, tension: 400 }}
      >
        <Float rotationIntensity={0.4}>
          <primitive 
            object={useGLTF('/attached_assets/camera_canon_eos_400d.glb').scene} 
            scale={scale} 
            position={[0, -0.5, 0]}
          />
        </Float>
      </PresentationControls>
      
      {/* Добавляем тень */}
      <ContactShadows 
        position={[0, -1.5, 0]} 
        opacity={0.75} 
        scale={10} 
        blur={2.5} 
        far={1} 
      />
      
      {/* Добавляем окружение */}
      <Environment preset="city" />
    </group>
  );
}

export default CameraModel;