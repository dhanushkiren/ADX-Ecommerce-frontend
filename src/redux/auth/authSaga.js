import { takeEvery, call, put } from "redux-saga/effects";
import axios from "../../utils/axios";
import { 
  loginRequest, loginSuccess, loginFailure, logout, 
  registerRequest, registerSuccess, registerFailure 
} from "./authSlice";
import { clearAsyncStorage, storeData } from "../../utils/asyncStorage";
import { apiConfig } from "../../utils/apiConfig";

// Worker Saga for login
function* loginSaga(action) {
  const userData = action.payload;
  console.log("Login Request Data:", userData);

  try {
    // ✅ Clear old token before making login request
      yield call(AsyncStorage.removeItem, "token"); 
      console.log("✅ Old token cleared before login request");

     const response = yield call(axios.post, apiConfig.postLogin, userData, {
      headers: { "Content-Type": "application/json" }, 
    });

    console.log("Login Response:", response);

    const token = response.data.token || response.data; // Support both cases


    yield call(storeData, "token", token);

    yield put(loginSuccess({ token }));
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.response?.data || "Login failed";
    console.log("Login Error:", errorMessage);
    yield put(loginFailure(errorMessage)); // Dispatching the error message
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
    console.log('API response:', response); // Log the response

    if (response.status === 201) {
      console.log("User Registered Successfully");

      // Dispatch register success action
      yield put(registerSuccess("User Registered Successfully"));
    } else {
      console.log("Unexpected response status:", response.status);
      yield put(registerFailure("Registration failed"));
    }
  } catch (error) {
    console.error("Registration Error:", error); // Detailed logging
    if (error.response) {
      console.log(" Response Data:", error.response.data);
      console.log(" Status Code:", error.response.status);
      console.log(" Headers:", error.response.headers);
    } else if (error.request) {
      console.log(" No Response from Server. Possible Network Issue");
      console.log(" Request Data:", error.request);
    } else {
      console.log(" Error Message:", error.message);
    }

    const errorMessage =
      error.response?.data?.message || error.response?.data || "Registration failed";
      
    yield put(registerFailure(errorMessage));
  }
}

// Worker Saga for logout
function* logoutSaga() {
  yield call(clearAsyncStorage);
  yield put(logout());
}

// Watcher Sagas
export function* watchAuthSaga() {
  yield takeEvery(loginRequest.type, loginSaga);
  yield takeEvery(registerRequest.type, registerSaga);
  yield takeEvery(logout.type, logoutSaga);
}
