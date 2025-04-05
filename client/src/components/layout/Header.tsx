import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { i18n } from "@/lib/i18n";

type NavLink = {
  href: string;
  label: string;
};

export default function Header() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState(i18n.getLanguage());
  
  const navLinks: NavLink[] = [
    { href: "#home", label: i18n.translate("nav.home") },
    { href: "#portfolio", label: i18n.translate("nav.portfolio") },
    { href: "#about", label: i18n.translate("nav.about") },
    { href: "#contact", label: i18n.translate("nav.contact") },
  ];
  
  // Update language state when i18n language changes
  useEffect(() => {
    const handleLanguageChange = () => {
      setLanguage(i18n.getLanguage());
    };
    
    window.addEventListener("languageChange", handleLanguageChange);
    
    return () => {
      window.removeEventListener("languageChange", handleLanguageChange);
    };
  }, []);
  
  // Detect scroll to change header style
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  // Toggle language
  const toggleLanguage = () => {
    i18n.toggleLanguage();
  };
  
  // Smooth scroll to section
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };
  
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 py-4 ${
        isScrolled ? "bg-primary/90 backdrop-blur-md py-2" : ""
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link href="/">
          <a className="text-xl md:text-2xl font-display font-semibold tracking-wide text-white hover:text-accent transition-colors">
            Сергей <span className="text-accent">Технерядов</span>
          </a>
        </Link>
        
        <div className="hidden md:block">
          <nav className="flex space-x-8 text-sm tracking-wider">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-white hover:text-accent transition-colors uppercase"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href.substring(1));
                }}
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={toggleLanguage}
              className="text-white hover:text-accent transition-colors uppercase"
            >
              {language === "ru" ? "EN" : "RU"}
            </button>
          </nav>
        </div>
        
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-primary/95"
          >
            <nav className="flex flex-col space-y-6 p-8 text-center">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-white text-lg hover:text-accent transition-colors uppercase"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href.substring(1));
                  }}
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={toggleLanguage}
                className="text-white text-lg hover:text-accent transition-colors uppercase"
              >
                {language === "ru" ? "EN" : "RU"}
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
