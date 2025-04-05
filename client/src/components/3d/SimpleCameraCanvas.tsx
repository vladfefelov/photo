import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import SimpleCameraModel from './SimpleCameraModel';
import { ErrorBoundary } from 'react-error-boundary';
import { i18n } from '@/lib/i18n';
import { motion } from 'framer-motion';
import { fadeUp } from '@/lib/animations';

// Компонент для отображения в случае ошибки
function ErrorFallback() {
  return (
    <div className="error-container p-8 text-center">
      <p className="text-primary mb-4">Не удалось загрузить 3D модель</p>
      <p className="text-sm opacity-70">Возможно, ваш браузер не поддерживает WebGL.</p>
    </div>
  );
}

// Компонент для отображения во время загрузки модели
function Loader() {
  return (
    <div className="loader-container p-8 text-center">
      <p className="text-primary">Загрузка 3D модели...</p>
    </div>
  );
}

export default function SimpleCameraCanvas() {
  return (
    <section className="camera-section py-20 md:py-32 bg-black overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="mb-10 text-center">
          <motion.h2
            className="font-display text-3xl md:text-5xl mb-4"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            {i18n.translate('camera.title')}
          </motion.h2>

          <motion.p
            className="text-white/60 max-w-xl mx-auto mb-8"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            {i18n.translate('camera.description')}
          </motion.p>
        </div>

        <motion.div
          className="relative w-full max-w-2xl mx-auto h-[400px]"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Canvas
              shadows
              camera={{ position: [0, 0, 5], fov: 45 }}
              style={{ background: 'transparent' }}
            >
              <Suspense fallback={null}>
                <SimpleCameraModel />
              </Suspense>
            </Canvas>
          </ErrorBoundary>
        </motion.div>
      </div>
    </section>
  );
}