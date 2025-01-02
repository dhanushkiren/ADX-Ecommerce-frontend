import {createSlice} from '@reduxjs/toolkit';
import {PUBLIC} from '../../utils/role';

const initialState = {
  userName: null,
  email: null,
  role: PUBLIC,

  toiletId: 'T124',

};

export const languageSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      // console.log('setting auth data to', action.payload);
      state.role = action.payload.role;
    },
    setAuthAction: state => {},
    initialAuthSetUpAction: state => {},
  },
});

export const selectUserRole = state => state.auth.role;
export const selectToiletId = state => state.auth.toiletId;
export const selectAuthData = state => state.auth;

export const {setAuth, setAuthAction, initialAuthSetUpAction} =
  languageSlice.actions;
const authReducer = languageSlice.reducer;
export default authReducer;