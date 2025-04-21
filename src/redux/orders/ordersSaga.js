// redux/sagas/ordersSaga.js
import { call, put, takeLatest, all, takeEvery } from "redux-saga/effects";
import axios from "../../utils/axios";
import {
  fetchOrdersRequest,
  fetchOrdersSuccess,
  fetchOrdersFailure,
  placeOrderRequest,
  placeOrderSuccess,
  placeOrderFailure,
  cancelOrderRequest,
  cancelOrderSuccess,
  cancelOrderFailure,
  getOrderDetailsRequest,
  getOrderDetailsSuccess,
  getOrderDetailsFailure,
} from "./ordersSlice";
import { apiConfig } from "../../utils/apiConfig";


// Fetch All Orders
function* fetchOrdersSaga() {
  try {
    const res = yield call(axios.get, apiConfig.fetchOrders("1"));
    console.log("Response from API:", res.data);
    yield put(fetchOrdersSuccess(res.data));
  } catch (error) {
    yield put(fetchOrdersFailure("dkdk--",error.message));
  }
}

// Place New Order
function* placeOrderSaga(action) {
  try {
    const res = yield call(axios.post, `${API}/create`, action.payload);
    yield put(placeOrderSuccess(res.data));
  } catch (error) {
    yield put(placeOrderFailure(error.message));
  }
}

// Cancel Order
function* cancelOrderSaga(action) {
  try {
    yield call(axios.delete, `${API}/cancel/${action.payload}`);
    yield put(cancelOrderSuccess(action.payload));
  } catch (error) {
    yield put(cancelOrderFailure(error.message));
  }
}

// Get Order Details
function* getOrderDetailsSaga(action) {
  try {
    const res = yield call(axios.get, `${API}/${action.payload}`);
    yield put(getOrderDetailsSuccess(res.data));
  } catch (error) {
    yield put(getOrderDetailsFailure(error.message));
  }
}

export function* watchOrdersSaga() {
  yield takeEvery(fetchOrdersRequest.type, fetchOrdersSaga);
  yield takeEvery(placeOrderRequest.type, placeOrderSaga);
  yield takeEvery(cancelOrderRequest.type, cancelOrderSaga);
  yield takeEvery(getOrderDetailsRequest.type, getOrderDetailsSaga);
}
