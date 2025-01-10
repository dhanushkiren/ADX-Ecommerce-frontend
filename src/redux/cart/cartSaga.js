import { takeEvery, call, put } from "redux-saga/effects";
import axios from "../../utils/axios";
import {
     addToCartRequest,
     addToCartSuccess, 
     addToCartFailure, 
     viewCartRequest, 
     viewCartSuccess, 
     viewCartFailure, 
     deleteCartItemRequest, 
     deleteCartItemSuccess, 
     deleteCartItemFailure, 
     clearCartRequest, 
     clearCartSuccess, 
     clearCartFailure 
    } from "./cartSlice";
import { apiConfig } from "../../utils/apiConfig";

// Worker Saga for adding item to cart
function* addToCartSaga(action) {
  const { userId, productData } = action.payload;
  try {
    const response = yield axios.post(apiConfig.addToCart(userId), productData);
    if (response.status === 200) {
      yield put(addToCartSuccess(response.data));
    } else {
      yield put(addToCartFailure("Failed to add item to cart"));
    }
  } catch (error) {
    yield put(addToCartFailure(error?.response?.data?.message || "Failed to add item to cart"));
  }
}

// Worker Saga for viewing cart
function* viewCartSaga(action) {
  const { userId } = action.payload;
  try {
    const response = yield axios.get(apiConfig.viewCart(userId));
    if (response.status === 200) {
      yield put(viewCartSuccess(response.data));
    } else {
      yield put(viewCartFailure("Failed to retrieve cart items"));
    }
  } catch (error) {
    yield put(viewCartFailure(error?.response?.data?.message || "Failed to retrieve cart items"));
  }
}

// Worker Saga for deleting item from cart
function* deleteCartItemSaga(action) {
  const { userId, itemId } = action.payload;
  try {
    const response = yield axios.delete(apiConfig.deleteCartItem(userId, itemId));
    if (response.status === 200) {
      yield put(deleteCartItemSuccess(itemId));
    } else {
      yield put(deleteCartItemFailure("Failed to delete item from cart"));
    }
  } catch (error) {
    yield put(deleteCartItemFailure(error?.response?.data?.message || "Failed to delete item from cart"));
  }
}

// Worker Saga for clearing cart
function* clearCartSaga(action) {
  const { userId } = action.payload;
  try {
    const response = yield axios.delete(apiConfig.clearCart);
    if (response.status === 200) {
      yield put(clearCartSuccess());
    } else {
      yield put(clearCartFailure("Failed to clear the cart"));
    }
  } catch (error) {
    yield put(clearCartFailure(error?.response?.data?.message || "Failed to clear the cart"));
  }
}

// Watcher Sagas
export function* watchCartSaga() {
  yield takeEvery(addToCartRequest.type, addToCartSaga);
  yield takeEvery(viewCartRequest.type, viewCartSaga);
  yield takeEvery(deleteCartItemRequest.type, deleteCartItemSaga);
  yield takeEvery(clearCartRequest.type, clearCartSaga);
}
