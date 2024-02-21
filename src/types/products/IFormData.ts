export interface IFormData {
  name: string;
  description: string;
  price: number;
  discount: number;
  count: number;
  novelty: boolean;
  hit: boolean;
  subcategoryId: number;
  brandId: number;
  imageIds: string;
  images: File[]; // Используем массив File вместо FileList или null
}