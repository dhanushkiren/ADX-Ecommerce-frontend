// src/redux/rootReducer.js
import authReducer from "./auth/authSlice";
import homeReducer from "./home/homeSlice"; 
import cartReducer from "./cart/cartSlice";
import editProfileReducer from "./editprofile/slice"
import productFetchReducer from "./productfetch/productFetchSlice";



const rootReducer = {
  auth: authReducer,
  home: homeReducer,
  cart: cartReducer,
  editProfile: editProfileReducer,
  productFetch: productFetchReducer,

};

export default rootReducer;
