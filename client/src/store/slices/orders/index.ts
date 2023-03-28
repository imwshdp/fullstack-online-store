import { createSlice } from '@reduxjs/toolkit'
import { setError, setLoading } from 'utils/asyncSetters';
import { createOrder, fetchOrders } from './actions';
import { OrdersState } from './types';


const initialState: OrdersState = {
  ordersIds: null,
  products: null,
  prices: null,

  loading: false,
  error: null,
}

// slice
const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // order creating
      .addCase(createOrder.pending, (state) => setLoading(state))
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.ordersIds?.push(action.payload.orderId)
        state.products?.push(...action.payload.orderProductsList)
        state.prices?.push(action.payload.orderPrice)
      })
      .addCase(createOrder.rejected, (state, action) => setError(state, action))

      // fetch orders
      .addCase(fetchOrders.pending, (state) => setLoading(state))
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.ordersIds = action.payload.orderIdsList
        state.products = action.payload.orderProductsList
        state.prices = action.payload.ordersPrices
      })
      .addCase(fetchOrders.rejected, (state, action) => setError(state, action))
  }
});

export default ordersSlice.reducer;