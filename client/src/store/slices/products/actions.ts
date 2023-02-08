import { Category, UserData } from './types';
import { createAsyncThunk } from "@reduxjs/toolkit";
import { $privateHost } from "../../../api";

export const createCategory = createAsyncThunk<Category, UserData, { rejectValue: string }>(
  'products/createCategory',
  async ({ name }, { rejectWithValue }) => {
    try {
      const { data } = await $privateHost.post('/api/type', name);
      return data as Category;

    } catch (err: any) {
      return rejectWithValue(err.response.data.message)
    }
  }
);