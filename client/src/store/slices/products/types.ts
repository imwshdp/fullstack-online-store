export interface Product {
  id: number;
  name: string;
  price: number;
  imgMobile: string;
  imgDesktop: string;
  categoryId: number;
}

export interface DetailedProduct {
  id: number;
  name: string;
  price: number;
  imgMobile: string;
  imgDesktop: string;
  categoryId: number;

  info: any[];
  images: any[];
  review: any[];
}

export interface ProductsState {
  products: Product[] | null;
  activeProduct: DetailedProduct | null;

  loading: boolean;
  error: string | null;
}

export interface CreateData {
  name: string;
  price: number;
  categoryId: number;
  info: any[] | null;
  images: any[] | null;
}

export interface DeleteData {
  id: number;
}

export interface GetData {
  categoryId: number;
}

export interface GetOneData {
  id: number;
}