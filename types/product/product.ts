export interface TProduct {
  title: string;
  summary: string;
  brand?: string | number;
  category?: string | number;
  stock?: number;
  price?: number;
  salePrice?: number;
  id?: string;
  featureImage?: File | null;
  imageList?: (File | null)[];
}
