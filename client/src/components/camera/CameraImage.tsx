import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { i18n } from '@/lib/i18n';
import { fadeUp } from '@/lib/animations';

// Custom hook для эффекта параллакса при скролле
const useParallax = (speed = 0.1) => {
  const ref = useRef<HTMLDivElement>(null);
  const scrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        scrollY.current = window.scrollY;
        const yPos = scrollY.current * speed;
        ref.current.style.transform = `translateY(${yPos}px) rotateY(${yPos * 0.05}deg)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return ref;
};

export default function CameraImage() {
  const imageRef = useParallax(0.05);
  
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
          className="relative w-full max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div ref={imageRef} className="relative">
            {/* Основное изображение камеры */}
            <motion.div 
              className="w-full bg-gradient-to-r from-black via-neutral-900 to-black p-12 rounded-xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mx-auto w-full max-w-md aspect-[4/3] flex items-center justify-center">
                {/* Стилизованное изображение камеры */}
                <div className="relative w-full">
                  {/* Корпус камеры */}
                  <div className="bg-neutral-800 w-full h-48 rounded-lg shadow-xl border border-neutral-700 relative">
                    {/* Объектив */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28">
                      <div className="absolute inset-0 bg-black rounded-full"></div>
                      {/* Золотые кольца объектива */}
                      <div className="absolute inset-2 border-2 border-primary rounded-full"></div>
                      <div className="absolute inset-6 border-2 border-primary rounded-full"></div>
                      <div className="absolute inset-10 border-2 border-primary rounded-full"></div>
                      {/* Блик */}
                      <div className="absolute top-2 right-4 w-3 h-3 bg-white/40 rounded-full"></div>
                    </div>
                    
                    {/* Видоискатель */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-20 h-10 bg-neutral-900 rounded-sm shadow-lg"></div>
                    
                    {/* Кнопка спуска затвора (золотая) */}
                    <div className="absolute top-4 right-6 w-6 h-6 bg-primary rounded-full shadow-lg"></div>
                    
                    {/* Элементы управления */}
                    <div className="absolute bottom-4 right-4 w-16 h-4 bg-neutral-700 rounded-full"></div>
                    <div className="absolute bottom-10 right-6 w-8 h-8 bg-neutral-700 rounded-full border border-primary"></div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Декоративные элементы */}
            <motion.div
              className="absolute -bottom-10 -right-10 w-24 h-24 bg-primary/10 rounded-full blur-xl"
              animate={{ scale: [1, 1.05, 1], opacity: [0.6, 0.8, 0.6] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute -top-5 -left-5 w-20 h-20 bg-primary/10 rounded-full blur-xl"
              animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.7, 0.5] }}
              transition={{ duration: 3, delay: 1, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          
          {/* Тень */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-4 bg-black/50 blur-xl rounded-full"></div>
        </motion.div>
      </div>
    </section>
  );
}