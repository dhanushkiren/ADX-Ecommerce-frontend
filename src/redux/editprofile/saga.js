import { call, put, takeLatest } from "redux-saga/effects";
import axios from "../../utils/axios";
import {
  fetchProfileRequest,
  fetchProfileSuccess,
  fetchProfileFailure,
  updateProfileRequest,
  updateProfileSuccess,
  updateProfileFailure,
} from "./slice";
import { apiConfig } from "../../utils/apiConfig";

// Error handler
function handleError(error) {
  return (
    error.response?.data?.message || // API-specific error message
    error.message || // Axios or native error message
    "Something went wrong" // Fallback error
  );
}

// Fetch Profile Saga
function* fetchProfileSaga(action) {
  console.log("Fetch Profile Saga Triggered: ", new Date().toISOString());
  console.log("Fetch Profile Action Received:", action);

  try {
    const userId = action.payload?.userId || action.payload; // Extract userId
    if (!userId) {
      console.error("Fetch Profile Error: User ID is missing in action payload:", action.payload);
      throw new Error("User ID is missing");
    }

    console.log(`Attempting to fetch profile for User ID: ${userId}`);
    const apiEndpoint = apiConfig.getProfile(userId);
    console.log("API Endpoint:", apiEndpoint);

     // API CALL FOR GET
     
    const response = yield call(() => axios.get(apiEndpoint));
    

    if (response?.status === 200) {
      console.log("Profile fetch successful. Response:", {
        ...response.data,
        image: response.data.image ? `${response.data.image.slice(0, 50)}... [truncated]` : null
      });
      
      yield put(fetchProfileSuccess(response.data)); // Dispatch success action
    } else {
      console.error("Fetch Profile API returned non-200 status:", response?.status);
      yield put(fetchProfileFailure({ message: "Failed to fetch profile" }));
    }
  } catch (error) {
    const errorMessage = handleError(error);
    console.error("Fetch Profile Error:", errorMessage, "Action:", action);
    yield put(fetchProfileFailure({ message: errorMessage })); // Dispatch failure action with detailed error
  }
}

// Update Profile Saga
function* updateProfileSaga(action) {
  console.log("Update Profile Saga Triggered: ", new Date().toISOString());
  console.log("Update Profile Action Received:", action);

  try {
    const { id, profileData } = action.payload;

    console.log("Extracted Payload -> ID:", id, "Profile Data:", profileData);

    if (!id || !profileData) {
      console.error("Update Profile Error: Invalid action payload: Missing id or profileData");
      throw new Error("Invalid action payload: Missing id or profileData");
    }

    const apiEndpoint = apiConfig.editprofile(id);
    console.log("API Endpoint for Update:", apiEndpoint);

    console.log("Making API Call to Update Profile...");

    //API CALL FOR PUT

    const response = yield call(() =>
      axios.put(apiEndpoint, profileData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
    );

    

    if (response?.status === 200) {
      console.log("Profile update successful. Response:", {
        ...response.data,
        image: response.data.image ? `${response.data.image.slice(0, 50)}... [truncated]` : null
      });
      
      yield put(updateProfileSuccess(response.data)); // Dispatch success action
      yield put(fetchProfileSuccess(response.data)); // Refresh the original profile
    } else {
      console.error("Update Profile API returned non-200 status:", response?.status);
      yield put(updateProfileFailure({ message: "Failed to update profile" }));
    }
  } catch (error) {
    const errorMessage = handleError(error);
    console.error("Update Profile Error:", errorMessage, "Action:", action);
    console.error("Error Details:", error); // Log the full error for debugging
    yield put(updateProfileFailure({ message: errorMessage })); // Dispatch failure action with detailed error
  }
}

// Watchers
export function* watchFetchProfile() {
  console.log("Watcher: Fetch Profile Saga is ready.");
  yield takeLatest(fetchProfileRequest.type, fetchProfileSaga);
}

export function* watchUpdateProfile() {
  console.log("Watcher: Update Profile Saga is ready.");
  
  yield takeLatest(updateProfileRequest.type, updateProfileSaga);
}
