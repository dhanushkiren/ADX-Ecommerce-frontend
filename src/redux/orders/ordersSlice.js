// redux/slices/ordersSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  currentOrder: null,
  loading: false,
  error: null,
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    fetchOrdersRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchOrdersSuccess: (state, action) => {
      console.log("orders fetched:", action.payload);
      state.loading = false;
      state.orders = action.payload;
    },
    fetchOrdersFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    placeOrderRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    placeOrderSuccess: (state, action) => {
      state.loading = false;
      state.orders.push(action.payload);
    },
    placeOrderFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    cancelOrderRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    cancelOrderSuccess: (state, action) => {
      state.loading = false;
      state.orders = state.orders.filter(
        (order) => order.id !== action.payload
      );
    },
    cancelOrderFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    getOrderDetailsRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    getOrderDetailsSuccess: (state, action) => {
      state.loading = false;
      state.currentOrder = action.payload;
    },
    getOrderDetailsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchOrdersRequest,
  fetchOrdersSuccess,
  fetchOrdersFailure,
  placeOrderRequest,
  placeOrderSuccess,
  placeOrderFailure,
  cancelOrderRequest,
  cancelOrderSuccess,
  cancelOrderFailure,
  getOrderDetailsRequest,
  getOrderDetailsSuccess,
  getOrderDetailsFailure,
} = ordersSlice.actions;

const ordersReducer = ordersSlice.reducer;
export default ordersReducer;
