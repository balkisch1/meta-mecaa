import { Download, Eye, BookOpen } from "lucide-react";

import cMenuiserie from "../../assets/catalog-menuiserie.jpg";
import cMetal from "../../assets/catalog-metal.jpg";
import cDesign from "../../assets/catalog-design.jpg";
import cCuisine from "../../assets/catalog-cuisine.jpg";
import { Reveal } from "./Reveal";
import { BookFlip } from "./BookFlip";


const catalogs = [
  {
    cover: cMenuiserie,
    title: "Menuiserie & Bois",
    edition: "Édition 2026",
    pages: "48 pages",
    desc: "Portes, dressings, mobilier sur mesure et finitions bois noble.",
    accent: "from-[oklch(0.92_0.03_75)] to-[oklch(0.82_0.05_60)]",
  },
  {
    cover: cMetal,
    title: "Fabrication Métallique",
    edition: "Édition 2026",
    pages: "56 pages",
    desc: "Escaliers, garde-corps, portails et structures métalliques.",
    accent: "from-[oklch(0.35_0.02_50)] to-[oklch(0.22_0.018_45)]",
  },
  {
    cover: cDesign,
    title: "Design Intérieur",
    edition: "Édition 2026",
    pages: "64 pages",
    desc: "Concepts complets, ambiances et inspirations sur mesure.",
    accent: "from-[oklch(0.78_0.09_45)] to-[oklch(0.62_0.12_35)]",
  },
  {
    cover: cCuisine,
    title: "Cuisines Équipées",
    edition: "Édition 2026",
    pages: "40 pages",
    desc: "Cuisines design, finitions premium et solutions optimisées.",
    accent: "from-[oklch(0.88_0.04_70)] to-[oklch(0.70_0.08_55)]",
  },
];

export function Catalog() {
  return (
    <section
      id="catalogue"
      className="py-28 lg:py-36 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.94 0.022 75) 0%, oklch(0.975 0.012 80) 100%)",
      }}
    >
      {/* texture */}
      <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(circle_at_20%_30%,var(--gold)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="container mx-auto px-6 relative">

        {/* HEADER */}
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center gap-3 mb-5">
              <span className="h-px w-10 bg-gold" />
              <span className="text-gold tracking-[0.3em] uppercase text-xs font-semibold">
                Catalogues
              </span>
              <span className="h-px w-10 bg-gold" />
            </div>

            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-6">
              Nos collections en{" "}
              <span className="italic text-gradient-gold">éditions limitées</span>
            </h2>

            <p className="text-muted-foreground text-lg">
              Feuilletez nos lookbooks imprimés sur papier d'art. Inspirations,
              finitions et références produits — disponibles en téléchargement ou sur demande.
            </p>
          </div>
        </Reveal>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-14">
          {catalogs.map((c, i) => (
            <Reveal key={c.title} delay={i * 100}>
              <article className="group relative">

                {/* CARD */}
                <div className="
                  relative rounded-sm overflow-hidden
                  bg-white/60 backdrop-blur
                  border border-black/5
                  shadow-[0_20px_60px_rgba(0,0,0,0.08)]
                  hover:shadow-[0_30px_80px_rgba(0,0,0,0.15)]
                  transition-all duration-500
                  hover:-translate-y-2
                ">

                  {/* COVER */}
                  <div className="mb-6">
                    <BookFlip
                      cover={c.cover}
                      title={c.title}
                      edition={c.edition}
                      pages={c.pages}
                      accent={c.accent}
                    />
                  </div>

                  {/* CONTENT */}
                  <div className="px-5 pb-6">
                    <h4 className="font-display text-xl font-semibold mb-2 tracking-tight">
                      {c.title}
                    </h4>

                    <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                      {c.desc}
                    </p>

                    {/* ACTIONS */}
                    <div className="flex gap-2">
                      <a
                        href="#contact"
                        className="
                          flex-1 inline-flex items-center justify-center gap-2
                          px-4 py-2.5
                          bg-black text-white
                          rounded-sm text-xs font-semibold tracking-wide
                          hover:bg-gold hover:text-black
                          transition-all duration-300
                        "
                      >
                        <Eye className="w-3.5 h-3.5" />
                        Feuilleter
                      </a>

                      <a
                        href="#contact"
                        className="
                          inline-flex items-center justify-center gap-2
                          px-4 py-2.5
                          border border-black/10
                          rounded-sm text-xs font-semibold tracking-wide
                          hover:border-gold hover:text-gold
                          transition-all duration-300
                        "
                      >
                        <Download className="w-3.5 h-3.5" />
                        PDF
                      </a>
                    </div>
                  </div>

                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* CTA BOTTOM */}
        <Reveal delay={200}>
          <div className="mt-20 relative overflow-hidden rounded-sm bg-gradient-dark text-primary-foreground p-10 lg:p-14 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 shadow-elegant">

            <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full bg-gradient-copper opacity-20 blur-3xl" />

            <div className="relative max-w-xl">
              <div className="text-xs tracking-[0.3em] uppercase text-gold mb-3">
                Édition collector
              </div>

              <h3 className="font-display text-3xl md:text-4xl font-semibold leading-tight mb-3">
                Recevez le coffret complet imprimé
              </h3>

              <p className="text-white/70">
                Les 4 catalogues réunis dans un coffret signé Meta Meca, livré à domicile.
              </p>
            </div>

            <a
              href="#contact"
              className="
                relative inline-flex items-center gap-3
                px-8 py-4
                bg-gradient-gold text-gold-foreground
                rounded-sm font-semibold
                shadow-gold
                hover:scale-105 transition-transform
                whitespace-nowrap
              "
            >
              Demander le coffret
              <BookOpen className="w-4 h-4" />
            </a>

          </div>
        </Reveal>

      </div>
    </section>
  );
}