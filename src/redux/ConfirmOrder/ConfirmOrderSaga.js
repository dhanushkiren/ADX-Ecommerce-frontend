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
    const response = yield call(axios.post, apiConfig.placeOrder);
    if (response.status === 200) {
      console.log("Fetch Products Success");
      const orders = response.data;
      yield put(placeOrderSuccess(orders));
    } else {
      console.log("Response status not 200:", response.status);
      yield put(placeOrderFailure("Failed to place order"));
    }
  } catch (error) {
    yield put(placeOrderFailure(error?.response?.data?.message || "Order placement failed"));
  }
}

export function* watchConfirmOrderSaga() {
  yield takeLatest(placeOrderRequest.type, placeOrderSaga);
}
