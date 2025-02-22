import authReducer from "./auth/authSlice";
import homeReducer from "./home/homeSlice"; 
import cartReducer from "./cart/cartSlice";
import editProfileReducer from "./editprofile/slice";
import productFetchReducer from "./productfetch/productFetchSlice";
// import confirmOrderReducer from "./ConfirmOrder/ConfirmOrderSlice"; // Import confirmOrder slice

const rootReducer = {
  auth: authReducer,
  home: homeReducer,
  cart: cartReducer,
  editProfile: editProfileReducer,
  productFetch: productFetchReducer,
  // confirmOrder: confirmOrderReducer, 
};

export default rootReducer;
