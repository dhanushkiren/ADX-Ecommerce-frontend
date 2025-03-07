
import { takeEvery, call, put } from "redux-saga/effects";
import axios from "../../utils/axios";
import { apiConfig } from "../../utils/apiConfig";
import { 
    productFetchRequest, 
    productFetchSuccess,  
    productFetchFailure   
} from "./productFetchSlice";

function* productFetchSaga(action) {
    const query = action.payload;
    console.log("Query:", encodeURIComponent(query));
    
    try {
        const response = yield call(axios.get, apiConfig.fetchProduct(query));
        // console.log("Products response:", response);

        if (response.status === 200) {
            console.log("Fetch Products Success");
            const products = response.data;
            yield put(productFetchSuccess(products));  
        } else {
            console.log("Response status not 200:", response.status);
            yield put(productFetchFailure("Failed to fetch products"));  
        }
    } catch (error) {
        // Handle errors during the request
        console.log("Error fetching products dkk:", error);
        yield put(productFetchFailure(error?.response?.data?.message || "Fetch products failed"));
    }
}

export function* watchProductFetch() {
    yield takeEvery(productFetchRequest.type, productFetchSaga);
}
