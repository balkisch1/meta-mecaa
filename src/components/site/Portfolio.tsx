import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { projects } from "./projects";

type Filter = "Tous" | "Cuisine" | "Escalier" | "Métal" | "Mobilier";
const filters: Filter[] = ["Tous", "Cuisine", "Escalier", "Métal", "Mobilier"];

export function Portfolio() {
  const [active, setActive] = useState<Filter>("Tous");

  const filtered =
    active === "Tous"
      ? projects
      : projects.filter((p) => p.cat === active);

  return (
    <section id="projets" className="py-28 lg:py-36 bg-background">
      <div className="container mx-auto px-6">

        {/* Header */}
        <Reveal>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-3 mb-5">
                <span className="h-px w-10 bg-gold" />
                <span className="text-gold tracking-[0.3em] uppercase text-xs font-semibold">
                  Réalisations
                </span>
              </div>

              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight">
                Nos derniers <span className="italic text-gradient-gold">projets</span>
              </h2>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-2">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setActive(f)}
                  className={`px-5 py-2.5 text-sm tracking-wide rounded-sm border transition-all ${
                    active === f
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-transparent border-border text-muted-foreground hover:border-gold hover:text-foreground"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p, i) => (
            <Reveal key={p.slug + p.title} delay={i * 80}>

              {/* 🔥 replaced TanStack Link with normal anchor */}
              <a
                href={`/projets/${p.slug}`}
                className="group relative block aspect-[4/5] overflow-hidden rounded-sm bg-secondary shadow-card"
              >
                <img
                  src={p.img}
                  alt={p.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                <div className="absolute top-5 left-5">
                  <span className="px-3 py-1 text-[10px] uppercase bg-gradient-gold text-gold-foreground font-semibold rounded-sm">
                    {p.cat}
                  </span>
                </div>

                <div className="absolute top-5 right-5 w-11 h-11 rounded-full glass-dark text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                  <ArrowUpRight className="w-5 h-5" />
                </div>

                <div className="absolute bottom-0 inset-x-0 p-7">
                  <h3 className="text-2xl text-white font-semibold">{p.title}</h3>
                  <div className="mt-3 h-px w-10 bg-gold group-hover:w-20 transition-all" />
                </div>
              </a>

            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}