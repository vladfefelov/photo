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
          {/* Стилизованная DSLR камера */}
          <group 
            scale={scale}
            position={[0, -0.5, 0]}
          >
            {/* Основной корпус */}
            <mesh>
              <boxGeometry args={[1, 0.8, 0.6]} />
              <meshStandardMaterial color="#222" roughness={0.5} metalness={0.8} />
            </mesh>
            
            {/* Объектив */}
            <mesh position={[0, 0, 0.45]}>
              <cylinderGeometry args={[0.25, 0.3, 0.6, 32]} />
              <meshStandardMaterial color="#111" roughness={0.3} metalness={0.9} />
            </mesh>
            
            {/* Кольца объектива - золотого цвета */}
            <mesh position={[0, 0, 0.6]}>
              <torusGeometry args={[0.27, 0.03, 16, 32]} />
              <meshStandardMaterial color="#d4af37" roughness={0.2} metalness={0.9} />
            </mesh>
            
            <mesh position={[0, 0, 0.7]}>
              <torusGeometry args={[0.25, 0.03, 16, 32]} />
              <meshStandardMaterial color="#d4af37" roughness={0.2} metalness={0.9} />
            </mesh>
            
            {/* Видоискатель */}
            <mesh position={[0, 0.5, 0.1]}>
              <boxGeometry args={[0.6, 0.2, 0.3]} />
              <meshStandardMaterial color="#111" roughness={0.5} metalness={0.8} />
            </mesh>
            
            {/* Вспышка */}
            <mesh position={[-0.3, 0.5, 0]}>
              <boxGeometry args={[0.1, 0.1, 0.1]} />
              <meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={0.2} />
            </mesh>
            
            {/* Кнопка спуска затвора - золотого цвета */}
            <mesh position={[-0.5, 0.3, 0]}>
              <cylinderGeometry args={[0.08, 0.08, 0.08, 16]} />
              <meshStandardMaterial color="#d4af37" roughness={0.3} metalness={0.8} />
            </mesh>
            
            {/* Диск управления */}
            <mesh position={[-0.4, 0.45, 0]} rotation={[Math.PI/2, 0, 0]}>
              <cylinderGeometry args={[0.15, 0.15, 0.05, 32]} />
              <meshStandardMaterial color="#111" roughness={0.5} metalness={0.9} />
            </mesh>
            
            {/* Ремень для камеры (золотые элементы) */}
            <mesh position={[0.5, 0.3, 0]}>
              <boxGeometry args={[0.1, 0.1, 0.1]} />
              <meshStandardMaterial color="#d4af37" roughness={0.3} metalness={0.8} />
            </mesh>
            
            <mesh position={[-0.5, 0.3, -0.3]}>
              <boxGeometry args={[0.1, 0.1, 0.1]} />
              <meshStandardMaterial color="#d4af37" roughness={0.3} metalness={0.8} />
            </mesh>
            
            {/* Экран на задней панели */}
            <mesh position={[0, 0, -0.31]} rotation={[0, Math.PI, 0]}>
              <boxGeometry args={[0.7, 0.5, 0.01]} />
              <meshStandardMaterial color="#111" roughness={0.2} metalness={0.7} />
            </mesh>
            
            {/* Логотип (золотой цвет) */}
            <mesh position={[-0.2, 0.45, -0.31]} rotation={[0, Math.PI, 0]}>
              <boxGeometry args={[0.3, 0.1, 0.01]} />
              <meshStandardMaterial color="#d4af37" roughness={0.2} metalness={0.9} />
            </mesh>
          </group>
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