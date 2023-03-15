import { createAsyncThunk } from "@reduxjs/toolkit";
import { $privateHost } from "api";
import { apiUrls } from "utils/apiUrls";
import { CreateOrderData, FetchedData, FetchOrderData } from "./types";

// orders actions
export const createOrder = createAsyncThunk<undefined, CreateOrderData, { rejectValue: string }>(
  'orders/createOrder',
  async ({ userId, price }, { rejectWithValue }) => {
    try {
      await $privateHost.post(apiUrls.orders, {
        userId,
        price,
      });

    } catch (err: any) {
      return rejectWithValue(err.response.data.message)
    }
  }
);

export const fetchOrders = createAsyncThunk<FetchedData, FetchOrderData, { rejectValue: string }>(
  'orders/fetchOrders',
  async ({ userId }, { rejectWithValue }) => {
    try {
      const { data } = await $privateHost.get(apiUrls.orders, { params: { userId } });
      return data as FetchedData;

    } catch (err: any) {
      return rejectWithValue(err.response.data.message)
    }
  }
);