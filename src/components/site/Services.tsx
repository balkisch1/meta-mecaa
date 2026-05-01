import {
  Box,
  Hammer,
  Factory,
  ClipboardList,
  Flame,
  Layers,
  Scissors,
  Wrench,
  PaintBucket,
  ArrowUpRight,
} from "lucide-react";
import { Reveal } from "./Reveal";

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

export function Services() {
  return (
    <section id="services" className="py-28 lg:py-36 bg-background relative">
      <div className="container mx-auto px-6">
        <Reveal>
          <div className="max-w-3xl mb-20">
            <div className="inline-flex items-center gap-3 mb-5">
              <span className="h-px w-10 bg-gold" />
              <span className="text-gold tracking-[0.3em] uppercase text-xs font-semibold">
                Nos Services
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-6">
              Un savoir-faire complet,<br />
              <span className="text-gradient-gold italic">du dessin à la pose.</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl">
              Neuf expertises réunies pour réaliser vos projets bois, métal et design intérieur
              avec exigence et précision.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-sm overflow-hidden shadow-card">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 60}>
              <article className="group relative bg-card p-10 h-full transition-all duration-500 hover:bg-primary hover:text-primary-foreground cursor-pointer overflow-hidden">
                <div className="absolute top-0 right-0 p-6 text-muted-foreground/30 group-hover:text-gold transition-colors">
                  <ArrowUpRight className="w-5 h-5 -translate-x-2 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-500" />
                </div>
                <div className="w-14 h-14 rounded-sm bg-secondary group-hover:bg-gradient-gold flex items-center justify-center mb-8 transition-all duration-500">
                  <s.icon className="w-7 h-7 text-primary group-hover:text-gold-foreground transition-colors" />
                </div>
                <h3 className="font-display text-2xl font-semibold mb-3">{s.title}</h3>
                <p className="text-muted-foreground group-hover:text-primary-foreground/70 transition-colors leading-relaxed">
                  {s.desc}
                </p>
              
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}