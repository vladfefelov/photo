import { motion } from "framer-motion";
import { i18n } from "@/lib/i18n";
import { fadeIn, fadeUp, slideInLeft, slideInRight } from "@/lib/animations";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

type StatItemProps = {
  value: string;
  label: string;
  delay?: number;
};

function StatItem({ value, label, delay = 0 }: StatItemProps) {
  return (
    <motion.div 
      className="px-4 py-2 bg-[#111111] rounded-sm"
      variants={fadeUp}
      transition={{ delay }}
    >
      <h4 className="text-accent font-bold mb-1">{value}</h4>
      <p className="text-sm text-gray-400">{label}</p>
    </motion.div>
  );
}

export default function AboutSection() {
  const { ref, isVisible } = useScrollAnimation();
  
  return (
    <section
      id="about"
      className="py-20 md:py-32 bg-gradient-to-b from-primary to-neutral"
      ref={ref as any}
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* About Content */}
          <motion.div 
            className="order-2 md:order-1"
            variants={slideInLeft}
            initial="hidden"
            animate={isVisible ? "show" : "hidden"}
          >
            <h2 className="font-display text-3xl md:text-5xl mb-8">
              {i18n.translate("about.title")}
            </h2>
            
            <motion.p 
              className="text-gray-300 mb-6 leading-relaxed"
              variants={fadeUp}
            >
              {i18n.translate("about.bio1")}
            </motion.p>
            
            <motion.p 
              className="text-gray-300 mb-6 leading-relaxed"
              variants={fadeUp}
              transition={{ delay: 0.1 }}
            >
              {i18n.translate("about.bio2")}
            </motion.p>
            
            <motion.p 
              className="text-gray-300 mb-8 leading-relaxed"
              variants={fadeUp}
              transition={{ delay: 0.2 }}
            >
              {i18n.translate("about.bio3")}
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4 mt-8"
              variants={fadeIn}
              transition={{ delay: 0.3 }}
            >
              <StatItem 
                value="150+" 
                label={i18n.translate("about.stats.clients")} 
                delay={0.3}
              />
              <StatItem 
                value="7+" 
                label={i18n.translate("about.stats.experience")} 
                delay={0.4}
              />
              <StatItem 
                value="20K+" 
                label={i18n.translate("about.stats.photos")} 
                delay={0.5}
              />
            </motion.div>
          </motion.div>
          
          {/* Photographer Image */}
          <motion.div 
            className="order-1 md:order-2 relative"
            variants={slideInRight}
            initial="hidden"
            animate={isVisible ? "show" : "hidden"}
          >
            <div className="relative mx-auto w-full max-w-md">
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-accent"></div>
              <img
                src="https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=600&h=800"
                alt="Sergey Tekneryad Portrait"
                className="relative z-10 w-full"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
