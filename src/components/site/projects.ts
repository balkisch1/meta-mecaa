// ─────────────────────────────────────────────────────────────────────────────
// projects.ts  —  single source of truth for ALL projects
//
// RULES:
//   • `cat`  — display label shown in the UI
//   • `slug` — ALWAYS equals the category route slug (cuisine | escalier | metal | mobilier)
//              This is what /projets/$slug filters on. Every project in "Métal" must have slug:"metal".
//
// HOW TO ADD PHOTOS:
//   1. Drop the image in src/assets/
//   2. Import it at the top of this file
//   3. Add an entry in the array below
// ─────────────────────────────────────────────────────────────────────────────

import kitchen   from "../../assets/project-kitchen.jpg";
import door      from "../../assets/project-door.jpg";
import furniture from "../../assets/project-furniture.jpg";
import staircase from "../../assets/project-staircase.jpg";
import laser     from "../../assets/project-laser.jpg";
import windowImg from "../../assets/project-window.jpg";

// When you add real extra photos, import them here exactly like above:
// import cuisine2  from "@/assets/cuisine-2.jpg";
// import metal2    from "@/assets/metal-2.jpg";
// etc.

export type Category = "Cuisine" | "Escalier" | "Métal" | "Mobilier";

export type CategorySlug = "cuisine" | "escalier" | "metal" | "mobilier";

export interface Project {
  img: string;
  title: string;
  cat: Category;
  slug: CategorySlug;   // ← always the category slug, NOT a unique project id
}

export const projects: Project[] = [
  // ── Cuisine ───────────────────────────────────────────────────────────────
  { img: kitchen,   title: "Cuisine équipée moderne",    cat: "Cuisine",  slug: "cuisine" },
  // { img: cuisine2, title: "Cuisine en L ouverte",       cat: "Cuisine",  slug: "cuisine" },
  // { img: cuisine3, title: "Îlot central industriel",    cat: "Cuisine",  slug: "cuisine" },

  // ── Escalier ──────────────────────────────────────────────────────────────
  { img: staircase, title: "Escalier bois & métal",      cat: "Escalier", slug: "escalier" },
  // { img: escalier2, title: "Escalier hélicoïdal acier", cat: "Escalier", slug: "escalier" },

  // ── Métal ─────────────────────────────────────────────────────────────────
  { img: door,      title: "Porte d'entrée bois massif", cat: "Métal",    slug: "metal" },
  { img: laser,     title: "Découpe laser de précision", cat: "Métal",    slug: "metal" },
  { img: windowImg, title: "Fenêtre métallique cintrée", cat: "Métal",    slug: "metal" },
  // { img: metal2,   title: "Portail acier sur mesure",   cat: "Métal",    slug: "metal" },
  // { img: metal3,   title: "Pergola métal & bois",       cat: "Métal",    slug: "metal" },

  // ── Mobilier ──────────────────────────────────────────────────────────────
  { img: furniture, title: "Dressing sur mesure",        cat: "Mobilier", slug: "mobilier" },
  // { img: mobilier2, title: "Table basse bois brut",     cat: "Mobilier", slug: "mobilier" },
  // { img: mobilier3, title: "Bibliothèque murale métal", cat: "Mobilier", slug: "mobilier" },
];

// Lookup: route slug → display label
export const categoryBySlug: Record<CategorySlug, Category> = {
  cuisine:  "Cuisine",
  escalier: "Escalier",
  metal:    "Métal",
  mobilier: "Mobilier",
};