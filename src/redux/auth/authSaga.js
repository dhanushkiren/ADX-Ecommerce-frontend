import { takeEvery, call, put } from "redux-saga/effects";
import axios from "../../utils/axios";
import { loginRequest, loginSuccess, loginFailure, logout } from "./authSlice";
import { clearAsyncStorage } from "../../utils/asyncStorage";
import { storeData } from "../../utils/asyncStorage";
import { apiConfig } from "../../utils/apiConfig";
import { use } from "react";

// Worker Saga for login
function* loginSaga(action) {
  const userData = action.payload;
  console.log("dkdk::", userData);
  try {
    // Make API request
    const response = yield axios.post(apiConfig.postLogin, userData);
    console.log("response::", response);

    // Check the response status
    if (response.status === 200) {
      console.log("Login Success");
      const token = response.data;
      // Store token in async storage
      console.log("token::", token);
      yield call(storeData, "token", token);

      // Dispatch login success action with token and user data
      yield put(loginSuccess({ token }));
    } else {
      // If the status is not 200, trigger failure
      console.log("Response status not 200: ", response.status);
      yield put(loginFailure("Login failed due to unexpected status code"));
    }
  } catch (error) {
    // In case of an error during the request
    console.log("Error during login:", error);
    yield put(loginFailure(error?.response?.data?.message || "Login failed"));
  }
}

// Worker Saga for logout
function* logoutSaga() {
  // Clear AsyncStorage
  yield call(clearAsyncStorage);

  // Dispatch logout action
  yield put(logout());
}

// Watcher Sagas
export function* watchAuthSaga() {
  // Watch for the loginRequest action and trigger loginSaga
  yield takeEvery(loginRequest.type, loginSaga);
  // Watch for the logout action and trigger logoutSaga
  yield takeEvery(logout.type, logoutSaga);
}
