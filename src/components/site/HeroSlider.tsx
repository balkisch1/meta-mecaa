import { useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import hero1 from "../../assets/hero-1-interior.jpg";
import hero2 from "../../assets/hero-2-fabrication.jpg";
import hero3 from "../../assets/hero-3-stairs.jpg";
import hero4 from "../../assets/hero-4-3d.jpg";

const slides = [
  {
    image: hero1,
    eyebrow: "Meta Meca Industries",
    title: "Solutions sur mesure en menuiserie & fabrication métallique",
    subtitle: "Design • Qualité • Sur mesure",
    primary: { label: "Découvrir", href: "#services" },
    secondary: { label: "Nous contacter", href: "#contact" },
  },
  {
    image: hero2,
    eyebrow: "Savoir-faire",
    title: "Fabrication artisanale & industrielle",
    subtitle: "Bois, métal et finitions de haute qualité",
    primary: { label: "Nos services", href: "#services" },
    secondary: { label: "Demander un devis", href: "#contact" },
  },
  {
    image: hero3,
    eyebrow: "Réalisations",
    title: "Escaliers, portes & mobilier sur mesure",
    subtitle: "Des créations adaptées à chaque espace",
    primary: { label: "Voir les projets", href: "#projets" },
    secondary: { label: "Nous contacter", href: "#contact" },
  },
  {
    image: hero4,
    eyebrow: "Conception 3D",
    title: "Visualisez avant de construire",
    subtitle: "Conception 2D & 3D pour tous vos projets",
    primary: { label: "Notre process", href: "#process" },
    secondary: { label: "Demander un rendu", href: "#contact" },
  },
];

export function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = useCallback((i: number) => setIndex((i + slides.length) % slides.length), []);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), 5500);
    return () => clearInterval(t);
  }, [paused]);

  return (
    <section
      id="accueil"
      className="relative h-screen min-h-[640px] w-full overflow-hidden bg-primary"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {slides.map((s, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-[1400ms] ease-out ${
            i === index ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          aria-hidden={i !== index}
        >
          <img
            src={s.image}
            alt=""
            className={`absolute inset-0 w-full h-full object-cover ${i === index ? "ken-burns" : ""}`}
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

          <div className="relative z-10 h-full container mx-auto px-6 flex items-center">
            <div className="max-w-3xl">
              {i === index && (
                <>
                  <div
                    className="inline-flex items-center gap-3 mb-6 opacity-0 animate-[fade-up_0.7s_ease-out_0.2s_forwards]"
                  >
                    <span className="h-px w-10 bg-gold" />
                    <span className="text-gold tracking-[0.3em] uppercase text-xs font-medium">
                      {s.eyebrow}
                    </span>
                  </div>
                  <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold text-white leading-[1.05] mb-6 opacity-0 animate-[fade-up_0.9s_ease-out_0.4s_forwards]">
                    {s.title}
                  </h1>
                  <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl opacity-0 animate-[fade-up_0.9s_ease-out_0.6s_forwards]">
                    {s.subtitle}
                  </p>
                  <div className="flex flex-wrap gap-4 opacity-0 animate-[fade-up_0.9s_ease-out_0.8s_forwards]">
                    <a
                      href={s.primary.href}
                      className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-gold text-gold-foreground rounded-sm font-semibold shadow-gold hover:scale-105 transition-transform"
                    >
                      {s.primary.label}
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                    <a
                      href={s.secondary.href}
                      className="inline-flex items-center gap-3 px-8 py-4 border border-white/40 text-white rounded-sm font-medium hover:bg-white hover:text-primary transition-colors"
                    >
                      {s.secondary.label}
                    </a>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Arrows */}
      <button
        onClick={() => go(index - 1)}
        aria-label="Précédent"
        className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center rounded-full glass-dark text-white hover:bg-gold hover:text-gold-foreground transition-all"
      >
        <ChevronLeft />
      </button>
      <button
        onClick={() => go(index + 1)}
        aria-label="Suivant"
        className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center rounded-full glass-dark text-white hover:bg-gold hover:text-gold-foreground transition-all"
      >
        <ChevronRight />
      </button>

      {/* Dots + counter */}
      <div className="absolute bottom-10 inset-x-0 z-20 container mx-auto px-6 flex items-end justify-between">
        <div className="flex items-center gap-3">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              aria-label={`Aller au slide ${i + 1}`}
              className={`h-1 rounded-full transition-all duration-500 ${
                i === index ? "w-12 bg-gold" : "w-6 bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
        <div className="hidden md:block text-white/70 font-display tracking-widest text-sm">
          <span className="text-gold text-2xl font-semibold">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="mx-2">/</span>
          {String(slides.length).padStart(2, "0")}
        </div>
      </div>
    </section>
  );
}