import { ErrorState } from "utils/asyncSetters";

export interface User {
  id: number;
  email: string;
  role: string;
  username: string;
}

export interface UserState extends ErrorState {
  user: User | null;
  isUserAuth: boolean;
}

export interface UserRegistrationData {
  email: string;
  password: string;
}

export interface UserLoginData {
  email: string;
  password: string;
}


export interface Token {
  token: string;
}

export interface deleteUser {
  id: number;
}

export interface changeUserEmail {
  id: number;
  email: string;
}

export interface changeUserPassword {
  id: number;
  password: string;
  oldPassword: string;
}

export interface changeUserUsername {
  id: number;
  username: string;
}