import { createAsyncThunk } from "@reduxjs/toolkit";
import { $privateHost, $publicHost } from "api";
import { apiUrls } from 'utils/apiUrls';
import { Product, GetData, DeleteData, GetOneData, DetailedProduct, CreateReviewData, Review, GetReviewsData, DeleteReviewsData } from './types';

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

export const deleteProduct = createAsyncThunk<number, DeleteData, { rejectValue: string }>(
  'products/deleteProduct',
  async (data, { rejectWithValue }) => {
    try {
      await $privateHost.delete(apiUrls.products, { data: data });
      return data.id;

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
export const createReview = createAsyncThunk<Review, CreateReviewData, { rejectValue: string }>(
  'products/createReview',
  async ({ productId, userId, score, review, username }, { rejectWithValue }) => {
    try {
      const { data } = await $privateHost.post<Review>(apiUrls.reviews, { productId, userId, score, review, username });
      return data as Review;

    } catch (err: any) {
      return rejectWithValue(err.response.data.message)
    }
  }
);

export const deleteReview = createAsyncThunk<number, DeleteReviewsData, { rejectValue: string }>(
  'products/deleteReview',
  async ({ userId, productId }, { rejectWithValue }) => {
    try {
      const { data } = await $privateHost.delete(apiUrls.reviews, { data: { userId, productId } });
      return data;

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

// CNAHGING ONE PRODUCT STATE
export const changeProductBasics = createAsyncThunk<DetailedProduct, FormData, { rejectValue: string }>(
  'products/changeProductBasics',
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await $privateHost.put<DetailedProduct>(apiUrls.productChangeBasics, body);
      return data as DetailedProduct;

    } catch (err: any) {
      return rejectWithValue(err.response.data.message)
    }
  }
);

export const changeProductExtra = createAsyncThunk<DetailedProduct, FormData, { rejectValue: string }>(
  'products/changeProductExtra',
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await $privateHost.put<DetailedProduct>(apiUrls.productChangeExtra, body);
      return data as DetailedProduct;

    } catch (err: any) {
      return rejectWithValue(err.response.data.message)
    }
  }
);

export const deleteImage = createAsyncThunk<number, DeleteData, { rejectValue: string }>(
  'products/deleteImage',
  async ({ id }, { rejectWithValue }) => {
    try {
      await $privateHost.delete(apiUrls.images, { data: { id } });
      return id;

    } catch (err: any) {
      return rejectWithValue(err.response.data.message)
    }
  }
);

export const deleteInfo = createAsyncThunk<number, DeleteData, { rejectValue: string }>(
  'products/deleteInfo',
  async ({ id }, { rejectWithValue }) => {
    try {
      await $privateHost.delete(apiUrls.info, { data: { id } });
      return id;

    } catch (err: any) {
      return rejectWithValue(err.response.data.message)
    }
  }
);