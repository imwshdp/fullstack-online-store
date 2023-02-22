import { ErrorState } from 'utils/asyncSetters';

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
  info: any[];
  review: any[];
}

export interface ProductsState extends ErrorState {
  products: Product[] | null;
  activeProduct: DetailedProduct | null;
}

export interface CreateData {
  name: string;
  price: number;
  categoryId: number;

  imgMobile: File;
  imgDesktop: File;

  // images: File[] | null;
  // info: any[] | null;
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