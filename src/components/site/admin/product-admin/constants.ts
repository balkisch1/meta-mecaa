import type { ProductForm } from "./types";

export const defaultCategories = [
  "Meubles",
  "Buffets",
  "Meuble TV",
  "Étagères",
  "Chambres",
  "Entrée",
  "Décoration",
];

export const categoryPrefixes: Record<string, string> = {
  "Meubles":    "MBL",
  "Buffets":    "BUF",
  "Meuble TV":  "TV",
  "Étagères":   "ETG",
  "Chambres":   "CHB",
  "Entrée":     "ENT",
  "Décoration": "DEC",
};

export const generateRef = (category?: string): string => {
  const prefix = categoryPrefixes[category || ""] || "GEN";
  const unique = Date.now().toString().slice(-6);
  const rand = Math.floor(Math.random() * 1000).toString().padStart(3, "0");
  return `${prefix}-${unique}-${rand}`;
};

export const emptyForm: ProductForm = {
  name: "",
  description: "",
  price: "",
  stock: "",
  category: "",
  reference: "",
  status: "active",
  images: [],
  imagesNew: [],
  isCustomCategory: false,
};