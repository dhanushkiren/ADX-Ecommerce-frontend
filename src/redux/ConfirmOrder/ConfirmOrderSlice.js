import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedProducts: [],
  totalQuantity: 0,
  subtotal: 0,
  loading: false,
  error: null,
};

const confirmOrderSlice = createSlice({
  name: "confirmOrder",
  initialState,
  reducers: {
    setSelectedProducts: (state, action) => {
      state.selectedProducts = action.payload;
      state.totalQuantity = action.payload.reduce((acc, item) => acc + item.quantity, 0);
      state.subtotal = action.payload.reduce((acc, item) => acc + item.quantity * item.price, 0);
    },
    updateQuantity: (state, action) => {
      const { id, type } = action.payload;
      state.selectedProducts = state.selectedProducts.map((product) =>
        product.id === id
          ? {
              ...product,
              quantity: type === "increase" ? product.quantity + 1 : Math.max(product.quantity - 1, 1),
            }
          : product
      );
      state.totalQuantity = state.selectedProducts.reduce((acc, item) => acc + item.quantity, 0);
      state.subtotal = state.selectedProducts.reduce((acc, item) => acc + item.quantity * item.price, 0);
    },
    deleteProduct: (state, action) => {
      state.selectedProducts = state.selectedProducts.filter((product) => product.id !== action.payload);
      state.totalQuantity = state.selectedProducts.reduce((acc, item) => acc + item.quantity, 0);
      state.subtotal = state.selectedProducts.reduce((acc, item) => acc + item.quantity * item.price, 0);
    },
    placeOrderRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    placeOrderSuccess: (state) => {
      state.loading = false;
      state.selectedProducts = [];
      state.totalQuantity = 0;
      state.subtotal = 0;
    },
    placeOrderFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  setSelectedProducts,
  updateQuantity,
  deleteProduct,
  placeOrderRequest,
  placeOrderSuccess,
  placeOrderFailure,
} = confirmOrderSlice.actions;

export default confirmOrderSlice.reducer;
