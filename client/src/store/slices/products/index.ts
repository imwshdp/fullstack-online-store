import { createProduct, deleteProduct, fetchProduct, fetchProducts } from './actions';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ProductsState } from './types';

const initialState: ProductsState = {
  products: null,
  activeProduct: null,

  loading: false,
  error: null,
}

// helpes
const setError = (state: ProductsState, action: PayloadAction<string | undefined>) => {
  if (action.payload) {
    state.loading = false;
    state.error = action.payload;
    console.log(action.payload)
  }
}

const setLoading = (state: ProductsState) => {
  state.loading = true;
  state.error = null;
}

// slice
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
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

export default productsSlice.reducer;