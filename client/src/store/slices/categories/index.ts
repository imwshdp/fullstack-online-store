import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createCategory, deleteCategory, fetchCategories } from './actions';
import { CategoriesState } from './types';

const initialState: CategoriesState = {
  categories: null,
  activeCategory: null,

  loading: false,
  error: null,
}

// helpes
const setError = (state: CategoriesState, action: PayloadAction<string | undefined>) => {
  if (action.payload) {
    state.loading = false;
    state.error = action.payload;
    console.log(action.payload)
  }
}

const setLoading = (state: CategoriesState) => {
  state.loading = true;
  state.error = null;
}

// slice
const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
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

export default categoriesSlice.reducer;