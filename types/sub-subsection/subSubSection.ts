export interface TSubSubSection {
  title: string;
  slug: string;
  section?: string;
  subSection?: string;
  imageURL?: File | null;
  img?: string;
  order?: number;
  id?: string;
}
export interface TSubSubSectionData {
  data: {
    title: string;
    slug: string;
    section: string;
    subSection: string;
    imageURL?: string;
    id?: string;
  };
  image: File | null;
}
