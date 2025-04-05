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
      className="h-screen flex items-center justify-center relative overflow-hidden bg-black"
    >
      {/* Modern Apple-style Gradient Background */}
      <div className="absolute inset-0 z-0">
        <div className="relative h-full w-full overflow-hidden">
          <img
            src="/assets/upscalemedia-transformed.jpeg" 
            alt="Artistic photography showcase"
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black"></div>
          
          {/* Subtle Apple-style Blue Accent */}
          <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-primary/20 to-transparent opacity-40"></div>
        </div>
      </div>
      
      {/* Hero Content */}
      <div className="container mx-auto px-6 z-10 text-center">
        <motion.h1 
          className="font-display text-4xl md:text-6xl lg:text-7xl mb-6 tracking-tight"
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
          className="text-xl md:text-2xl font-light max-w-2xl mx-auto mb-10 text-gray-300"
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
          className="flex flex-col md:flex-row gap-4 justify-center"
        >
          <button
            onClick={scrollToPortfolio}
            className="btn-apple"
          >
            {i18n.translate("hero.button")}
          </button>
          
          <button
            onClick={() => {
              const contactSection = document.getElementById("contact");
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="btn-apple-outline"
          >
            {i18n.translate("contact.title")}
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
            className="text-white/60 hover:text-primary transition-colors rounded-full bg-white/5 p-3"
            aria-label="Scroll down to portfolio"
          >
            <ChevronDown size={20} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
