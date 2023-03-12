import { createSlice } from '@reduxjs/toolkit'
import { createBasketProduct, decreaseBasketProduct, deleteBasketProduct, fetchBasket, fetchBasketProduct, increaseBasketProduct } from './actions';
import { setError, setLoading } from 'utils/asyncSetters';
import { BasketState } from './types';

const initialState: BasketState = {
  products: [],
  basketId: null,

  loading: false,
  error: null,
}

// slice
const basketSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // adding in basket
      .addCase(createBasketProduct.pending, (state) => setLoading(state))
      .addCase(createBasketProduct.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createBasketProduct.rejected, (state, action) => setError(state, action))

      // deleting in basket
      .addCase(deleteBasketProduct.pending, (state) => setLoading(state))
      .addCase(deleteBasketProduct.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteBasketProduct.rejected, (state, action) => setError(state, action))

      // increase in basket
      .addCase(increaseBasketProduct.pending, (state) => setLoading(state))
      .addCase(increaseBasketProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products[action.payload.index] = action.payload.data
      })
      .addCase(increaseBasketProduct.rejected, (state, action) => setError(state, action))

      // decrease in basket
      .addCase(decreaseBasketProduct.pending, (state) => setLoading(state))
      .addCase(decreaseBasketProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.products[action.payload.index] = action.payload.data
      })
      .addCase(decreaseBasketProduct.rejected, (state, action) => setError(state, action))

      // basket products fetching
      .addCase(fetchBasketProduct.pending, (state) => setLoading(state))
      .addCase(fetchBasketProduct.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(fetchBasketProduct.rejected, (state, action) => setError(state, action))

      // basket id fetching
      .addCase(fetchBasket.pending, (state) => setLoading(state))
      .addCase(fetchBasket.fulfilled, (state, action) => {
        state.basketId = action.payload.id;
        state.loading = false;
      })
      .addCase(fetchBasket.rejected, (state, action) => setError(state, action))
  }
});

export default basketSlice.reducer;