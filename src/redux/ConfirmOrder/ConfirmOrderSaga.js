import { takeLatest, call, put } from "redux-saga/effects";
import axios from "../../utils/axios"; 
import { apiConfig } from "../../utils/apiConfig"; 
import {
  placeOrderRequest,
  placeOrderSuccess,
  placeOrderFailure,
} from "./ConfirmOrderSlice";

function* placeOrderSaga(action) {
  try {
    const response = yield call(axios.post, apiConfig.placeOrder, action.payload);
    yield put(placeOrderSuccess(response.data));
  } catch (error) {
    yield put(placeOrderFailure(error?.response?.data?.message || "Order placement failed"));
  }
}

export function* watchConfirmOrderSaga() {
  yield takeLatest(placeOrderRequest.type, placeOrderSaga);
}
