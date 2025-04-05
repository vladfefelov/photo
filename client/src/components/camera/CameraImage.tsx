import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { i18n } from '@/lib/i18n';
import cameraImage from '@assets/eos-r5_front_rf24-105mmf4lisusm_32c26ad194234d42b3cd9e582a21c99b.png';

export default function CameraImage() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.2 });

  return (
    <section className="camera-section py-20 md:py-32 bg-black overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="mb-10 text-center">
          <motion.h2
            className="font-display text-3xl md:text-5xl mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            {i18n.translate('camera.title')}
          </motion.h2>

          <motion.p
            className="text-white/60 max-w-xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {i18n.translate('camera.description')}
          </motion.p>
        </div>

        <div 
          className="relative w-full max-w-3xl mx-auto h-[400px] md:h-[500px] flex items-center justify-center"
          ref={ref}
        >
          {/* Светящийся круг под камерой */}
          <motion.div
            className="absolute w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full bg-primary/10 blur-2xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 0.5 } : { scale: 0.8, opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />

          {/* Анимированные золотые частицы */}
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-primary"
              initial={{ 
                x: 0, 
                y: 0, 
                opacity: 0,
                scale: 0
              }}
              animate={inView ? { 
                x: Math.sin(i * 45 * (Math.PI / 180)) * 150, 
                y: Math.cos(i * 45 * (Math.PI / 180)) * 150,
                opacity: [0, 1, 0],
                scale: [0, 1, 0]
              } : {}}
              transition={{ 
                duration: 3, 
                ease: "easeInOut", 
                repeat: Infinity, 
                delay: i * 0.2,
                repeatDelay: 0.5
              }}
            />
          ))}

          {/* Изображение камеры с золотой подсветкой */}
          <motion.div
            className="relative z-10"
            initial={{ y: 20, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Тень под камерой */}
            <div className="absolute bottom-[-20px] left-1/2 transform -translate-x-1/2 w-[80%] h-[20px] bg-primary/20 blur-md rounded-full" />
            
            {/* Основное изображение камеры */}
            <motion.img
              src={cameraImage}
              alt="Canon EOS R5 Camera"
              className="w-[300px] md:w-[400px] object-contain relative z-10"
              whileHover={{ 
                scale: 1.05,
                filter: "drop-shadow(0 0 8px rgba(212, 175, 55, 0.7))",
                transition: { duration: 0.3 }
              }}
              animate={inView ? { 
                y: [0, -10, 0], 
                rotateZ: [-1, 1, -1]
              } : {}}
              transition={{ 
                y: { 
                  duration: 4, 
                  repeat: Infinity,
                  ease: "easeInOut"
                },
                rotateZ: {
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            />

            {/* Блик на объективе */}
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[80px] h-[80px] bg-white/20 rounded-full blur-md"
              animate={inView ? { 
                opacity: [0, 0.4, 0],
              } : {}}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                repeatDelay: 1 
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}