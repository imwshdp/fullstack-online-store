import { ErrorState } from "utils/asyncSetters";

export interface Basket {
  id: number | null;
  userId: number | null;
}

export interface ProductInBasket {
  basketId: number | null;
  productId: number | null;
  quantity: number;
}

export interface ProductInBasketWithIndex {
  data: {
    basketId: number | null;
    productId: number | null;
    quantity: number;
  },
  index: number,
}

export interface BasketState extends ErrorState {
  products: ProductInBasket[] | [];
  basketId: number | null;
}

export interface BasketData {
  productId: number,
  basketId: number,
}

export interface ChangeBasketProductData {
  productId: number,
  basketId: number,
  index: number,
}

export interface FetchData {
  basketId: number,
}

export interface FetchBasketData {
  userId: number,
}