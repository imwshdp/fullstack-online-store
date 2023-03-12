import { createSlice } from '@reduxjs/toolkit'
import { registration, login, check } from './actions';
import { setError, setLoading } from 'utils/asyncSetters';
import { UserState } from './types';

const initialState: UserState = {
  user: null,
  isUserAuth: false,

  loading: false,
  error: null,
}

// slice
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // registration
      .addCase(registration.pending, (state) => setLoading(state))
      .addCase(registration.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registration.rejected, (state, action) => setError(state, action))

      // login
      .addCase(login.pending, (state) => setLoading(state))
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isUserAuth = true;

        state.loading = false;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => setError(state, action))

      // check
      .addCase(check.pending, (state) => setLoading(state))
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