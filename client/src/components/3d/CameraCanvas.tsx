import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import CameraModel from './CameraModel';
import { ErrorBoundary } from 'react-error-boundary';

// Компонент для отображения в случае ошибки
function ErrorFallback() {
  return (
    <div className="error-container p-8 text-center">
      <p className="text-primary mb-4">Не удалось загрузить 3D модель</p>
      <p className="text-sm opacity-70">Возможно, ваш браузер не поддерживает WebGL.</p>
    </div>
  );
}

// Компонент канваса с 3D моделью камеры
export default function CameraCanvas() {
  return (
    <div className="camera-canvas-container h-[500px] w-full">
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Canvas
          shadows
          dpr={[1, 2]}
          camera={{ position: [0, 0, 4], fov: 50 }}
          gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        >
          <color attach="background" args={['#000000']} />
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
          
          <Suspense fallback={null}>
            <CameraModel scale={2.0} />
          </Suspense>
        </Canvas>
      </ErrorBoundary>
    </div>
  );
}