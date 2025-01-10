const initialState = {
  token: null,
  userId: null,  // Add userId to the state
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginRequest: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      console.log("slice ::: ", action.payload);
      state.token = action.payload.token;
      state.userId = action.payload.userId;  // Store the userId when login is successful
      state.loading = false;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    logout: (state) => {
      state.token = null;
      state.userId = null;  // Clear userId on logout
      state.error = null;
    },
  },
});

export const { loginRequest, loginSuccess, loginFailure, logout } = authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;
