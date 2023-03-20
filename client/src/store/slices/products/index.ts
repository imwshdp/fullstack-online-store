import { createSlice } from '@reduxjs/toolkit'
import { changeProductBasics, changeProductExtra, createProduct, createReview, deleteImage, deleteInfo, deleteProduct, fetchProduct, fetchProducts, fetchReviews } from './actions';
import { setError, setLoading } from 'utils/asyncSetters';
import { ProductInfo, ProductsState } from './types';

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
      .addCase(changeProductBasics.pending, (state) => setLoading(state))
      .addCase(changeProductBasics.fulfilled, (state, action) => {
        state.activeProduct = action.payload;
        state.loading = false;
      })
      .addCase(changeProductBasics.rejected, (state, action) => setError(state, action))

      // product changing (extra props)
      .addCase(changeProductExtra.pending, (state) => setLoading(state))
      .addCase(changeProductExtra.fulfilled, (state, action) => {
        state.activeProduct = action.payload;
        state.loading = false;
      })
      .addCase(changeProductExtra.rejected, (state, action) => setError(state, action))

      // image deleting
      .addCase(deleteImage.pending, (state) => setLoading(state))
      .addCase(deleteImage.fulfilled, (state, action) => {
        if (!state.activeProduct) return;
        let filtered: any[] = [...state.activeProduct.image]
        filtered = state.activeProduct?.image.filter(i => i.id !== action.payload)
        state.activeProduct.image = filtered
        state.loading = false;
      })
      .addCase(deleteImage.rejected, (state, action) => setError(state, action))

      // info deleting
      .addCase(deleteInfo.pending, (state) => setLoading(state))
      .addCase(deleteInfo.fulfilled, (state, action) => {
        if (!state.activeProduct) return;
        let filtered: ProductInfo[] = [...state.activeProduct.info]
        filtered = state.activeProduct?.info.filter(i => i.id !== action.payload)
        state.activeProduct.info = filtered
        state.loading = false;
      })
      .addCase(deleteInfo.rejected, (state, action) => setError(state, action))
  }
});

export const { setActiveProduct } = productsSlice.actions;
export default productsSlice.reducer;