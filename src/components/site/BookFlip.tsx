import { useState } from "react";
import { BookOpen } from "lucide-react";

type Props = {
  cover: string;
  title: string;
  edition: string;
  pages: string;
  accent: string;
  alt?: string;
};

/**
 * Premium 3D book with peek-on-hover and full open-on-click.
 * Click again (or press Escape on focus) to close.
 */
export function BookFlip({ cover, title, edition, pages, accent, alt }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`book-scene relative aspect-[3/4] cursor-pointer select-none ${
        open ? "is-open" : ""
      }`}
      role="button"
      tabIndex={0}
      aria-pressed={open}
      aria-label={`${open ? "Fermer" : "Ouvrir"} le catalogue ${title}`}
      onClick={() => setOpen((o) => !o)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setOpen((o) => !o);
        }
        if (e.key === "Escape") setOpen(false);
      }}
    >
      {/* Soft floor shadow */}
      <div className="book-shadow" aria-hidden />

      {/* Inner spread (revealed when book opens) */}
      <div className="book-spread">
        <div className="absolute inset-0 grid grid-cols-2 text-[10px] tracking-[0.3em] uppercase text-muted-foreground/70">
          <div className="flex flex-col justify-between p-5">
            <span className="opacity-60">Sommaire</span>
            <div className="space-y-1.5">
              <div className="h-px w-12 bg-gold" />
              <div className="h-2 w-20 bg-foreground/10 rounded-sm" />
              <div className="h-2 w-16 bg-foreground/10 rounded-sm" />
              <div className="h-2 w-24 bg-foreground/10 rounded-sm" />
              <div className="h-2 w-14 bg-foreground/10 rounded-sm" />
            </div>
            <span className="opacity-50 text-[8px]">01</span>
          </div>
          <div className="flex flex-col justify-between p-5 items-end text-right">
            <span className="opacity-60">{edition}</span>
            <BookOpen className="w-7 h-7 text-gold/60" />
            <span className="opacity-50 text-[8px]">02</span>
          </div>
        </div>
      </div>

      {/* Page edges (right side stack) */}
      <div className="book-edges" aria-hidden />

      {/* Inner page #2 (deeper) */}
      <div className="book-page book-page-2">
        <div className="face front bg-gradient-to-br from-white to-secondary" />
        <div className="face back bg-gradient-to-br from-secondary to-white" />
      </div>

      {/* Inner page #1 (just under cover) */}
      <div className="book-page book-page-1">
        <div className="face front bg-gradient-to-br from-white to-secondary" />
        <div className="face back bg-gradient-to-br from-secondary to-white" />
      </div>

      {/* Cover */}
      <div className="book-cover">
        {/* FRONT face */}
        <div className="face front">
          <img
            src={cover}
            alt={alt ?? `Catalogue ${title}`}
            loading="lazy"
            width={960}
            height={1280}
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Spine shadow */}
          <div className="absolute inset-y-0 left-0 w-3 bg-gradient-to-r from-black/55 to-transparent" />
          {/* Subtle sheen */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
          {/* Branded color overlay */}
          <div className={`absolute inset-0 bg-gradient-to-br ${accent} mix-blend-multiply opacity-90`} />
          {/* Cover content */}
          <div className="absolute inset-0 flex flex-col justify-between p-6 text-white">
            <div>
              <div className="text-[9px] tracking-[0.35em] uppercase opacity-80">Meta Meca</div>
              <div className="text-[9px] tracking-[0.35em] uppercase opacity-80">{edition}</div>
            </div>
            <div>
              <div className="h-px w-10 bg-white/70 mb-3" />
              <div className="font-display text-2xl leading-tight font-semibold">{title}</div>
              <div className="mt-3 text-[10px] tracking-[0.3em] uppercase opacity-80">
                Lookbook · {pages}
              </div>
            </div>
          </div>
        </div>
        {/* BACK face (inside of cover) */}
        <div className="face back">
          <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.96_0.012_78)] to-[oklch(0.88_0.025_75)]" />
          <div className="absolute inset-0 p-6 flex flex-col justify-between text-foreground/70">
            <div className="text-[9px] tracking-[0.35em] uppercase opacity-70">Édition signée</div>
            <div className="font-display italic text-lg leading-snug max-w-[80%]">
              « L'artisanat sublimé par l'industrie. »
            </div>
            <div className="text-[9px] tracking-[0.35em] uppercase opacity-70">— Meta Meca</div>
          </div>
        </div>
      </div>
    </div>
  );
}
