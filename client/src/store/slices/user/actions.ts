import { createAsyncThunk } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
import { $publicHost } from "../../../api";
import { Token, User, UserData } from './types';

export const registration = createAsyncThunk<User, UserData, { rejectValue: string }>(
  'user/registration',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await $publicHost.post<Token>('/api/user/registration', { email, password, role: 'USER' });
      localStorage.setItem('token', response.data.token);
      return jwt_decode(response.data.token) as User;

    } catch (err: any) {
      return rejectWithValue(err.response.data.message)
    }
  }
);

export const login = createAsyncThunk<User, UserData, { rejectValue: string }>(
  'user/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await $publicHost.post<Token>('/api/user/login', { email, password })
      localStorage.setItem('token', response.data.token);
      return jwt_decode(response.data.token) as User;

    } catch (err: any) {
      return rejectWithValue(err.response.data.message)
    }
  }
);

export const check = createAsyncThunk<User, undefined, { rejectValue: string }>(
  'user/check',
  async (_, { rejectWithValue }) => {
    try {
      const response = await $publicHost.post<Token>('/api/user/auth')
      localStorage.setItem('token', response.data.token);
      return jwt_decode(response.data.token) as User;

    } catch (err: any) {
      return rejectWithValue(err.response.data.message)
    }
  }
);