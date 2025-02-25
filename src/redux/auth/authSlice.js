import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  loading: false,
  registerError: null,
  loginError: null,
  registerSuccessMessage: null, 
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest: (state, action) => {
      state.loading = true;
      state.loginError = null;
      console.log("Login Request Payload:", action.payload);
    },
    loginSuccess: (state, action) => {
      console.log("Login Success Payload:", action.payload);
      state.token = action.payload.token;
      state.loading = false;
      state.loginError = null;
    },
    loginFailure: (state, action) => {
      state.loginError = action.payload;
      state.loading = false;
    },
    logout: (state) => {
      state.token = null;
      state.loginError = null;
      state.loading = false;
    },

    // Register Reducers
    registerRequest: (state, action) => {
      state.loading = true;
      state.registerError = null;
      state.registerSuccessMessage = null; // Clear previous success message
    },
    registerSuccess: (state, action) => {
      console.log("Register Success Message:", action.payload);
      state.registerSuccessMessage = action.payload;
      state.loading = false;
      state.registerError = null;
    },
    registerFailure: (state, action) => {
      console.error("Register Error from slice:", action.payload);
      state.registerError = action.payload; // Handle error
      state.loading = false;
    },
  },
});

export const { 
  loginRequest, loginSuccess, loginFailure, logout, 
  registerRequest, registerSuccess, registerFailure 
} = authSlice.actions;

export default authSlice.reducer;