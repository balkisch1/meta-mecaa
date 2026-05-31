// Drop-in replacement for the LEFT gallery section in ProductDetailPage.tsx
// Usage: replace the entire {/* ────────── LEFT: Gallery ────────── */} div with <ProductGallery />

import { useState, useRef } from "react";
import { ZoomIn } from "lucide-react";

interface GalleryImage { url: string }

interface Props {
  images: GalleryImage[];
  productName: string;
  category?: string;
  outOfStock: boolean;
  onLightbox: (index: number) => void;
}

const G = {
  bg:      "#f5f4f1",
  warm:    "#ede9e2",
  border:  "#e4e0d8",
  text:    "#111111",
  faint:   "#aaaaaa",
  white:   "#ffffff",
};

/* ── Single zoomable image tile ── */
function ImageTile({
  img, alt, ratio, contain, index, onLightbox, badge,
}: {
  img: GalleryImage; alt: string; ratio: string; contain?: boolean;
  index: number; onLightbox: (i: number) => void; badge?: React.ReactNode;
}) {
  const [hovered, setHovered] = useState(false);
  const [pos, setPos]         = useState({ x: 50, y: 50 });
  const ref                   = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setPos({ x, y });
  };

  return (
    <div
      ref={ref}
      onClick={() => onLightbox(index)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPos({ x: 50, y: 50 }); }}
      onMouseMove={handleMouseMove}
      style={{
        position: "relative",
        aspectRatio: ratio,
        overflow: "hidden",
        borderRadius: 10,
        background: contain ? G.white : G.warm,
        cursor: "zoom-in",
        lineHeight: 0,
        flexShrink: 0,
      }}
    >
      <img
        src={img.url}
        alt={alt}
        style={{
          width: "100%",
          height: "100%",
          objectFit: contain ? "contain" : "cover",
          objectPosition: hovered && !contain ? `${pos.x}% ${pos.y}%` : "center",
          display: "block",
          transition: hovered
            ? "transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94), object-position 0.1s"
            : "transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94)",
          transform: hovered ? "scale(1.06)" : "scale(1)",
        }}
      />

      {/* Zoom badge */}
      <div style={{
        position: "absolute", bottom: 12, right: 12,
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(8px)",
        border: `1px solid ${G.border}`,
        borderRadius: 6,
        padding: "5px 11px",
        display: "flex", alignItems: "center", gap: 5,
        fontSize: 11, color: G.text, fontWeight: 500,
        pointerEvents: "none",
        opacity: hovered ? 1 : 0,
        transform: hovered ? "translateY(0)" : "translateY(4px)",
        transition: "opacity 0.2s, transform 0.2s",
      }}>
        <ZoomIn size={11} /> Agrandir
      </div>

      {/* Overlay tint */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: hovered ? "rgba(0,0,0,0.025)" : "transparent",
        transition: "background 0.3s",
      }} />

      {badge}
    </div>
  );
}

/* ── Main Gallery ── */
export function ProductGallery({ images, productName, category, outOfStock, onLightbox }: Props) {
  const [activeThumb, setActiveThumb] = useState(0);

  if (images.length === 0) {
    return (
      <div style={{
        aspectRatio: "4/5", background: G.warm, borderRadius: 10,
        display: "flex", alignItems: "center", justifyContent: "center",
        color: G.faint, fontSize: 13,
      }}>
        Aucune image disponible
      </div>
    );
  }

  // Distribute images into hero / secondary / rest
  const hero      = images[0];
  const secondary = images[1] ?? null;
  const rest      = images.slice(2);

  const CategoryBadge = category ? (
    <span style={{
      position: "absolute", top: 14, left: 14,
      background: "rgba(255,255,255,0.95)",
      border: `1px solid ${G.border}`,
      color: G.text, fontSize: 9, fontWeight: 700,
      letterSpacing: "0.14em", textTransform: "uppercase",
      padding: "4px 10px", borderRadius: 4,
    }}>
      {category}
    </span>
  ) : null;

  const OutOfStockOverlay = outOfStock ? (
    <div style={{
      position: "absolute", inset: 0,
      background: "rgba(255,255,255,0.6)",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <span style={{
        fontSize: 11, fontWeight: 700, textTransform: "uppercase",
        letterSpacing: "0.12em", border: `1px solid ${G.text}`,
        padding: "8px 22px", background: G.white, color: G.text,
      }}>
        Épuisé
      </span>
    </div>
  ) : null;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>

      {/* ── HERO + SECONDARY side by side ── */}
      <div style={{ display: "grid", gridTemplateColumns: secondary ? "3fr 2fr" : "1fr", gap: 10 }}>

        {/* Hero image — tall portrait */}
        <ImageTile
          img={hero}
          alt={productName}
          ratio="3/4"
          index={0}
          onLightbox={onLightbox}
          badge={
            <>
              {CategoryBadge}
              {OutOfStockOverlay}
            </>
          }
        />

        {/* Secondary image — stacked or single */}
        {secondary && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <ImageTile
              img={secondary}
              alt=""
              ratio="3/4"
              index={1}
              onLightbox={onLightbox}
            />
          </div>
        )}
      </div>

      {/* ── REST images — horizontal filmstrip ── */}
      {rest.length > 0 && (
        <div style={{
          display: "grid",
          gridTemplateColumns: `repeat(${Math.min(rest.length, 4)}, 1fr)`,
          gap: 10,
        }}>
          {rest.slice(0, 4).map((img, i) => {
            const realIndex = i + 2;
            const isLast    = i === 3 && rest.length > 4;
            return (
              <div key={i} style={{ position: "relative" }}>
                <ImageTile
                  img={img}
                  alt=""
                  ratio="1/1"
                  index={realIndex}
                  onLightbox={onLightbox}
                />
                {isLast && (
                  <div
                    onClick={() => onLightbox(realIndex)}
                    style={{
                      position: "absolute", inset: 0, borderRadius: 10,
                      background: "rgba(17,17,17,0.52)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      cursor: "pointer",
                    }}
                  >
                    <span style={{
                      fontSize: 18, fontWeight: 600, color: G.white,
                      letterSpacing: "-0.02em",
                    }}>
                      +{rest.length - 3}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ── THUMBNAIL STRIP — active navigator ── */}
      {images.length > 1 && (
        <div style={{
          display: "flex", gap: 6, overflowX: "auto",
          paddingBottom: 2,
          scrollbarWidth: "none",
        }}>
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => { setActiveThumb(i); onLightbox(i); }}
              style={{
                width: 56, height: 56, flexShrink: 0,
                padding: 0, cursor: "pointer",
                borderRadius: 7, overflow: "hidden",
                border: i === activeThumb
                  ? `2px solid ${G.text}`
                  : `1px solid ${G.border}`,
                opacity: i === activeThumb ? 1 : 0.5,
                transition: "all 0.18s",
                background: G.warm,
                outline: "none",
              }}
            >
              <img
                src={img.url}
                alt=""
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}