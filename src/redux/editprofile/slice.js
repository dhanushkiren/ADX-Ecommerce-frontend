import { createSlice } from "@reduxjs/toolkit";
import { isEqual } from "lodash";

const initialState = {
  userId: "19",
  username: "",
  firstName: "",
  lastName: "",
  email: "",
  addresses: [],
  mobile: "",
  role: "",
  date_of_birth: "",
  image: null,
  country: "",
  loading: false,
  error: null,
  originalProfile: null,
  isProfileModified: false,
};

const editProfileSlice = createSlice({
  name: "editProfile",
  initialState,
  reducers: {
    fetchProfileRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchProfileSuccess: (state, action) => {
      state.loading = false;
      const profileData = action.payload;
      state.originalProfile = { ...profileData };
      Object.assign(state, profileData);
      state.isProfileModified = false;
    },
    fetchProfileFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || "Failed to fetch profile.";
    },
    updateProfileRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateProfileSuccess: (state, action) => {
      state.loading = false;
      const updatedData = action.payload;
      state.originalProfile = { ...updatedData };
      Object.assign(state, updatedData);
      state.isProfileModified = false;
    },
    updateProfileFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || "Failed to update profile.";
    },
    checkProfileChanges: (state) => {
      const currentProfile = {
        username: state.username,
        firstName: state.firstName,
        lastName: state.lastName,
        email: state.email,
        addresses: state.addresses,
        mobile: state.mobile,
        role: state.role,
        date_of_birth: state.date_of_birth,
        image: state.image,
        country: state.country,
      };
      state.isProfileModified = !isEqual(currentProfile, state.originalProfile);
    },
    resetProfileModification: (state) => {
      if (state.originalProfile) {
        Object.assign(state, state.originalProfile);
      }
      state.isProfileModified = false;
    },
  },
});

export const {
  fetchProfileRequest,
  fetchProfileSuccess,
  fetchProfileFailure,
  updateProfileRequest,
  updateProfileSuccess,
  updateProfileFailure,
  checkProfileChanges,
  resetProfileModification,
} = editProfileSlice.actions;

export default editProfileSlice.reducer;