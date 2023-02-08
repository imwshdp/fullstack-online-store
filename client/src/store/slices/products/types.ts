export interface Product {
  id: number;
  name: string;
  price: number;
  imgMobile: string;
  imgDesktop: string;
  categoryId: number;
}

export interface Category {
  id: number;
  name: string;
}

export interface ProductsState {
  categories: Category[] | null;
  products: Product[] | null;
  selectedCategory: Category | null;

  loading: boolean;
  error: null | string;
}

// ???
export interface UserData {
  name: string;
}

export interface Token {
  token: string;
}