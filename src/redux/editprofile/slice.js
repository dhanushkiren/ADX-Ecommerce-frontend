import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  addresses: [],  
  mobileNumber: "",
  dateOfBirth: null, 
  selectedImage: "",
  country: "",
  loading: false,
  error: null,
};

const editProfileSlice = createSlice({
  name: "editProfile",
  initialState,
  reducers: {
    updateProfileRequest: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    updateProfileSuccess: (state, action) => {
      state.loading = false;
      const updatedData = action.payload;
      state.firstName = updatedData.firstName;
      state.lastName = updatedData.lastName;
      state.email = updatedData.email;
      state.addresses = updatedData.addresses; 
      state.mobileNumber = updatedData.mobile;
      state.dateOfBirth = updatedData.date_of_birth; 
      state.selectedImage = updatedData.image;
      state.country = updatedData.country;
      state.error = null;
    },
    updateProfileFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { updateProfileRequest, updateProfileSuccess, updateProfileFailure } = editProfileSlice.actions;

export default editProfileSlice.reducer;
