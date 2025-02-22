import { takeEvery, call, put, select } from "redux-saga/effects"; 
import axios from "../../utils/axios";
import { apiConfig } from "../../utils/apiConfig";
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
  clearCartFailure,
  setSelectedCartItems, // Import the new action
} from "./cartSlice";

// Selector to get selectedCartItems from the state
const getSelectedCartItems = (state) => state.cart.selectedCartItems;

// Worker Saga for adding an item to the cart
function* addToCartSaga(action) {
  const { userId, productData } = action.payload;
  console.log(action.payload);
  try {
    const response = yield call(axios.post, apiConfig.addToCart(userId), productData);
    yield put(
      addToCartSuccess({
        id: response.data.id,
        quantity: response.data.quantity,
        productName: response.data.productName,
        price: response.data.price,
      })
    );
    // Refresh cart items after adding
    yield put(viewCartRequest({ userId }));
  } catch (error) {
    console.error(error);
    yield put(addToCartFailure(error?.response?.data?.message || "Failed to add item to cart"));
  }
}

// Worker Saga for viewing cart
function* viewCartSaga(action) {
  const { userId } = action.payload;
  try {
    const response = yield call(axios.get, apiConfig.viewCart(userId));
    console.log("API response", response);
    yield put(viewCartSuccess(response.data));
  } catch (error) {
    console.error(error);
    yield put(viewCartFailure(error?.response?.data?.message || "Failed to retrieve cart items"));
  }
}

// Worker Saga for deleting an item from the cart
function* deleteCartItemSaga(action) {
  const { itemId } = action.payload;
  try {
    yield call(axios.delete, apiConfig.deleteCartItem(itemId));
    yield put(deleteCartItemSuccess(itemId));
  } catch (error) {
    console.error(error);
    yield put(deleteCartItemFailure(error?.response?.data?.message || "Failed to delete item from cart"));
  }
}

// Worker Saga for clearing the cart
function* clearCartSaga(action) {
  const { userId } = action.payload;
  try {
    yield call(axios.delete, apiConfig.clearCart(userId));
    yield put(clearCartSuccess());
  } catch (error) {
    console.error(error);
    yield put(clearCartFailure(error?.response?.data?.message || "Failed to clear the cart"));
  }
}

// Worker Saga for Confirm Order to process only selected items
function* confirmOrderSaga(action) {
  try {
    const selectedCartItems = yield select(getSelectedCartItems);
    
    if (selectedCartItems.length === 0) {
      throw new Error("No items selected for order.");
    }

    // Process the selected items (e.g., sending them to an order API)
    console.log("Processing selected order items:", selectedCartItems);
    
    
    yield put(setSelectedCartItems([]));

  } catch (error) {
    console.error(error);
  }
}

// Watcher Sagas
export function* watchCartSaga() {
  yield takeEvery(addToCartRequest.type, addToCartSaga);
  yield takeEvery(viewCartRequest.type, viewCartSaga);
  yield takeEvery(deleteCartItemRequest.type, deleteCartItemSaga);
  yield takeEvery(clearCartRequest.type, clearCartSaga);
  yield takeEvery("cart/confirmOrderRequest", confirmOrderSaga);
}
