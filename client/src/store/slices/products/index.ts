import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createCategory } from './actions';
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
  reducers: {
    // setCategories(state, action: PayloadAction<Category[]>) {
    //   state.categories = action.payload;
    // },

    // setProducts(state, action: PayloadAction<Product[]>) {
    //   state.products = action.payload;
    // },

    // setSelectedCategory(state, action: PayloadAction<Category>) {
    //   state.selectedCategory = action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      // create category
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
  }
});

export default productsSlice.reducer;