import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createCategory, deleteCategory, fetchCategories } from './actions';
import { ProductsState, Category, Product } from './types';

const initialState: ProductsState = {
  categories: null,
  products: null,
  selectedCategory: null,
  loading: false,
  error: null,
}

const setError = (state: ProductsState, action: PayloadAction<string | undefined>) => {
  if (action.payload) {
    state.loading = false;
    state.error = action.payload;
    console.log(action.payload)
  }
}

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // category creating
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        if (state.categories) {
          state.categories.push(action.payload);
        } else {
          state.categories = [action.payload];
        }

        state.loading = false;
      })
      .addCase(createCategory.rejected, (state, action) => setError(state, action))

      // categories fetching
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.loading = false;
      })
      .addCase(fetchCategories.rejected, (state, action) => setError(state, action))

      // category deleting
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteCategory.rejected, (state, action) => setError(state, action))
  }
});

export default productsSlice.reducer;