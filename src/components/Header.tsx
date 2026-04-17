import { useState } from "react";
import { Menu, X, ExternalLink } from "lucide-react";
import vnutLogo from "@/assets/vnut-logo.png";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Meme", href: "#meme"},
    { name: "Chart", href: "#chart"},
    { name: "Tokenomics", href: "#tokenomics" },
    { name: "How to Buy", href: "#how-to-buy" },
    { name: "Roadmap", href: "#roadmap" },
    { name: "Community", href: "#community" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group">
            <img 
              src={vnutLogo} 
              alt="asteroid Logo" 
              className="w-10 h-10 md:w-12 w:h-12 rounded-sm shadow-lg group-hover:scale-110 transition-transform"
            />
            <div className="hidden sm:block">
              <h1 className="font-display text-xl font-bold text-foreground">
                ASTEROID
              </h1>
              <p className="text-xs text-muted-foreground font-medium">The Mascot of SpaceX</p>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-semibold text-foreground/80 hover:text-primary transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* CTA Buttons & Theme Toggle */}
          <div className="flex items-center absolute md:relative right-[6rem] md:right-[unset] gap-3">
            <ThemeToggle />
            <a
              href="https://pump.fun/coin/F1ppSHedBsGGwEKH78JVgoqr4xkQHswtsGGLpgM7bCP2"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden xl:flex btn-hero text-sm py-2 px-4 items-center gap-2"
            >
              Buy on Pumpfun
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile/Tablet Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="xl:hidden p-2 rounded-xl bg-card border border-border"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile/Tablet Menu */}
        {isMenuOpen && (
          <nav className="xl:hidden mt-4 pb-4 animate-slide-up">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="font-semibold text-foreground/80 hover:text-primary transition-colors py-2 px-4 rounded-xl hover:bg-card"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
