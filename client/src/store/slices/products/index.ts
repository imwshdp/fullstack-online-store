// export { default as productsReducer } from './slice';

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ProductsState, TCategory, TProduct } from './types';

const initialState: ProductsState = {
  categories: [],
  products: [],
  selectedCategory: {},
}

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setCategories(state, action: PayloadAction<TCategory[]>) {
      state.categories = action.payload;
    },

    setProducts(state, action: PayloadAction<TProduct[]>) {
      state.products = action.payload;
    },

    setSelectedCategory(state, action: PayloadAction<TCategory>) {
      state.selectedCategory = action.payload;
    },
  }
});

export const { setCategories, setProducts, setSelectedCategory } = productsSlice.actions;
export default productsSlice.reducer;