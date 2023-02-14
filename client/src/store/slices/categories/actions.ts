import { createAsyncThunk } from "@reduxjs/toolkit";
import { Category, UserData } from './types';
import { $privateHost, $publicHost } from "api";
import { apiUrls } from 'utils/apiUrls';

export const createCategory = createAsyncThunk<undefined, UserData, { rejectValue: string }>(
  'categories/createCategory',
  async ({ name }, { rejectWithValue }) => {
    try {
      await $privateHost.post(apiUrls.categories, {
        name
      });

    } catch (err: any) {
      return rejectWithValue(err.response.data.message)
    }
  }
);

export const deleteCategory = createAsyncThunk<undefined, UserData, { rejectValue: string }>(
  'categories/deleteCategory',
  async ({ name }, { rejectWithValue }) => {
    try {
      await $privateHost.delete(apiUrls.categories, {
        data: { name }
      });

    } catch (err: any) {
      return rejectWithValue(err.response.data.message)
    }
  }
);

export const fetchCategories = createAsyncThunk<Category[], undefined, { rejectValue: string }>(
  'categories/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await $publicHost.get<Category[]>(apiUrls.categories);
      return data as Category[];

    } catch (err: any) {
      return rejectWithValue(err.response.data.message)
    }
  }
);