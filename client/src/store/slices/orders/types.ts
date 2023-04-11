import { ErrorState } from 'utils/asyncSetters';

export interface Product {
  id: number
  orderId: number;
  productId: number;
  quantity: number;
}

export interface OrdersState extends ErrorState {
  ordersIds: number[] | null;
  products: Product[] | null;
  prices: number[] | null;
}

export interface CreateOrderData {
  userId: number;
  price: number;
}

export interface FetchOrderData {
  userId: number;
}

export interface FetchedData {
  orderIdsList: number[];
  orderProductsList: Product[];
  ordersPrices: number[];
}

export interface FetchedOneData {
  orderId: number;
  orderProductsList: Product[];
  orderPrice: number;
}

export interface ProductView {
  id: number,
  orderId: number;
  name: string;
  quantity: number;
  price: number;
}