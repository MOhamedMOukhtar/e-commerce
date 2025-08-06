export interface TProduct {
  title: string;
  summary: string;
  brand?: string | number;
  category?: string | number;
  stock?: number;
  price?: number;
  salePrice?: number;
}
