export type TUser = {
  id: number;
  email: string;
  password: string;
  role: string;
}

export type UserState = {
  user: TUser | {};
  isUserAuth: boolean;
}