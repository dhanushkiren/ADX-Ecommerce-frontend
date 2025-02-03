// src/redux/rootReducer.js
import authReducer from "./auth/authSlice";
import homeReducer from "./home/homeSlice";  // Import homeReducer
import cartReducer from "./cart/cartSlice";
import productFetchReducer from "./productfetch/productFetchSlice";


const rootReducer = {
  auth: authReducer,
  home: homeReducer,
  cart: cartReducer,
  productFetch: productFetchReducer,
};

export default rootReducer;
