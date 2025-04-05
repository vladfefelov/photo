import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import PortfolioFilters from "@/components/portfolio/PortfolioFilters";
import PortfolioGrid from "@/components/portfolio/PortfolioGrid";
import AboutSection from "@/components/about/AboutSection";
import Testimonials from "@/components/about/Testimonials";
import ContactForm from "@/components/contact/ContactForm";
import CustomCursor from "@/components/ui/CustomCursor";
import { i18n } from "@/lib/i18n";
import { Category, PortfolioItem, Testimonial } from "@/lib/types";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  
  // Fetch portfolio data
  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });
  
  const { data: portfolioItems = [] } = useQuery<PortfolioItem[]>({
    queryKey: ["/api/portfolio"],
  });
  
  const { data: testimonials = [] } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });
  
  // Language change listener to force component re-render
  useEffect(() => {
    const handleLanguageChange = () => {
      // Force re-render by setting state
      setActiveCategory(activeCategory);
    };
    
    window.addEventListener("languageChange", handleLanguageChange);
    
    return () => {
      window.removeEventListener("languageChange", handleLanguageChange);
    };
  }, [activeCategory]);
  
  return (
    <>
      <Header />
      <CustomCursor />
      
      <main>
        <Hero />
        
        {/* Portfolio Section */}
        <section id="portfolio" className="py-20 md:py-32 bg-primary">
          <div className="container mx-auto px-6">
            <div className="mb-16 md:mb-24 text-center">
              <motion.h2 
                className="font-display text-3xl md:text-5xl mb-4"
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
              >
                {i18n.translate("portfolio.title")}
              </motion.h2>
              <motion.p 
                className="text-neutral-light max-w-xl mx-auto"
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
              >
                {i18n.translate("portfolio.description")}
              </motion.p>
            </div>
            
            <PortfolioFilters
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
            
            <PortfolioGrid
              items={portfolioItems}
              activeCategory={activeCategory}
            />
          </div>
        </section>
        
        <AboutSection />
        
        <Testimonials testimonials={testimonials} />
        
        <ContactForm />
      </main>
      
      <Footer />
    </>
  );
}
