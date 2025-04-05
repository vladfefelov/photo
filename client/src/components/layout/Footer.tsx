import { Link } from "wouter";
import { i18n } from "@/lib/i18n";

type FooterLink = {
  href: string;
  label: string;
};

export default function Footer() {
  const footerLinks: FooterLink[] = [
    { href: "#home", label: i18n.translate("nav.home") },
    { href: "#portfolio", label: i18n.translate("nav.portfolio") },
    { href: "#about", label: i18n.translate("nav.about") },
    { href: "#contact", label: i18n.translate("nav.contact") },
  ];
  
  // Smooth scroll to section
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  
  return (
    <footer className="py-8 bg-primary border-t border-[#222222]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-black font-medium text-sm">
              {i18n.translate("footer.copyright")}
            </p>
          </div>
          
          <div>
            <nav className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-xs text-black font-medium">
              {footerLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="hover:text-accent transition-colors uppercase"
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
        </div>
      </div>
    </footer>
  );
}
