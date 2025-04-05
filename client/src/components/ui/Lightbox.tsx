import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { backdropAnimation, modalAnimation } from "@/lib/animations";

type LightboxProps = {
  isOpen: boolean;
  onClose: () => void;
  image: {
    src: string;
    alt: string;
    title?: string;
    description?: string;
  } | null;
};

export default function Lightbox({ isOpen, onClose, image }: LightboxProps) {
  const [loaded, setLoaded] = useState(false);
  
  // Close on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);
  
  // When a new image is loaded, reset the loaded state
  useEffect(() => {
    setLoaded(false);
  }, [image?.src]);
  
  // Prevent scrolling when lightbox is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);
  
  if (!image) return null;
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-xl p-4"
          variants={backdropAnimation}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose}
        >
          <motion.button
            className="absolute top-6 right-6 text-white/90 z-[55] hover:text-primary transition-colors bg-black/40 backdrop-blur-md p-2 rounded-full"
            onClick={onClose}
            whileHover={{ scale: 1.05 }}
          >
            <X size={24} />
          </motion.button>
          
          <motion.div
            className="relative max-w-[95%] max-h-[90vh] flex flex-col"
            variants={modalAnimation}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              {!loaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
              <img
                src={image.src}
                alt={image.alt}
                className={`max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl ${loaded ? 'opacity-100' : 'opacity-0'}`}
                onLoad={() => setLoaded(true)}
              />
            </div>
            
            {(image.title || image.description) && (
              <div className="mt-6 text-center px-6 py-4 bg-white/5 backdrop-blur-md rounded-xl">
                {image.title && (
                  <h3 className="text-white font-display text-xl tracking-tight">{image.title}</h3>
                )}
                {image.description && (
                  <p className="text-white/70 mt-2 font-light">{image.description}</p>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
