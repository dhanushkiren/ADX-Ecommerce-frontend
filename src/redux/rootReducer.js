// src/redux/rootReducer.js
import authReducer from "./auth/authSlice";
import homeReducer from "./home/homeSlice"; 
import cartReducer from "./cart/cartSlice";


const rootReducer = {
  auth: authReducer,
  home: homeReducer,  // Add homeReducer to the root reducer
  cart: cartReducer,

};

export default rootReducer;


