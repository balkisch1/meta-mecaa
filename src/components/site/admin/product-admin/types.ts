import type { ProductImage } from "../../../../types";


export type ProductStatus = "active" | "inactive";

export interface Product {
  _id: string;
  name: string;
  description?: string;
  price: number | string;
  stock?: number | string;
  category?: string;
  reference?: string;
  status: ProductStatus;
  images: ProductImage[];
}

export type ProductForm = Omit<Product, "_id"> & {
  imagesNew: File[];
  isCustomCategory: boolean;
};