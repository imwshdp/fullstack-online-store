import { createSlice } from '@reduxjs/toolkit'
import { changeProduct, createProduct, createReview, deleteImage, deleteProduct, fetchProduct, fetchProducts, fetchReviews } from './actions';
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

      // review creating
      .addCase(createReview.pending, (state) => setLoading(state))
      .addCase(createReview.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createReview.rejected, (state, action) => setError(state, action))

      // reviews fetching
      .addCase(fetchReviews.pending, (state) => setLoading(state))
      .addCase(fetchReviews.fulfilled, (state, action) => {
        if (!state.activeProduct) return;
        state.activeProduct.review = action.payload;
        state.loading = false;
      })
      .addCase(fetchReviews.rejected, (state, action) => setError(state, action))

      // product changing
      .addCase(changeProduct.pending, (state) => setLoading(state))
      .addCase(changeProduct.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(changeProduct.rejected, (state, action) => setError(state, action))

      // image deleting
      .addCase(deleteImage.pending, (state) => setLoading(state))
      .addCase(deleteImage.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteImage.rejected, (state, action) => setError(state, action))
  }
});

export const { setActiveProduct } = productsSlice.actions;
export default productsSlice.reducer;