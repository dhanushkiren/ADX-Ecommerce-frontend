import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  selectedCartItems: [], // Stores selected items for order
  loading: false,
  error: null,
  loadingItems: {}, // Tracks loading for individual items
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add to cart actions
    addToCartRequest: (state, action) => {
      const { id } = action.payload;
      state.loadingItems[id] = true;
    },
    addToCartSuccess: (state, action) => {
      const { id, quantity, productName, price, imageUrl } = action.payload;
      delete state.loadingItems[id];

      const existingItemIndex = state.cartItems.findIndex((item) => item.id === id);
      if (existingItemIndex !== -1) {
        state.cartItems[existingItemIndex].quantity = quantity;
        state.cartItems[existingItemIndex].productName = productName;
        state.cartItems[existingItemIndex].price = price;
        state.cartItems[existingItemIndex].imageUrl = imageUrl; // Ensure image is updated
      } else {
        state.cartItems.push({ id, quantity, productName, price, imageUrl });
      }

      state.error = null;
    },
    addToCartFailure: (state, action) => {
      const { id } = action.payload;
      delete state.loadingItems[id];
      state.error = action.payload.error || "Failed to add item to cart";
    },

    // View cart actions
    viewCartRequest: (state) => {
      state.loading = true;
    },
    viewCartSuccess: (state, action) => {
      state.cartItems = action.payload.map((item) => ({
        id: item.id,
        quantity: item.quantity,
        productName: item.productName,
        price: item.price,
        imageUrl: item.imageUrl, // Ensure image is included when viewing cart
      }));
      state.loading = false;
      state.error = null;
    },
    viewCartFailure: (state, action) => {
      state.error = action.payload || "Failed to retrieve cart items";
      state.loading = false;
    },

    // Delete item from cart actions
    deleteCartItemRequest: (state) => {
      state.loading = true;
    },
    deleteCartItemSuccess: (state, action) => {
      state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
      state.loading = false;
      state.error = null;
    },
    deleteCartItemFailure: (state, action) => {
      state.error = action.payload || "Failed to delete item from cart";
      state.loading = false;
    },

    // Clear cart actions
    clearCartRequest: (state) => {
      state.loading = true;
    },
    clearCartSuccess: (state) => {
      state.cartItems = [];
      state.selectedCartItems = [];
      state.loading = false;
      state.error = null;
    },
    clearCartFailure: (state, action) => {
      state.error = action.payload || "Failed to clear the cart";
      state.loading = false;
    },

    // Update selected cart items
    setSelectedCartItems: (state, action) => {
      state.selectedCartItems = action.payload;
    },

    updateCartItemRequest: (state, action) => {
      const { id } = action.payload;
      state.loadingItems[id] = true;
    },
    updateCartItemSuccess: (state, action) => {
      const { id, quantity, productName, price, imageUrl } = action.payload;
      delete state.loadingItems[id];

      const existingItemIndex = state.cartItems.findIndex((item) => item.id === id);
      if (existingItemIndex !== -1) {
        state.cartItems[existingItemIndex] = { id, quantity, productName, price, imageUrl };
      }

      state.error = null;
    },
    updateCartItemFailure: (state, action) => {
      const { id } = action.payload;
      delete state.loadingItems[id];
      state.error = action.payload.error || "Failed to update cart item";
    },

    // Confirm Order actions
    confirmOrderRequest: (state) => {
      state.loading = true;
    },
    confirmOrderSuccess: (state) => {
      state.selectedCartItems = []; // Clear selected items after order
      state.loading = false;
      state.error = null;
    },
    confirmOrderFailure: (state, action) => {
      state.error = action.payload || "Failed to confirm order";
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
  setSelectedCartItems,
  confirmOrderRequest,
  confirmOrderSuccess,
  confirmOrderFailure,
  updateCartItemRequest,
  updateCartItemSuccess,
  updateCartItemFailure,
} = cartSlice.actions;

export default cartSlice.reducer;