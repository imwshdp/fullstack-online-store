export interface User {
  id: number;
  email: string;
  role: string;
}

export interface UserState {
  user: User | null;
  isUserAuth: boolean;

  loading: boolean;
  error: string | null;
}

export interface UserData {
  email: string;
  password: string;
}

export interface Token {
  token: string;
}