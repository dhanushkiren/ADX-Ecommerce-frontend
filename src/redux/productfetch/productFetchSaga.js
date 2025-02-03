import { takeEvery, call, put } from "redux-saga/effects";
import axios from "../../utils/axios";
import { apiConfig } from "../../utils/apiConfig";
import { productFetchRequest } from "./productFetchSlice";


function* productFetchSaga(action){
    const query = action.payload;
    console.log("Queryaaaa:", query);
    try{
        const response = yield call(axios.get, apiConfig.fetchProduct(query));
        console.log("Products response:", response);

        if(response.status === 200){
            console.log("Fetch Products Success");
            const products = response.data;
            yield put(fetchProductsSuccess(products));
        } else {
            console.log("Response status not 200:", response.status);
            yield put(fetchProductsFailure("Failed to fetch products"));
        }
    }catch (error) {
        // Handle errors during the request
        console.log("Error fetching products:", error);
        yield put(fetchProductsFailure(error?.response?.data?.message || "Fetch products failed"));
      }
}


export function* watchProductFetch(){
    yield takeEvery(productFetchRequest.type, productFetchSaga);
}