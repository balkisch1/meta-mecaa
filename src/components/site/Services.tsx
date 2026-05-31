import { useState } from "react";
import { ArrowUpRight, Box, ClipboardList, Factory, Flame, Hammer, Layers, PaintBucket, Scissors, Wrench } from "lucide-react";
import { Reveal } from "./Reveal";

export function Services() {
  const [active, setActive] = useState(0);
const services = [
  { icon: Box, title: "Conception 2D | 3D", desc: "Visualisation et modélisation de vos projets avant fabrication." },
  { icon: Hammer, title: "Réalisation des projets", desc: "Exécution complète et sur mesure du début à la fin." },
  { icon: Factory, title: "Fabrication", desc: "Production bois et métal avec précision industrielle." },
  { icon: ClipboardList, title: "Bureau d'étude", desc: "Analyse technique et conception des solutions adaptées." },
  { icon: Flame, title: "Soudure", desc: "Travaux de soudure professionnels, robustes et précis." },
  { icon: Layers, title: "Pliage", desc: "Pliage de métal de précision pour structures complexes." },
  { icon: Scissors, title: "Découpe Laser", desc: "Découpe métallique haute précision pour pièces détaillées." },
  { icon: Wrench, title: "Mécano-soudure", desc: "Assemblage de structures métalliques complexes." },
  { icon: PaintBucket, title: "Peinture industrielle", desc: "Finition et protection durables des pièces métalliques." },
];
  return (
    <section id="services" className="py-32 bg-background">
      <div className="container mx-auto px-6">

        {/* Header */}
        <Reveal>
          <div className="max-w-3xl mb-20">
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-10 bg-gold" />
              <span className="text-gold uppercase tracking-[0.35em] text-[11px]">
                Nos Services
              </span>
            </div>

            <h2 className="font-display text-5xl md:text-6xl font-light leading-tight mb-6">
              Un savoir-faire complet,<br />
              <span className="text-gradient-gold italic">du concept à la réalisation.</span>
            </h2>

            <p className="text-muted-foreground text-lg max-w-2xl">
              Une approche précise et industrielle pour tous vos projets bois, métal et design.
            </p>
          </div>
        </Reveal>

        {/* PRO LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          {/* LEFT — LIST */}
          <div className="lg:col-span-5 space-y-2">
            {services.map((s, i) => (
              <button
                key={s.title}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                className={`
                  w-full text-left group flex items-center justify-between
                  py-5 px-4 border-l-2 transition-all duration-300
                  ${
                    active === i
                      ? "border-gold bg-gold/5"
                      : "border-transparent hover:border-border"
                  }
                `}
              >
                <div>
                  <p
                    className={`font-display text-lg transition ${
                      active === i ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {s.title}
                  </p>
                </div>

                <ArrowUpRight
                  className={`w-4 h-4 transition ${
                    active === i ? "text-gold" : "text-muted-foreground opacity-40"
                  }`}
                />
              </button>
            ))}
          </div>

          {/* RIGHT — FEATURE */}
          <div className="lg:col-span-7 relative min-h-[520px] border border-border/40 overflow-hidden">

            {/* background glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-transparent" />

            {/* content */}
            <div className="relative p-12 h-full flex flex-col justify-center">

              <div className="mb-6 text-gold uppercase tracking-[0.3em] text-xs">
                Service sélectionné
              </div>

              <h3 className="font-display text-3xl md:text-4xl font-light mb-6">
                {services[active].title}
              </h3>

              <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">
                {services[active].desc}
              </p>

              
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}