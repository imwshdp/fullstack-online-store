import { createAsyncThunk } from "@reduxjs/toolkit";
import { Product, CreateData, GetData, DeleteData, GetOneData, DetailedProduct } from './types';
import { $privateHost, $publicHost } from "../../../api";
import { apiUrls } from '../../../utils/apiUrls';

export const createProduct = createAsyncThunk<undefined, CreateData, { rejectValue: string }>(
  'products/createProduct',
  async ({ name, price, categoryId, info, images }: CreateData, { rejectWithValue }) => {
    try {
      await $privateHost.post(apiUrls.products, {
        name,
        price,
        categoryId,
        info,
        images,
      });

    } catch (err: any) {
      return rejectWithValue(err.response.data.message)
    }
  }
);

export const deleteProduct = createAsyncThunk<undefined, DeleteData, { rejectValue: string }>(
  'products/deleteProduct',
  async ({ id }: DeleteData, { rejectWithValue }) => {
    try {
      await $privateHost.delete(apiUrls.products, {
        data: { id }
      });

    } catch (err: any) {
      return rejectWithValue(err.response.data.message)
    }
  }
);

export const fetchProducts = createAsyncThunk<Product[], GetData, { rejectValue: string }>(
  'products/getProducts',
  async ({ categoryId }: GetData, { rejectWithValue }) => {
    try {
      const { data } = await $publicHost.get<Product[]>(apiUrls.products, {
        params: { categoryId }
      });
      return data as Product[];

    } catch (err: any) {
      return rejectWithValue(err.response.data.message)
    }
  }
);

export const fetchProduct = createAsyncThunk<DetailedProduct, GetOneData, { rejectValue: string }>(
  'products/getProduct',
  async ({ id }: GetOneData, { rejectWithValue }) => {
    try {
      const { data } = await $publicHost.get<DetailedProduct>(apiUrls.products + '/' + id);
      return data as DetailedProduct;

    } catch (err: any) {
      return rejectWithValue(err.response.data.message)
    }
  }
);