import { ErrorState } from 'utils/asyncSetters';

export interface Product {
  id: number;
  name: string;
  price: number;
  categoryId: number;

  imgMobile: File;
  imgDesktop: File;
}

export interface Review {
  id: number;
  productId: number;
  review: string;
  score: boolean;
  userId: number;
  username: string;
  updatedAt: string;
}

export interface DetailedProduct {
  id: number;
  name: string;
  price: number;
  categoryId: number;

  imgMobile: File;
  imgDesktop: File;

  image: any[];
  info: ProductInfo[];
  review: Review[];
}

export interface ProductsState extends ErrorState {
  products: Product[] | null;
  activeProduct: DetailedProduct | null;
}

// extra interfaces
export interface ProductInfo {
  title: string;
  description: string;
  id: number;
}

export interface FileWithId {
  file: File;
  id: number;
}

// async thunk data
export interface DeleteData {
  id: number;
}

export interface GetData {
  categoryId: number | null;
}

export interface GetOneData {
  id: number;
}

export interface CreateReviewData {
  productId: number;
  userId: number;
  score: boolean;
  review: string;
  username: string;
}

export interface GetReviewsData {
  productId: number;
}