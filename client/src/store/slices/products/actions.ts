import { createAsyncThunk } from "@reduxjs/toolkit";
import { $privateHost, $publicHost } from "api";
import { apiUrls } from 'utils/apiUrls';
import { Product, GetData, DeleteData, GetOneData, DetailedProduct, CreateReviewData, Review, GetReviewsData } from './types';

// PRODUCTS
export const createProduct = createAsyncThunk<undefined, FormData, { rejectValue: string }>(
  'products/createProduct',
  async (data, { rejectWithValue }) => {
    try {
      await $privateHost.post(apiUrls.products, data);

    } catch (err: any) {
      return rejectWithValue(err.response.data.message)
    }
  }
);

export const deleteProduct = createAsyncThunk<undefined, DeleteData, { rejectValue: string }>(
  'products/deleteProduct',
  async (data, { rejectWithValue }) => {
    try {
      await $privateHost.delete(apiUrls.products, { data: data });

    } catch (err: any) {
      return rejectWithValue(err.response.data.message)
    }
  }
);

// categoryId = null if need to fetch all categories
export const fetchProducts = createAsyncThunk<Product[], GetData, { rejectValue: string }>(
  'products/getProducts',
  async (params, { rejectWithValue }) => {
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
  async ({ id }, { rejectWithValue }) => {
    try {
      const { data } = await $publicHost.get<DetailedProduct>(`${apiUrls.products}/${id}`);
      return data as DetailedProduct;

    } catch (err: any) {
      return rejectWithValue(err.response.data.message)
    }
  }
);

// REVIEWS
export const createReview = createAsyncThunk<undefined, CreateReviewData, { rejectValue: string }>(
  'products/createReview',
  async (data, { rejectWithValue }) => {
    try {
      await $privateHost.post(apiUrls.reviews, data);

    } catch (err: any) {
      return rejectWithValue(err.response.data.message)
    }
  }
);

export const fetchReviews = createAsyncThunk<Review[], GetReviewsData, { rejectValue: string }>(
  'products/fetchReviews',
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await $publicHost.get<Review[]>(apiUrls.reviews, { params: params });
      return data as Review[];

    } catch (err: any) {
      return rejectWithValue(err.response.data.message)
    }
  }
);

// CNAHGING
export const changeProduct = createAsyncThunk<undefined, FormData, { rejectValue: string }>(
  'products/changeProduct',
  async (data, { rejectWithValue }) => {
    try {
      await $privateHost.put(apiUrls.products, data);

    } catch (err: any) {
      return rejectWithValue(err.response.data.message)
    }
  }
);

export const deleteImage = createAsyncThunk<undefined, DeleteData, { rejectValue: string }>(
  'products/deleteImage',
  async (data, { rejectWithValue }) => {
    try {
      await $privateHost.delete(apiUrls.images, { data: data });

    } catch (err: any) {
      return rejectWithValue(err.response.data.message)
    }
  }
);