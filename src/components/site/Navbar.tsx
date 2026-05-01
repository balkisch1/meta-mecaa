import { Menu, X, Phone } from "lucide-react";
import { useState, useEffect } from "react";

const links = [
  { href: "#accueil", label: "Accueil" },
  { href: "#services", label: "Services" },
  { href: "#process", label: "Process" },
  { href: "#projets", label: "Projets" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? "glass shadow-card py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">

        {/* Logo */}
        <a href="#accueil" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-sm bg-gradient-gold flex items-center justify-center font-display font-bold text-gold-foreground shadow-gold">
            M
          </div>
          <div className="leading-tight">
            <div className={`font-display text-lg font-semibold ${scrolled ? "text-foreground" : "text-white"}`}>
              Meta Meca
            </div>
            <div className={`text-[10px] tracking-[0.2em] uppercase ${scrolled ? "text-muted-foreground" : "text-white/70"}`}>
              Industries
            </div>
          </div>
        </a>

        {/* Desktop links */}
        <nav className="hidden lg:flex items-center gap-10">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`text-sm font-medium tracking-wide transition-colors relative after:absolute after:left-0 after:-bottom-1 after:h-px after:w-0 after:bg-gold after:transition-all hover:after:w-full ${
                scrolled ? "text-foreground hover:text-gold" : "text-white/90 hover:text-gold"
              }`}
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* Phone */}
        <a
          href="tel:94703066"
          className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-gold text-gold-foreground rounded-sm text-sm font-semibold shadow-gold hover:scale-105 transition-transform"
        >
          <Phone className="w-4 h-4" />
          94 703 066
        </a>

        {/* Mobile button */}
        <button
          onClick={() => setOpen(!open)}
          className={`lg:hidden p-2 ${scrolled ? "text-foreground" : "text-white"}`}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden glass border-t border-border">
          <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-foreground hover:text-gold py-2 border-b border-border/50"
              >
                {l.label}
              </a>
            ))}

            <a
              href="tel:94703066"
              className="mt-2 inline-flex items-center justify-center gap-2 px-5 py-3 bg-gradient-gold text-gold-foreground rounded-sm font-semibold"
            >
              <Phone className="w-4 h-4" /> 94 703 066
            </a>
          </div>
        </div>
      )}
    </header>
  );
}