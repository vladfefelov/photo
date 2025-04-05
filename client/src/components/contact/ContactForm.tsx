import { motion } from "framer-motion";
import { Mail, Phone, MessageSquare } from "lucide-react";
import { i18n } from "@/lib/i18n";
import { fadeIn, fadeUp, staggerContainer } from "@/lib/animations";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function ContactSection() {
  const { ref, isVisible } = useScrollAnimation();
  
  return (
    <section
      id="contact"
      className="py-20 md:py-32 bg-black"
      ref={ref as any}
    >
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-display mb-12"
            variants={fadeUp}
            initial="hidden"
            animate={isVisible ? "show" : "hidden"}
          >
            {i18n.translate("contact.title")}
          </motion.h2>
          
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-3xl mx-auto"
            variants={staggerContainer}
            initial="hidden"
            animate={isVisible ? "show" : "hidden"}
          >
            {/* Email */}
            <motion.div 
              variants={fadeIn}
              className="flex flex-col items-center space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-[#1c1c1c] flex items-center justify-center mb-2">
                <Mail size={28} className="text-primary" />
              </div>
              <h3 className="text-xl font-display text-white">{i18n.translate("contact.email")}</h3>
              <a 
                href="mailto:tehnichka.migelya@gmail.com" 
                className="text-gray-300 hover:text-primary transition-colors"
              >
                tehnichka.migelya@gmail.com
              </a>
            </motion.div>
            
            {/* Phone */}
            <motion.div 
              variants={fadeIn}
              className="flex flex-col items-center space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-[#1c1c1c] flex items-center justify-center mb-2">
                <Phone size={28} className="text-primary" />
              </div>
              <h3 className="text-xl font-display text-white">{i18n.translate("contact.phone")}</h3>
              <a 
                href="tel:+77478225648" 
                className="text-gray-300 hover:text-primary transition-colors"
              >
                +7 (747) 822-5648
              </a>
            </motion.div>
            
            {/* WhatsApp */}
            <motion.div 
              variants={fadeIn}
              className="flex flex-col items-center space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-[#1c1c1c] flex items-center justify-center mb-2">
                <MessageSquare size={28} className="text-primary" />
              </div>
              <h3 className="text-xl font-display text-white">WhatsApp</h3>
              <a 
                href="https://wa.me/37258391846" 
                className="text-gray-300 hover:text-primary transition-colors"
              >
                +372 5839 1846
              </a>
            </motion.div>
          </motion.div>
          
          <motion.p 
            className="text-gray-400 mt-16 max-w-2xl mx-auto"
            variants={fadeUp}
            initial="hidden"
            animate={isVisible ? "show" : "hidden"}
          >
            {i18n.translate("contact.availability")}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
