import { createAsyncThunk } from "@reduxjs/toolkit";
import { $privateHost } from "api";
import { apiUrls } from "utils/apiUrls";
import { Basket, BasketData, ChangeBasketProductData, FetchBasketData, FetchData, ProductInBasket, ProductInBasketWithIndex } from "./types";

// basket products actions
export const createBasketProduct = createAsyncThunk<undefined, BasketData, { rejectValue: string }>(
  'basket/createBasketProduct',
  async ({ productId, basketId }, { rejectWithValue }) => {
    try {
      await $privateHost.post(apiUrls.basket, {
        productId,
        basketId,
      });

    } catch (err: any) {
      return rejectWithValue(err.response.data.message)
    }
  }
);

export const deleteBasketProduct = createAsyncThunk<undefined, BasketData, { rejectValue: string }>(
  'basket/deleteBasketProduct',
  async ({ productId, basketId }, { rejectWithValue }) => {
    try {
      await $privateHost.delete(apiUrls.basket, {
        data: { productId, basketId }
      });

    } catch (err: any) {
      return rejectWithValue(err.response.data.message)
    }
  }
);

export const fetchBasketProduct = createAsyncThunk<ProductInBasket[], FetchData, { rejectValue: string }>(
  'basket/fetchBasketProduct',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await $privateHost.get<ProductInBasket[]>(apiUrls.basket, { params: params });
      return data as ProductInBasket[];

    } catch (err: any) {
      return rejectWithValue(err.response.data.message)
    }
  }
);

// increasing and decreasing basket products
export const increaseBasketProduct = createAsyncThunk<ProductInBasketWithIndex, ChangeBasketProductData, { rejectValue: string }>(
  'basket/increaseBasketProduct',
  async ({ productId, basketId, index }, { rejectWithValue }) => {
    try {
      const { data } = await $privateHost.put<ProductInBasket>(apiUrls.increase, {
        productId: productId,
        basketId: basketId,
      });
      return { data, index } as ProductInBasketWithIndex;

    } catch (err: any) {
      return rejectWithValue(err.response.data.message)
    }
  }
);

export const decreaseBasketProduct = createAsyncThunk<ProductInBasketWithIndex, ChangeBasketProductData, { rejectValue: string }>(
  'basket/decreaseBasketProduct',
  async ({ productId, basketId, index }, { rejectWithValue }) => {
    try {
      const { data } = await $privateHost.put(apiUrls.decrease, {
        data: { productId, basketId }
      });
      return { data, index } as ProductInBasketWithIndex;

    } catch (err: any) {
      return rejectWithValue(err.response.data.message)
    }
  }
);

// fetch user basket
export const fetchBasket = createAsyncThunk<Basket, FetchBasketData, { rejectValue: string }>(
  'basket/fetchBasket',
  async ({ userId }, { rejectWithValue }) => {
    try {
      const { data } = await $privateHost.get<Basket>(apiUrls.baskets, { params: { userId } });
      return data as Basket;

    } catch (err: any) {
      return rejectWithValue(err.response.data.message)
    }
  }
);