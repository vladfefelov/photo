import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorHovered, setCursorHovered] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(false);
  
  useEffect(() => {
    const mql = window.matchMedia('(min-width: 768px)');
    
    if (!mql.matches) {
      return;
    }
    
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    const handleMouseEnter = () => {
      setCursorVisible(true);
    };
    
    const handleMouseLeave = () => {
      setCursorVisible(false);
    };
    
    const addHoverListeners = () => {
      const interactiveElements = document.querySelectorAll('a, button, .portfolio-item');
      
      interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => setCursorHovered(true));
        el.addEventListener('mouseleave', () => setCursorHovered(false));
      });
    };
    
    window.addEventListener('mousemove', updateMousePosition);
    document.body.addEventListener('mouseenter', handleMouseEnter);
    document.body.addEventListener('mouseleave', handleMouseLeave);
    
    // Initial check & setup for interactive elements
    addHoverListeners();
    
    // Setup a mutation observer to add listeners to new elements
    const observer = new MutationObserver((mutations) => {
      addHoverListeners();
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      observer.disconnect();
    };
  }, []);
  
  return (
    <>
      <motion.div
        className="hidden md:block fixed w-2 h-2 rounded-full bg-accent z-[9999] pointer-events-none"
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
          opacity: cursorVisible ? 1 : 0,
        }}
        transition={{ duration: 0.1, ease: 'linear' }}
        style={{
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
      <motion.div
        className="hidden md:block fixed w-10 h-10 border border-accent rounded-full z-[9998] pointer-events-none"
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
          scale: cursorHovered ? 1.5 : 1,
          opacity: cursorVisible ? 1 : 0,
          backgroundColor: cursorHovered ? "rgba(230, 200, 160, 0.1)" : "transparent",
        }}
        transition={{ duration: 0.2, ease: 'linear' }}
        style={{
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </>
  );
}
