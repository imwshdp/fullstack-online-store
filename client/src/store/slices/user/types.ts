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
  username: string;
}

export interface UserLoginData {
  email: string;
  password: string;
}


export interface Token {
  token: string;
}