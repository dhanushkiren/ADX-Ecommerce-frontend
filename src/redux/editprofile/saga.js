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
    error.response?.data?.message ||
    error.message ||
    "Something went wrong"
  );
}

// Fetch Profile Saga
function* fetchProfileSaga(action) {
  try {
    const userId = action.payload?.userId || action.payload;
    if (!userId) {
      throw new Error("User ID is missing");
    }

    const apiEndpoint = apiConfig.getProfile(userId);
    const response = yield call(() => axios.get(apiEndpoint));

    if (response?.status === 200) {
      yield put(fetchProfileSuccess(response.data));
    } else {
      yield put(fetchProfileFailure({ message: "Failed to fetch profile" }));
    }
  } catch (error) {
    yield put(fetchProfileFailure({ message: handleError(error) }));
  }
}

// Update Profile Saga
function* updateProfileSaga(action) {
  try {
    const { id, profileData } = action.payload;
    if (!id || !profileData) {
      throw new Error("Invalid action payload: Missing id or profileData");
    }

    const apiEndpoint = apiConfig.editprofile(id);
    const response = yield call(() => axios.put(apiEndpoint, profileData));

    if (response?.status === 200) {
      yield put(updateProfileSuccess(response.data));
      yield put(fetchProfileSuccess(response.data)); // Refresh profile
    } else {
      yield put(updateProfileFailure({ message: "Failed to update profile" }));
    }
  } catch (error) {
    yield put(updateProfileFailure({ message: handleError(error) }));
  }
}

// Watchers
export function* watchFetchProfile() {
  yield takeLatest(fetchProfileRequest.type, fetchProfileSaga);
}

export function* watchUpdateProfile() {
  yield takeLatest(updateProfileRequest.type, updateProfileSaga);
}