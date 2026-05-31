import { useState, useEffect, useRef } from "react";
import { Download, ArrowUpRight, BookOpen } from "lucide-react";

import menuiserieCover from "../../assets/menuiserie.png";
import cuisineCover    from "../../assets/cuisine.jpg";
import MetaeCover      from "../../assets/metameca1.pdf.png";

/* ─────────────────────────── Data ──────────────────────────── */
const catalogs = [
  {
    title:    "Portes en acier",
    subtitle: "Menuiserie sur mesure",
    desc:     "Collection complète de portes industrielles et résidentielles, détails de finition et spécifications techniques.",
    pdf:      "/pdfs/menuiserie.pdf",
    cover:    menuiserieCover,
    year:     "2024",
  },
  {
    title:    "Cuisines Équipées",
    subtitle: "Design & solutions modernes",
    desc:     "Architectures de cuisine contemporaines, matériaux nobles, configurations sur mesure.",
    pdf:      "/pdfs/cuisine.pdf",
    cover:    cuisineCover,
    year:     "2024",
  },
  {
    title:    "Meta Meca",
    subtitle: "Catalogue général",
    desc:     "L'ensemble de nos savoir-faire réunis : structures, façades, mobilier industriel.",
    pdf:      "/pdfs/meta.pdf",
    cover:    MetaeCover,
    year:     "2024",
  },
];

/* ─────────────────────────── Reveal hook ───────────────────── */
function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, vis };
}

