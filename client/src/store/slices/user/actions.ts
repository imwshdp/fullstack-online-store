import { createAsyncThunk } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
import { $publicHost } from "api";
import { apiUrls } from 'utils/apiUrls';
import { Token, User, UserLoginData, UserRegistrationData } from './types';

const configureUser = (data: Token): User => {
  const decoded: User = jwt_decode(data.token);
  return {
    id: decoded.id,
    email: decoded.email,
    role: decoded.role,
    username: decoded.username,
  }
}

export const registration = createAsyncThunk<User, UserRegistrationData, { rejectValue: string }>(
  'user/registration',
  async ({ email, password, username }, { rejectWithValue }) => {
    try {
      const { data } = await $publicHost.post<Token>(apiUrls.registration, {
        email,
        password,
        role: 'USER',
        username: username,
      });
      localStorage.setItem('token', data.token);
      return configureUser(data);

    } catch (err: any) {
      return rejectWithValue(err.response.data.message)
    }
  }
);

export const login = createAsyncThunk<User, UserLoginData, { rejectValue: string }>(
  'user/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await $publicHost.post<Token>(apiUrls.login, {
        email,
        password,
      });
      localStorage.setItem('token', data.token);
      return configureUser(data);

    } catch (err: any) {
      return rejectWithValue(err.response.data.message)
    }
  }
);

export const check = createAsyncThunk<User, undefined, { rejectValue: string }>(
  'user/check',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await $publicHost.get<Token>(apiUrls.auth)
      localStorage.setItem('token', data.token);
      return configureUser(data);

    } catch (err: any) {
      return rejectWithValue(err.response.data.message)
    }
  }
);