import { registration, login, check } from './actions';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User, UserState } from './types';

const initialState: UserState = {
  user: null,
  isUserAuth: false,
  loading: false,
  error: null,
}

const setError = (state: UserState, action: PayloadAction<string | undefined>) => {
  if (action.payload) {
    state.loading = false;
    state.error = action.payload;
    console.log(action.payload)
  }
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // registration
      .addCase(registration.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registration.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registration.rejected, (state, action) => setError(state, action))

      // login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isUserAuth = true;

        state.loading = false;
        state.error = null;
        console.log("state: ", state.user)
      })
      .addCase(login.rejected, (state, action) => setError(state, action))

      // check
      .addCase(check.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(check.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isUserAuth = true;

        state.loading = false;
        state.error = null;
      })
      .addCase(check.rejected, (state, action) => setError(state, action))
  }
});

export default userSlice.reducer;