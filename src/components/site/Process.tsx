import { Search, PenTool, CheckCircle2, Hammer, Truck } from "lucide-react";
import { Reveal } from "./Reveal";

const steps = [
  { icon: Search, title: "Étude du besoin", desc: "Nous écoutons, analysons et conseillons selon vos contraintes." },
  { icon: PenTool, title: "Conception 2D / 3D", desc: "Nos designers modélisent votre projet avant fabrication." },
  { icon: CheckCircle2, title: "Validation du design", desc: "Vous validez les plans, matériaux et finitions choisis." },
  { icon: Hammer, title: "Fabrication", desc: "Production en atelier avec précision artisanale et industrielle." },
  { icon: Truck, title: "Installation finale", desc: "Pose et livraison soignée, prêt à l'usage." },
];
  
export function Process() {
  return (
    <section id="process" className="py-28 lg:py-36 bg-gradient-warm relative overflow-hidden">
      <div className="container mx-auto px-6">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center gap-3 mb-5">
              <span className="h-px w-10 bg-gold" />
              <span className="text-gold tracking-[0.3em] uppercase text-xs font-semibold">
                Notre Process
              </span>
              <span className="h-px w-10 bg-gold" />
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-6">
              De l'idée à <span className="italic text-gradient-gold">la réalisation</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Un processus éprouvé en cinq étapes pour garantir la qualité et le respect de vos exigences.
            </p>
          </div>
        </Reveal>

        <div className="relative">
          {/* Vertical line on mobile / horizontal on desktop */}
          <div className="hidden lg:block absolute top-12 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-6">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 120}>
                <div className="relative text-center group">
                  <div className="relative mx-auto w-24 h-24 rounded-full bg-card shadow-elegant flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                    <div className="absolute inset-0 rounded-full border-2 border-gold/20 group-hover:border-gold transition-colors" />
                    <s.icon className="w-9 h-9 text-primary group-hover:text-gold transition-colors" />
                    <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-gold text-gold-foreground font-display font-bold text-sm flex items-center justify-center shadow-gold">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-2">{s.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed px-2">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}