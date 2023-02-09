import { apiUrls } from './../../../utils/apiUrls';
import { Category, UserData } from './types';
import { createAsyncThunk } from "@reduxjs/toolkit";
import { $privateHost, $publicHost } from "../../../api";

export const createCategory = createAsyncThunk<Category, UserData, { rejectValue: string }>(
  'products/createCategory',
  async ({ name }, { rejectWithValue }) => {
    try {
      const { data } = await $privateHost.post<Category>(apiUrls.categories, name);
      return data as Category;

    } catch (err: any) {
      return rejectWithValue(err.response.data.message)
    }
  }
);

export const fetchCategories = createAsyncThunk<Category[], undefined, { rejectValue: string }>(
  'products/fetchCategory',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await $publicHost.get<Category[]>(apiUrls.categories);
      return data as Category[];

    } catch (err: any) {
      return rejectWithValue(err.response.data.message)
    }
  }
);

export const deleteCategory = createAsyncThunk<boolean, UserData, { rejectValue: string }>(
  'products/deleteCategory',
  async ({ name }, { rejectWithValue }) => {
    try {
      const { data } = await $privateHost.delete<boolean>(apiUrls.categories, {
        data: { name }
      });
      return data as boolean;

    } catch (err: any) {
      return rejectWithValue(err.response.data.message)
    }
  }
);