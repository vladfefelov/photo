import { useState } from "react";
import { motion } from "framer-motion";
import { PortfolioItem } from "@/lib/types";
import Lightbox from "@/components/ui/Lightbox";
import { overlayReveal, portfolioHover, staggerContainer } from "@/lib/animations";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

type PortfolioGridProps = {
  items: PortfolioItem[];
  activeCategory: number | null;
};

export default function PortfolioGrid({ items, activeCategory }: PortfolioGridProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{
    src: string;
    alt: string;
    title?: string;
    description?: string;
  } | null>(null);
  const { ref, isVisible } = useScrollAnimation();
  
  const filteredItems = activeCategory 
    ? items.filter(item => item.categoryId === activeCategory)
    : items;
  
  const openLightbox = (item: PortfolioItem) => {
    setSelectedImage({
      src: item.imageUrl,
      alt: item.title,
      title: item.title,
      description: item.description || undefined
    });
    setLightboxOpen(true);
  };
  
  return (
    <>
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8"
        variants={staggerContainer}
        initial="hidden"
        animate={isVisible ? "show" : "hidden"}
        ref={ref as any}
      >
        {filteredItems.map((item) => (
          <motion.div
            key={item.id}
            className="portfolio-item rounded-xl overflow-hidden group cursor-pointer shadow-lg"
            variants={portfolioHover}
            initial="rest"
            whileHover="hover"
            onClick={() => openLightbox(item)}
          >
            <div className="overflow-hidden">
              <motion.img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover"
                variants={portfolioHover}
              />
            </div>
            
            <motion.div 
              className="portfolio-overlay"
              variants={overlayReveal}
            >
              <h3 className="text-white font-display text-xl md:text-2xl mb-2 tracking-tight">{item.title}</h3>
              {item.description && (
                <p className="text-white/70 text-sm font-light">{item.description}</p>
              )}
              <span className="mt-4 px-3 py-1 rounded-full text-xs bg-white/10 text-white/90 backdrop-blur-sm">
                Смотреть
              </span>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
      
      <Lightbox 
        isOpen={lightboxOpen} 
        onClose={() => setLightboxOpen(false)} 
        image={selectedImage} 
      />
    </>
  );
}
