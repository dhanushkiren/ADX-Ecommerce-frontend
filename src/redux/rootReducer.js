// src/redux/rootReducer.js
import authReducer from "./auth/authSlice";
import homeReducer from "./home/homeSlice";  // Import homeReducer
import cartReducer from "./cart/cartSlice";
import searchReducer from "./search/searchSlice";

const rootReducer = {
  auth: authReducer,
  home: homeReducer,  // Add homeReducer to the root reducer
  cart: cartReducer,
  search: searchReducer,

};

export default rootReducer;
