import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fadeIn, fadeUp } from '@/lib/animations';
import { i18n } from '@/lib/i18n';
import CameraCanvas from './CameraCanvas';

export default function CameraSection() {
  const [isMounted, setIsMounted] = useState(false);

  // Отложенный рендеринг для предотвращения проблем с гидратацией
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className="camera-canvas-section">
      <div className="container mx-auto">
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
          className="max-w-4xl mx-auto"
          variants={fadeIn}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          {isMounted && <CameraCanvas />}
        </motion.div>
      </div>
    </section>
  );
}