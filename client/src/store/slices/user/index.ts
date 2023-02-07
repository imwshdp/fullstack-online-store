// export { default as userReducer } from './slice';

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TUser, UserState } from './types';

const initialState: UserState = {
  user: {},
  isUserAuth: false,
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<boolean>) {
      state.isUserAuth = action.payload;
    },

    setUser(state, action: PayloadAction<TUser>) {
      state.user = action.payload;
    },
  }
});

export const { setAuth, setUser } = userSlice.actions;
export default userSlice.reducer;