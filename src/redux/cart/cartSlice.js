import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add to cart actions
    addToCartRequest: (state) => {
      state.loading = true;
    },
    addToCartSuccess: (state, action) => {
      state.cartItems.push(action.payload);
      state.loading = false;
      state.error = null;
    },
    addToCartFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    // View cart actions
    viewCartRequest: (state) => {
      state.loading = true;
    },
    viewCartSuccess: (state, action) => {
      state.cartItems = action.payload;
      state.loading = false;
      state.error = null;
    },
    viewCartFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    // Delete item from cart actions
    deleteCartItemRequest: (state) => {
      state.loading = true;
    },
    deleteCartItemSuccess: (state, action) => {
      state.cartItems = state.cartItems.filter(item => item.id !== action.payload);
      state.loading = false;
      state.error = null;
    },
    deleteCartItemFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    // Clear cart actions
    clearCartRequest: (state) => {
      state.loading = true;
    },
    clearCartSuccess: (state) => {
      state.cartItems = [];
      state.loading = false;
      state.error = null;
    },
    clearCartFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  addToCartRequest,
  addToCartSuccess,
  addToCartFailure,
  viewCartRequest,
  viewCartSuccess,
  viewCartFailure,
  deleteCartItemRequest,
  deleteCartItemSuccess,
  deleteCartItemFailure,
  clearCartRequest,
  clearCartSuccess,
  clearCartFailure,
} = cartSlice.actions;

const cartReducer = cartSlice.reducer;
export default cartReducer;
