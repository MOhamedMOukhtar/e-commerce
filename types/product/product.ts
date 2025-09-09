export interface TProduct {
  title: string;
  summary: string;
  slug: string;
  section?: string | number;
  subSection?: string | number;
  color?: string;
  stock?: number;
  price?: number;
  salePrice?: number;
  id?: string;
  featureImage?: File | null;
  measurementImage?: File | null;
  imageList?: (File | null)[];
  isFeatured?: boolean;
  commonID?: string;
}
