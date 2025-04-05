import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Testimonial } from "@/lib/types";
import { i18n } from "@/lib/i18n";
import { fadeIn, fadeUp, staggerContainer } from "@/lib/animations";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

type TestimonialsProps = {
  testimonials: Testimonial[];
};

type TestimonialItemProps = {
  testimonial: Testimonial;
};

function TestimonialItem({ testimonial }: TestimonialItemProps) {
  return (
    <motion.div
      className="testimonial-item min-w-[320px] md:min-w-[400px] bg-[#111111] p-6 flex flex-col"
      variants={fadeUp}
    >
      <div className="mb-4 text-accent">
        <Quote size={24} />
      </div>
      <p className="text-gray-300 mb-6 leading-relaxed flex-grow">
        {testimonial.content}
      </p>
      <div className="mt-auto">
        <p className="font-display text-accent">{testimonial.name}</p>
        {testimonial.role && (
          <p className="text-sm text-gray-400">{testimonial.role}</p>
        )}
      </div>
    </motion.div>
  );
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  const { ref, isVisible } = useScrollAnimation();
  const [slidePosition, setSlidePosition] = useState(0);
  const testimonialContainerRef = useRef<HTMLDivElement>(null);
  
  // Handle navigation
  const handlePrev = () => {
    if (testimonialContainerRef.current) {
      testimonialContainerRef.current.scrollBy({
        left: -400,
        behavior: "smooth",
      });
    }
  };
  
  const handleNext = () => {
    if (testimonialContainerRef.current) {
      testimonialContainerRef.current.scrollBy({
        left: 400,
        behavior: "smooth",
      });
    }
  };
  
  // Track scroll position
  useEffect(() => {
    const container = testimonialContainerRef.current;
    if (!container) return;
    
    const handleScroll = () => {
      setSlidePosition(container.scrollLeft);
    };
    
    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);
  
  return (
    <motion.div 
      className="mt-24 md:mt-32"
      variants={staggerContainer}
      initial="hidden"
      animate={isVisible ? "show" : "hidden"}
      ref={ref as any}
    >
      <motion.h3 
        className="font-display text-2xl md:text-3xl mb-12 text-center"
        variants={fadeIn}
      >
        {i18n.translate("about.testimonials")}
      </motion.h3>
      
      <div className="relative">
        <div 
          className="flex gap-8 overflow-x-auto pb-8 hide-scrollbar"
          ref={testimonialContainerRef}
        >
          {testimonials.map((testimonial) => (
            <TestimonialItem key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
        
        {/* Navigation Arrows */}
        <button
          className="testimonial-prev absolute top-1/2 -left-4 transform -translate-y-1/2 bg-primary/80 p-2 rounded-full text-white hover:text-accent focus:outline-none hidden md:flex items-center justify-center"
          onClick={handlePrev}
          aria-label="Previous testimonial"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          className="testimonial-next absolute top-1/2 -right-4 transform -translate-y-1/2 bg-primary/80 p-2 rounded-full text-white hover:text-accent focus:outline-none hidden md:flex items-center justify-center"
          onClick={handleNext}
          aria-label="Next testimonial"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </motion.div>
  );
}
