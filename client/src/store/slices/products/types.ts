import { ErrorState } from 'utils/asyncSetters';

export interface ProductInfo {
  title: string;
  description: string;
  id: number;
}

export interface FileWithId {
  file: File;
  id: number;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  categoryId: number;

  imgMobile: File;
  imgDesktop: File;
}

export interface DetailedProduct {
  id: number;
  name: string;
  price: number;
  categoryId: number;

  imgMobile: File;
  imgDesktop: File;

  images: File[];
  info: ProductInfo[];
  // review: any[];
}

export interface ProductsState extends ErrorState {
  products: Product[] | null;
  activeProduct: DetailedProduct | null;
}

export interface DeleteData {
  id: number;
}

export interface GetData {
  categoryId: number | null;
}

export interface GetOneData {
  id: number;
}