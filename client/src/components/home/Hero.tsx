import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { i18n } from "@/lib/i18n";
import { fadeIn, fadeUp, textReveal } from "@/lib/animations";

export default function Hero() {
  const scrollToPortfolio = () => {
    const portfolioSection = document.getElementById("portfolio");
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  
  return (
    <section
      id="home"
      className="h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="relative h-full w-full overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1621396302872-0a3657427424?auto=format&fit=crop&q=80&w=2000"
            alt="Artistic photography showcase"
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/50 to-primary/90"></div>
        </div>
      </div>
      
      {/* Hero Content */}
      <div className="container mx-auto px-6 z-10 text-center">
        <motion.h1 
          className="font-display text-4xl md:text-6xl lg:text-7xl mb-4 tracking-wider font-light"
          variants={fadeIn}
          initial="hidden"
          animate="show"
        >
          <motion.span className="inline-block overflow-hidden">
            <motion.span 
              className="inline-block"
              variants={textReveal}
              initial="hidden"
              animate="show"
            >
              {i18n.translate("hero.title")}
            </motion.span>
          </motion.span>
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl font-light max-w-2xl mx-auto mb-8 text-gray-300"
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          {i18n.translate("hero.subtitle")}
        </motion.p>
        
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.3 }}
        >
          <button
            onClick={scrollToPortfolio}
            className="inline-block px-8 py-3 border border-accent text-accent hover:bg-accent hover:text-primary transition-all duration-300 uppercase tracking-widest text-sm"
          >
            {i18n.translate("hero.button")}
          </button>
        </motion.div>
        
        {/* Scroll Down Indicator */}
        <motion.div 
          className="absolute bottom-12 left-0 right-0 text-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <button 
            onClick={scrollToPortfolio}
            className="text-gray-400 hover:text-accent transition-colors"
            aria-label="Scroll down to portfolio"
          >
            <ChevronDown size={24} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
