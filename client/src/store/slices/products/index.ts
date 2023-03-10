import { createSlice } from '@reduxjs/toolkit'
import { createProduct, deleteProduct, fetchProduct, fetchProducts } from './actions';
import { setError, setLoading } from 'utils/asyncSetters';
import { ProductsState } from './types';

const initialState: ProductsState = {
  products: null,
  activeProduct: null,

  loading: false,
  error: null,
}

// slice
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setActiveProduct(state, action) {
      state.activeProduct = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // product creating
      .addCase(createProduct.pending, (state) => setLoading(state))
      .addCase(createProduct.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createProduct.rejected, (state, action) => setError(state, action))

      // product deleting
      .addCase(deleteProduct.pending, (state) => setLoading(state))
      .addCase(deleteProduct.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteProduct.rejected, (state, action) => setError(state, action))

      // products fetching
      .addCase(fetchProducts.pending, (state) => setLoading(state))
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => setError(state, action))

      // active product fetching
      .addCase(fetchProduct.pending, (state) => setLoading(state))
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.activeProduct = action.payload;
        state.loading = false;
      })
      .addCase(fetchProduct.rejected, (state, action) => setError(state, action))
  }
});

export const { setActiveProduct } = productsSlice.actions;
export default productsSlice.reducer;