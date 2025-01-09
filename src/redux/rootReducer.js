// src/redux/rootReducer.js
import authReducer from "./auth/authSlice";
import homeReducer from `"./home/homeSlice"`;  // Import homeReducer

const rootReducer = {
  auth: authReducer,
  home: homeReducer,  // Add homeReducer to the root reducer
};

export default rootReducer;
