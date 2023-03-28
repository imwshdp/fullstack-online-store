import { createSlice } from '@reduxjs/toolkit'
import { registration, login, check, removeUser, changeEmail, changePassword, changeUsername } from './actions';
import { setError, setLoading } from 'utils/asyncSetters';
import { User, UserState } from './types';

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
  reducers: {
    logout(state, action) {
      localStorage.removeItem('token')
      state.user = null
      state.isUserAuth = false
    },

    checkToken(state, action) {
      if (action.payload) {
        state.user = action.payload
        state.isUserAuth = true
      }
    }
  },
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

      // deleting
      .addCase(removeUser.pending, (state) => setLoading(state))
      .addCase(removeUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.isUserAuth = false;
      })
      .addCase(removeUser.rejected, (state, action) => setError(state, action))

      // CHANGING
      // email
      .addCase(changeEmail.pending, (state) => setLoading(state))
      .addCase(changeEmail.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isUserAuth = true;
        state.loading = false;
        state.error = null;
      })
      .addCase(changeEmail.rejected, (state, action) => setError(state, action))

      // password
      .addCase(changePassword.pending, (state) => setLoading(state))
      .addCase(changePassword.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isUserAuth = true;
        state.loading = false;
        state.error = null;
      })
      .addCase(changePassword.rejected, (state, action) => setError(state, action))

      // username
      .addCase(changeUsername.pending, (state) => setLoading(state))
      .addCase(changeUsername.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isUserAuth = true;
        state.loading = false;
        state.error = null;
      })
      .addCase(changeUsername.rejected, (state, action) => setError(state, action))
  }
});

export const { logout, checkToken } = userSlice.actions;
export default userSlice.reducer;

function jwt_decode(token: any): User {
  throw new Error('Function not implemented.');
}
