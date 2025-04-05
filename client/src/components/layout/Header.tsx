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
  
  const navLinks: NavLink[] = [
    { href: "#home", label: i18n.translate("nav.home") },
    { href: "#portfolio", label: i18n.translate("nav.portfolio") },
    { href: "#about", label: i18n.translate("nav.about") },
    { href: "#contact", label: i18n.translate("nav.contact") },
  ];
  
  // Detect scroll to change header style
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
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
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 py-4 ${
        isScrolled ? "bg-black/80 backdrop-blur-lg py-3 border-b border-white/10" : ""
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link href="/">
          <a className="text-xl md:text-2xl font-display tracking-tight text-white hover:text-primary transition-colors">
            Сергей <span className="text-primary">Технерядов</span>
          </a>
        </Link>
        
        <div className="hidden md:block">
          <nav className="flex items-center space-x-6 text-sm">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-white/90 hover:text-primary transition-colors font-medium"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href.substring(1));
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
        
        <button
          className="md:hidden text-white focus:outline-none rounded-full p-1 hover:bg-white/10"
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
            className="md:hidden overflow-hidden bg-black/90 backdrop-blur-lg border-b border-white/10"
          >
            <nav className="flex flex-col space-y-5 p-6 text-center">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-white/90 text-lg hover:text-primary transition-colors py-2"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href.substring(1));
                  }}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
