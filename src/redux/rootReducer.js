import authReducer from "./auth/authSlice";
import cartReducer from "./cart/cartSlice";

const rootReducer = {
  auth: authReducer,
  cart: cartReducer,
  
};

export default rootReducer;
