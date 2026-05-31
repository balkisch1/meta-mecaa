import { useState } from "react";

const C = {
  sand:        "#ffffff",
  linen:       "#ede8dc",
  warmBorder:  "#d9d0bc",
  terra:       "#073a97",
  textPrimary: "#2c2416",
  textMuted:   "#073a97",
};

const items = [
  {
    title: "Buffets",
    img: "https://d.media.kavehome.com/image/upload/f_auto,w_400/v1771245217/products/M00191MO11_1V01.jpg",
    // must match exactly the category string stored in your products
    category: "Buffets",
  },
  {
    title: "TV Stand",
    img: "https://d.media.kavehome.com/image/upload/f_auto,w_400/v1771245210/products/M00193MO11_1V01.jpg",
    category: "TV Stand",
  },
  {
    title: "Vitrine",
    img: "https://d.media.kavehome.com/image/upload/f_auto,w_400/v1725364378/products/M1200001MM40_1V01.jpg",
    category: "Vitrine",
  },
  {
    title: "Entrée",
    img: "https://d.media.kavehome.com/image/upload/f_auto,w_400/Products/M1100007MM01_1V01.jpg",
    category: "Entrée",
  },
];

interface CarouselItemProps {
  cat: typeof items[0];
  isActive: boolean;
  onSelect: (category: string) => void;
}

function CarouselItem({ cat, isActive, onSelect }: CarouselItemProps) {
  const [hovered, setHovered] = useState(false);
  const highlighted = hovered || isActive;

  return (
    <button
      onClick={() => onSelect(isActive ? "Tous" : cat.category)}
      style={{ textDecoration: "none", flexShrink: 0, minWidth: 110, background: "none", border: "none", cursor: "pointer", padding: 0, fontFamily: "inherit" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          width: 110,
          height: 140,
          borderRadius: 10,
          overflow: "hidden",
          background: C.linen,
          border: `2px solid ${isActive ? C.terra : highlighted ? C.terra : C.warmBorder}`,
          transition: "border-color 0.25s",
          position: "relative",
        }}
      >
        <img
          src={cat.img}
          alt={cat.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: highlighted ? "scale(1.08)" : "scale(1)",
            transition: "transform 0.5s ease",
            display: "block",
          }}
        />
        {/* Overlay */}
        <div style={{ position: "absolute", inset: 0, background: highlighted ? "rgba(7,58,151,0.08)" : "rgba(0,0,0,0)", transition: "background 0.3s" }} />

        {/* Active checkmark badge */}
        {isActive && (
          <div style={{ position: "absolute", top: 8, right: 8, width: 20, height: 20, borderRadius: "50%", background: C.terra, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
              <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        )}
      </div>

      <p style={{ fontSize: 12, marginTop: 8, textAlign: "center", color: isActive ? C.terra : highlighted ? C.textPrimary : C.textMuted, letterSpacing: "0.04em", transition: "color 0.25s", fontWeight: isActive || highlighted ? 600 : 400 }}>
        {cat.title}
      </p>

      <div style={{ margin: "4px auto 0", width: isActive || highlighted ? 16 : 0, height: 2, background: C.terra, borderRadius: 2, transition: "width 0.3s ease" }} />
    </button>
  );
}

interface CategoriesCarouselProps {
  activeCategory: string;
  onSelect: (category: string) => void;
}

export function CategoriesCarousel({ activeCategory, onSelect }: CategoriesCarouselProps) {
  return (
    <div style={{ width: "100%", background: C.sand }}>
      <div
        style={{ display: "flex", gap: 14, overflowX: "auto", scrollBehavior: "smooth", padding: "24px", msOverflowStyle: "none", scrollbarWidth: "none" }}
        className="no-scrollbar"
      >
        {items.map((cat, i) => (
          <CarouselItem
            key={i}
            cat={cat}
            isActive={activeCategory === cat.category}
            onSelect={onSelect}
          />
        ))}
      </div>
    </div>
  );
}