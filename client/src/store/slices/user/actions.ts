import { createAsyncThunk } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
import { $privateHost, $publicHost } from "api";
import { apiUrls } from 'utils/apiUrls';
import { Token, User, UserLoginData, UserRegistrationData, deleteUser, changeUserEmail, changeUserPassword, changeUserUsername } from './types';

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
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await $publicHost.post<Token>(apiUrls.registration, {
        email,
        password,
        role: 'USER',
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
      const { data } = await $publicHost.post<Token>(apiUrls.login, { email, password });
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

export const removeUser = createAsyncThunk<undefined, deleteUser, { rejectValue: string }>(
  'user/removeUser',
  async ({ id }, { rejectWithValue }) => {
    try {
      await $privateHost.delete(apiUrls.deleteUser, { data: { id } });
      localStorage.removeItem('token')

    } catch (err: any) {
      return rejectWithValue(err.response.data.message)
    }
  }
);

export const changeEmail = createAsyncThunk<User, changeUserEmail, { rejectValue: string }>(
  'user/changeEmail',
  async ({ id, email }, { rejectWithValue }) => {
    try {
      const { data } = await $privateHost.put<Token>(apiUrls.changeEmail, { id, email });
      localStorage.setItem('token', data.token);
      return configureUser(data);

    } catch (err: any) {
      return rejectWithValue(err.response.data.message)
    }
  }
);

export const changePassword = createAsyncThunk<User, changeUserPassword, { rejectValue: string }>(
  'user/changePassword',
  async ({ id, password, oldPassword }, { rejectWithValue }) => {
    try {
      const { data } = await $privateHost.put<Token>(apiUrls.changePassword, { id, password, oldPassword });
      localStorage.setItem('token', data.token);
      return configureUser(data);

    } catch (err: any) {
      return rejectWithValue(err.response.data.message)
    }
  }
);

export const changeUsername = createAsyncThunk<User, changeUserUsername, { rejectValue: string }>(
  'user/changeUsername',
  async ({ id, username }, { rejectWithValue }) => {
    try {
      const { data } = await $privateHost.put<Token>(apiUrls.changeUsername, { id, username });
      localStorage.setItem('token', data.token);
      return configureUser(data);

    } catch (err: any) {
      return rejectWithValue(err.response.data.message)
    }
  }
);