import { takeEvery, call, put } from "redux-saga/effects";
import axios from "../../utils/axios";
import { fetchProductsRequest, fetchProductsSuccess, fetchProductsFailure } from "./homeSlice";
import { apiConfig } from "../../utils/apiConfig";

// Worker Saga for fetching products
function* fetchProductsSaga(action) {
  try {
    // Make API request
    const response = yield call(axios.get, apiConfig.getProducts);
     console.log("Products response:", response);

    // Check the response status
    if (response.status === 200) {
      console.log("Fetch Products Success");
      const products = response.data;
      console.log(products);
      // Dispatch fetchProductsSuccess with the products data
      yield put(fetchProductsSuccess(products));
    } else {
      // If the status is not 200, trigger failure
      console.log("Response status not 200:", response.status);
      yield put(fetchProductsFailure("Failed to fetch products"));
    }
  } catch (error) {
    // Handle errors during the request
    console.log("Error fetching products:", error);
    yield put(fetchProductsFailure(error?.response?.data?.message || "Fetch products failed"));
  }
}

// Watcher Saga
export function* watchHomeSaga() {
  // Watch for fetchProductsRequest action and trigger fetchProductsSaga
  yield takeEvery(fetchProductsRequest.type, fetchProductsSaga);
}
