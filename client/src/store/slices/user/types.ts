export interface User {
  id: number;
  email: string;
  password: string;
  role: string;
}

export interface UserState {
  user: User | null;
  isUserAuth: boolean;

  loading: boolean;
  error: null | string;
}

export interface UserData {
  email: string;
  password: string;
}

export interface Token {
  token: string;
}