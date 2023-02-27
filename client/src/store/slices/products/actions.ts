import { createAsyncThunk } from "@reduxjs/toolkit";
import { Product, GetData, DeleteData, GetOneData, DetailedProduct } from './types';
import { $privateHost, $publicHost } from "api";
import { apiUrls } from 'utils/apiUrls';

export const createProduct = createAsyncThunk<undefined, FormData, { rejectValue: string }>(
  'products/createProduct',
  async (data: FormData, { rejectWithValue }) => {
    try {
      await $privateHost.post(apiUrls.products, data);

    } catch (err: any) {
      return rejectWithValue(err.response.data.message)
    }
  }
);

export const deleteProduct = createAsyncThunk<undefined, DeleteData, { rejectValue: string }>(
  'products/deleteProduct',
  async (data: DeleteData, { rejectWithValue }) => {
    try {
      await $privateHost.delete(apiUrls.products, { data: data });

    } catch (err: any) {
      return rejectWithValue(err.response.data.message)
    }
  }
);

// categoryId = null if we need to fetch all categories
export const fetchProducts = createAsyncThunk<Product[], GetData, { rejectValue: string }>(
  'products/getProducts',
  async (params: GetData, { rejectWithValue }) => {
    try {
      const { data } = await $publicHost.get<Product[]>(apiUrls.products, { params: params });
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