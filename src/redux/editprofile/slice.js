import { createSlice } from "@reduxjs/toolkit"; 
import { isEqual } from "lodash";

const initialState = {
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
    
      state.date_of_birth = profileData.date_of_birth || ""; // Set date_of_birth
      state.addresses = Array.isArray(profileData.addresses)
        ? profileData.addresses
        : []; // Ensure addresses is always an array
    
      state.originalProfile = { ...profileData };
      Object.assign(state, profileData); // Merge profileData into state
      state.isProfileModified = false;
    
      // Shorten the image field value in the console log
      const truncatedProfileData = {
        ...profileData,
        image: profileData.image?.length > 50 
          ? `${profileData.image.slice(0, 50)}... [truncated]` 
          : profileData.image,
      };
    
      console.log("Fetched Profile Data:", truncatedProfileData); // Log truncated data
      console.log("Image Type:", typeof profileData.image);
      console.log("Image Length:", profileData.image?.length);
    },
    
    fetchProfileFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || "Failed to fetch profile.";
      console.error("Error in fetching profile data:", state.error); // Use correct logging
    },
    updateProfileRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateProfileSuccess: (state, action) => {
      state.loading = false;
      const updatedData = action.payload;
    
      state.date_of_birth = updatedData.date_of_birth || ""; // Set date_of_birth
      state.addresses = Array.isArray(updatedData.addresses)
        ? updatedData.addresses
        : []; // Ensure addresses is always an array
    
      state.originalProfile = { ...updatedData };
      Object.assign(state, updatedData); // Merge updatedData into state
      state.isProfileModified = false;
    
      // Handle image field, checking if it's base64 or other string type
      const truncatedImage = updatedData.image && updatedData.image.length > 50 
        ? `${updatedData.image.slice(0, 50)}...` 
        : updatedData.image;
    
      // Log updated profile data (with truncated image for readability)
      console.log("Updated Profile Data:", {
        ...updatedData,
        image: truncatedImage // Log truncated image to avoid long string output
      });
    
      // Check image type and handle base64 data if necessary
      if (updatedData.image && typeof updatedData.image === 'string' && updatedData.image.length > 50) {
        console.log("Updated Profile Image (Base64):", `${updatedData.image.slice(0, 50)}... [truncated]`);
      } else {
        console.log("Updated Profile Image:", updatedData.image);
      }
      
    },
    
    updateProfileFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || "Failed to update profile.";
      console.error("Error in updating profile data:", state.error); // Log error
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
    updateDateOfBirth: (state, action) => {
      state.date_of_birth = action.payload; // Expecting YYYY-MM-DD string
      state.isProfileModified = true; // Mark as modified
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
  updateDateOfBirth, // Export new action
} = editProfileSlice.actions;

export default editProfileSlice.reducer;
