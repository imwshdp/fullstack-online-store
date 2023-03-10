import { createSlice } from '@reduxjs/toolkit'
import { createCategory, deleteCategory, fetchCategories } from './actions';
import { setError, setLoading } from 'utils/asyncSetters';
import { CategoriesState } from './types';

const initialState: CategoriesState = {
  categories: null,
  activeCategory: null,

  loading: false,
  error: null,
}

// slice
const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setActiveCategory(state, action) {
      state.activeCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // category creating
      .addCase(createCategory.pending, (state) => setLoading(state))
      .addCase(createCategory.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createCategory.rejected, (state, action) => setError(state, action))

      // categories fetching
      .addCase(fetchCategories.pending, (state) => setLoading(state))
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.loading = false;
      })
      .addCase(fetchCategories.rejected, (state, action) => setError(state, action))

      // category deleting
      .addCase(deleteCategory.pending, (state) => setLoading(state))
      .addCase(deleteCategory.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteCategory.rejected, (state, action) => setError(state, action))
  }
});

export const { setActiveCategory } = categoriesSlice.actions;
export default categoriesSlice.reducer;