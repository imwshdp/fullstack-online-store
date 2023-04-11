import { PayloadAction } from "@reduxjs/toolkit";

export interface ErrorState {
  loading: boolean;
  error: string | null;
}

export function setError(state: ErrorState, action: PayloadAction<string | undefined>): void {
  if (action.payload) {
    state.loading = false;
    state.error = action.payload;
    console.log(action.payload)
  }
}

export function setLoading(state: ErrorState): void {
  state.loading = true;
  state.error = null;
}