export interface IProduct {
  name: string;
  description: string;
  price: string;
  discount: number;
  count: number;
  novelty: boolean;
  hit: boolean;
  subcategoryId: number;
  brandId: number;
  imageIds: string;
  images: FileList | null;
}