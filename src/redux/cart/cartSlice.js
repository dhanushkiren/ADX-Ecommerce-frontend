import { createSlice } from "@reduxjs/toolkit"; 

const initialState = {
  cartItems: [],
  loading: false,
  error: null,
  loadingItems: {}, // To track loading for individual items
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add to cart actions
    addToCartRequest: (state, action) => {
      const { id } = action.payload; // Include the product ID
      state.loadingItems[id] = true; // Mark this item as loading
    },
    addToCartSuccess: (state, action) => {
      const { id, quantity, productName, price } = action.payload;
      delete state.loadingItems[id]; // Remove loading state for this item

      const existingItemIndex = state.cartItems.findIndex((item) => item.id === id);
      if (existingItemIndex !== -1) {
        state.cartItems[existingItemIndex].quantity = quantity;
        state.cartItems[existingItemIndex].productName = productName;
        state.cartItems[existingItemIndex].price = price;
      } else {
        state.cartItems.push({ id, quantity, productName, price });
      }

      state.error = null;
    },
    addToCartFailure: (state, action) => {
      const { id } = action.payload; // Include the product ID
      delete state.loadingItems[id]; // Remove loading state for this item
      state.error = action.payload.error || "Failed to add item to cart";
    },

    // Other reducers remain unchanged...
  

    // View cart actions
    viewCartRequest: (state) => {
      state.loading = true;
    },
    viewCartSuccess: (state, action) => {
      // Replace cart items with the payload
      state.cartItems = action.payload || [];
      state.loading = false;
      state.error = null;
    },
    viewCartFailure: (state, action) => {
      state.error = action.payload || "Failed to retrieve cart items"; // Fallback error message
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
      state.error = action.payload || "Failed to delete item from cart"; // Fallback error message
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
      state.error = action.payload || "Failed to clear the cart"; // Fallback error message
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