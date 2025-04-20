import authReducer from "./auth/authSlice";
import homeReducer from "./home/homeSlice";
import cartReducer from "./cart/cartSlice";
import editProfileReducer from "./editprofile/slice";
import productFetchReducer from "./productfetch/productFetchSlice";
import ordersReducer from "./orders/ordersSlice";

const rootReducer = {
  auth: authReducer,
  home: homeReducer,
  cart: cartReducer,
  editProfile: editProfileReducer,
  productFetch: productFetchReducer,
  orders: ordersReducer,
};

export default rootReducer;
