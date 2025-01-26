// src/redux/rootReducer.js
import authReducer from "./auth/authSlice";
import homeReducer from "./home/homeSlice"; 
import cartReducer from "./cart/cartSlice";
import editProfileReducer from "./editprofile/slice"


const rootReducer = {
  auth: authReducer,
  home: homeReducer,  // Add homeReducer to the root reducer
  cart: cartReducer,
  editProfile: editProfileReducer,

};

export default rootReducer;
