export type TProduct = {
  id: number;
  name: string;
  price: number;
  imgMobile: string;
  imgDesktop: string;
  categoryId: number;
}

export type TCategory = {
  id: number;
  name: string;
}

export type ProductsState = {
  categories: TCategory[] | [];
  products: TProduct[] | [];
  selectedCategory: TCategory | {};
}