/* ─────────────────────────── Hero Catalog ──────────────────── */
function HeroCatalog({ c, delay }: { c: typeof catalogs[0]; delay: number }) {
  const [hovered, setHovered] = useState(false);
  const { ref, vis } = useReveal(0.08);

  return (
    <div
      ref={ref}
      style={{
        opacity:   vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.9s ease ${delay}ms, transform 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
        gridColumn: "1 / -1",
      }}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: "21 / 9",
          overflow: "hidden",
          borderRadius: 2,
          background: "#111",
          cursor: "pointer",
        }}
      >
        {/* Cover image */}
        <img
          src={c.cover}
          alt={c.title}
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover",
            transition: "transform 1800ms cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.6s",
            transform: hovered ? "scale(1.06)" : "scale(1.02)",
            opacity: hovered ? 0.75 : 0.62,
          }}
        />

        {/* Soft cinematic overlays */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse at 60% 50%, transparent 25%, rgba(8,7,5,0.6) 100%)",
        }} />
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "linear-gradient(to right, rgba(8,7,5,0.85) 0%, rgba(8,7,5,0.2) 55%, transparent 100%)",
        }} />

        {/* Year label */}
        <div style={{
          position: "absolute", top: 32, right: 36,
          fontSize: 9, letterSpacing: "0.24em",
          textTransform: "uppercase", color: "rgba(255,255,255,0.35)",
          fontWeight: 500,
        }}>
          Vol. {c.year}
        </div>

        {/* Content */}
        <div style={{
          position: "absolute", left: 0, bottom: 0, top: 0,
          display: "flex", flexDirection: "column",
          justifyContent: "flex-end",
          padding: "0 48px 44px",
          maxWidth: 560,
        }}>
          <p style={{
            fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase",
            color: "rgba(201,169,110,0.8)", fontWeight: 500,
            marginBottom: 16,
          }}>
            {c.subtitle}
          </p>
          <h3 style={{
            fontSize: "clamp(26px, 4vw, 48px)",
            fontWeight: 300,
            fontFamily: "'Georgia', serif",
            fontStyle: "italic",
            lineHeight: 1.1,
            letterSpacing: "-0.025em",
            color: "#f5f0e8",
            margin: "0 0 16px",
          }}>
            {c.title}
          </h3>
          <p style={{
            fontSize: 13, color: "rgba(255,255,255,0.42)",
            lineHeight: 1.7, maxWidth: 380, margin: "0 0 28px",
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(8px)",
            transition: "opacity 0.5s ease, transform 0.5s ease",
          }}>
            {c.desc}
          </p>

          {/* Actions */}
          <div style={{
            display: "flex", alignItems: "center", gap: 24,
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(6px)",
            transition: "opacity 0.45s ease 0.05s, transform 0.45s ease 0.05s",
          }}>
            <a
              href={c.pdf}
              target="_blank"
              rel="noreferrer"
              onClick={e => e.stopPropagation()}
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase",
                fontWeight: 600, color: "#0d3875",
                textDecoration: "none",
                borderBottom: "1px solid rgba(201,169,110,0.4)",
                paddingBottom: 2,
              }}
            >
              Feuilleter <ArrowUpRight size={12} />
            </a>
            <a
              href={c.pdf}
              download
              onClick={e => e.stopPropagation()}
              style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase",
                fontWeight: 500, color: "rgba(255,255,255,0.4)",
                textDecoration: "none",
              }}
            >
              <Download size={11} /> PDF
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────── Secondary Card ────────────────── */
function LookbookCard({ c, delay, ratio = "3/4" }: { c: typeof catalogs[0]; delay: number; ratio?: string }) {
  const [hovered, setHovered] = useState(false);
  const { ref, vis } = useReveal(0.1);

  return (
    <div
      ref={ref}
      style={{
        opacity:   vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.85s ease ${delay}ms, transform 0.85s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: ratio,
          overflow: "hidden",
          borderRadius: 2,
          background: "#111",
          cursor: "pointer",
        }}
      >
        {/* Cover */}
        <img
          src={c.cover}
          alt={c.title}
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover",
            transition: "transform 1500ms cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.5s",
            transform: hovered ? "scale(1.08)" : "scale(1.02)",
            opacity: hovered ? 0.72 : 0.6,
          }}
        />

        {/* Overlay */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "linear-gradient(to top, rgba(8,7,5,0.92) 0%, rgba(8,7,5,0.1) 55%, transparent 100%)",
        }} />

        {/* Year */}
        <div style={{
          position: "absolute", top: 18, right: 18,
          fontSize: 8, letterSpacing: "0.2em",
          textTransform: "uppercase", color: "rgba(255,255,255,0.3)",
        }}>
          {c.year}
        </div>

        {/* Content block */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          padding: "0 22px 24px",
        }}>
          <p style={{
            fontSize: 8, letterSpacing: "0.22em", textTransform: "uppercase",
            color: "rgba(201,169,110,0.7)", fontWeight: 500,
            margin: "0 0 10px",
          }}>
            {c.subtitle}
          </p>
          <h3 style={{
            fontSize: "clamp(15px, 1.8vw, 20px)",
            fontWeight: 300,
            fontFamily: "'Georgia', serif",
            fontStyle: "italic",
            lineHeight: 1.15,
            letterSpacing: "-0.015em",
            color: "#f0ece4",
            margin: "0 0 14px",
          }}>
            {c.title}
          </h3>

          {/* Hover actions */}
          <div style={{
            display: "flex", alignItems: "center", gap: 18,
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(6px)",
            transition: "opacity 0.4s ease, transform 0.4s ease",
          }}>
            <a
              href={c.pdf}
              target="_blank"
              rel="noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: 6,
                fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase",
                fontWeight: 600, color: "#ffffff",
                textDecoration: "none",
                borderBottom: "1px solid rgba(40, 38, 36, 0.35)",
                paddingBottom: 2,
              }}
            >
              Feuilleter <ArrowUpRight size={10} />
            </a>
            <a
              href={c.pdf}
              download
              style={{
                display: "inline-flex", alignItems: "center", gap: 5,
                fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase",
                fontWeight: 500, color: "rgba(255,255,255,0.38)",
                textDecoration: "none",
              }}
            >
              <Download size={10} /> PDF
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────── Main Component ────────────────── */
export function Catalog() {
  const { ref: headerRef, vis: headerVis } = useReveal(0.1);
  const { ref: ctaRef,    vis: ctaVis    } = useReveal(0.1);

  const [hero, ...rest] = catalogs;

  return (
    <section
      id="catalogue"
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "100px 0 0",
        background: "#ffffff",
      }}
    >
      {/* Subtle horizontal rules for texture */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 79px, rgba(0,0,0,0.025) 79px, rgba(0,0,0,0.025) 80px)",
      }} />

      <div style={{ width: "100%", margin: 0, padding: "0 20px", position: "relative" }}>

        {/* ── Header ── */}
        <div
          ref={headerRef}
          style={{
            marginBottom: 72,
            opacity: headerVis ? 1 : 0,
            transform: headerVis ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.8s ease, transform 0.8s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 22 }}>
            <div style={{ height: 1, width: 40, background: "rgba(201,169,110,0.55)" }} />
            <span style={{
              fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase",
              fontWeight: 600, color: "#0d3875",
            }}>
              Catalogues
            </span>
          </div>

          <div style={{
            display: "flex", alignItems: "flex-end",
            justifyContent: "space-between", gap: 32, flexWrap: "wrap",
          }}>
            <h2 style={{
              fontSize: "clamp(30px, 5vw, 58px)",
              fontWeight: 300,
              fontFamily: "'Georgia', serif",
              fontStyle: "italic",
              lineHeight: 1.08,
              letterSpacing: "-0.03em",
              color: "#1a1816",
              margin: 0,
              maxWidth: 500,
            }}>
              Nos collections en{" "}
              <span style={{ fontStyle: "normal", color: "#1a1816" }}>éditions</span>
            </h2>
            <p style={{
              fontSize: 13, color: "rgba(0,0,0,0.38)", lineHeight: 1.75,
              maxWidth: 320, margin: 0, paddingBottom: 6,
            }}>
              Inspirations, finitions et références produits — disponibles en téléchargement ou sur demande.
            </p>
          </div>
        </div>

        {/* ── Hero + secondary grid ── */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>

          {/* Hero full-width */}
          <HeroCatalog c={hero} delay={0} />

          {/* Secondary cards — asymmetric split */}
          {rest.length > 0 && (
            <div style={{
              display: "grid",
              gridTemplateColumns: rest.length === 1 ? "1fr" : "3fr 2fr",
              gap: 10,
            }}>
              {rest.map((c, i) => (
                <LookbookCard
                  key={c.title}
                  c={c}
                  delay={100 + i * 90}
                  ratio={rest.length === 1 ? "21/9" : i === 0 ? "4/3" : "4/3"}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Cinematic CTA banner (full bleed) ── */}
      <div
        ref={ctaRef}
        style={{
          marginTop: 80,
          position: "relative",
          overflow: "hidden",
          background: "#0b0c0f",
          padding: "80px 0 96px",
          opacity: ctaVis ? 1 : 0,
          transform: ctaVis ? "translateY(0)" : "translateY(32px)",
          transition: "opacity 0.9s ease 0.15s, transform 0.9s cubic-bezier(0.22,1,0.36,1) 0.15s",
        }}
      >
        {/* Atmospheric glow */}
        <div style={{
          position: "absolute",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600, height: 300,
          background: "radial-gradient(ellipse, rgba(201,169,110,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        {/* Horizontal rule */}
        <div style={{
          position: "absolute",
          top: 0, left: "10%", right: "10%",
          height: 1,
          background: "linear-gradient(to right, transparent, rgba(201,169,110,0.2), transparent)",
        }} />

        <div style={{ 
  maxWidth: "1700px", // ou 1800px
  width: "100%",
  margin: "0 auto",
  padding: "0 60px",
  position: "relative"
}}>
          <div style={{ maxWidth: 520 }}>
            <p style={{
              fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase",
              color: "rgba(201,169,110,0.6)", fontWeight: 500,
              margin: "0 0 18px",
            }}>
              Édition collector
            </p>
            <h3 style={{
              fontSize: "clamp(22px, 3.5vw, 42px)",
              fontWeight: 300,
              fontFamily: "'Georgia', serif",
              fontStyle: "italic",
              lineHeight: 1.12,
              letterSpacing: "-0.025em",
              color: "#f0ece4",
              margin: "0 0 14px",
            }}>
              Recevez le coffret complet imprimé
            </h3>
            <p style={{
              fontSize: 13, color: "rgba(255,255,255,0.35)",
              lineHeight: 1.75, margin: 0,
            }}>
              Les {catalogs.length} catalogues réunis dans un coffret signé Meta Meca,<br />
              livré à domicile sur demande.
            </p>
          </div>

          <a
            href="#contact"
            style={{
              display: "inline-flex", alignItems: "center", gap: 12,
              padding: "16px 36px",
              border: "1px solid rgba(201,169,110,0.35)",
              borderRadius: 1,
              fontSize: 10, letterSpacing: "0.22em",
              textTransform: "uppercase", fontWeight: 600,
              color: "#ffffff",
              textDecoration: "none",
              transition: "background 0.3s ease, border-color 0.3s ease",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.background = "rgba(0, 81, 255, 0.08)";
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(201,169,110,0.65)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(201,169,110,0.35)";
            }}
          >
            Demander le coffret
            <BookOpen size={13} />
          </a>
        </div>
      </div>
    </section>
  );
}