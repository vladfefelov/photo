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
            className="portfolio-item rounded-sm overflow-hidden group cursor-pointer"
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
              <h3 className="text-white font-display text-xl md:text-2xl mb-2">{item.title}</h3>
              {item.description && (
                <p className="text-gray-300 text-sm">{item.description}</p>
              )}
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
