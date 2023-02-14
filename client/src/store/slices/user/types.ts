import { ErrorState } from "utils/asyncSetters";

export interface User {
  id: number;
  email: string;
  role: string;
}

export interface UserState extends ErrorState {
  user: User | null;
  isUserAuth: boolean;
}

export interface UserData {
  email: string;
  password: string;
}

export interface Token {
  token: string;
}