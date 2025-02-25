import { takeEvery, call, put } from "redux-saga/effects";
import axios from "../../utils/axios";
import {
  loginRequest,
  loginSuccess,
  loginFailure,
  logout,
  registerRequest,
  registerSuccess,
  registerFailure,
} from "./authSlice";
import {
  clearAsyncStorage,
  storeData,
  handleTokenReceived,
} from "../../utils/asyncStorage";
import { apiConfig } from "../../utils/apiConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Worker Saga for login
function* loginSaga(action) {
  const userData = action.payload;
  console.log("Login Request Data:", userData);
  try {
    yield call(AsyncStorage.removeItem, "token"); // Clear old token
    yield call(AsyncStorage.removeItem, "password"); // Clear old password
    console.log("Old token cleared before login request");

    const response = yield call(axios.post, apiConfig.postLogin, userData, {
      headers: { "Content-Type": "application/json" },
    });

    console.log("Login Response:", response);

    if (response.status === 200 && response.data) {
      const token = response.data.token || response.data;
      const userPassword = userData.password; // Save user-entered password
      console.log("Received Token:", token);
      
      yield call(handleTokenReceived, token);
      yield call(storeData, "token", token);
      yield call(storeData, "password", userPassword); // Store the password safely
      yield put(loginSuccess({ token }));
    } else {
      throw new Error("Invalid login credentials");
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Invalid username or password";
    console.log("Login Error:", errorMessage);
    yield put(loginFailure(errorMessage));
  }
}

// Worker Saga for register
function* registerSaga(action) {
  const newUserData = action.payload;
  console.log("Register Request Data:", newUserData);

  try {
    console.log("Sending request to:", apiConfig.postRegister);
    const response = yield call(axios.post, apiConfig.postRegister, newUserData, {
      headers: { "Content-Type": "application/json" },
    });
    console.log("API response:", response);

    if (response.status === 201) {
      console.log("User Registered Successfully");
      yield put(registerSuccess("User Registered Successfully"));
    } else {
      throw new Error("Registration failed");
    }
  } catch (error) {
    const errorMessage = error.response?.data?.message || "Registration failed";
    console.error("Registration Error:", errorMessage);
    yield put(registerFailure(errorMessage));
  }
}

// Worker Saga for logout
function* logoutSaga() {
  console.log("Logout saga triggered");
  yield call(clearAsyncStorage);
  yield put(logout());
}

// Watcher Sagas
export function* watchAuthSaga() {
  yield takeEvery(loginRequest.type, loginSaga);
  yield takeEvery(registerRequest.type, registerSaga);
  yield takeEvery(logout.type, logoutSaga);
}
