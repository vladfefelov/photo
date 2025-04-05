import { Variants } from "framer-motion";

// Staggered fade in animation for children
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Fade up animation for elements
export const fadeUp: Variants = {
  hidden: { 
    opacity: 0, 
    y: 30 
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1.0],
    },
  },
};

// Fade in animation
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeInOut",
    },
  },
};

// Slide in from right
export const slideInRight: Variants = {
  hidden: { 
    x: 100,
    opacity: 0 
  },
  show: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1.0],
    },
  },
};

// Slide in from left
export const slideInLeft: Variants = {
  hidden: { 
    x: -100,
    opacity: 0 
  },
  show: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1.0],
    },
  },
};

// Text reveal animation for hero text
export const textReveal: Variants = {
  hidden: { 
    y: 100,
    opacity: 0
  },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.215, 0.61, 0.355, 1],
    },
  },
};

// Scale animation for images
export const scaleUp: Variants = {
  hidden: { 
    scale: 0.8,
    opacity: 0
  },
  show: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1.0],
    },
  },
};

// Portfolio item hover animation
export const portfolioHover: Variants = {
  rest: { 
    scale: 1
  },
  hover: { 
    scale: 1.05,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1.0],
    }
  }
};

// Overlay animation for portfolio items
export const overlayReveal: Variants = {
  rest: { 
    opacity: 0
  },
  hover: { 
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    }
  }
};

// Modal animation
export const modalAnimation: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1.0],
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.2,
      ease: [0.25, 0.1, 0.25, 1.0],
    },
  },
};

// Backdrop animation
export const backdropAnimation: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};
