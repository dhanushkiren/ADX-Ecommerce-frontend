import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  loading: false,
  error: null,
};

const productFetchSlice = createSlice({
  name: "productFetch",
  initialState,
  reducers: {
    productFetchRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    productFetchSuccess: (state, action) => {
      console.log("Products fetched:", action.payload);
      state.products = action.payload;
      state.loading = false;
    },
    productFetchFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});


export const { productFetchRequest, productFetchSuccess, productFetchFailure } = productFetchSlice.actions;
const productFetchReducer = productFetchSlice.reducer;
export default productFetchReducer;