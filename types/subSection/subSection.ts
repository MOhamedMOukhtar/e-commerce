import { StaticImport } from "next/dist/shared/lib/get-img-props";

export interface TSubSection {
  title: string;
  section: string | number;
  slug: string;
  id: string;
  timestampCreate: Date;
  imageURL: string | StaticImport;
}
