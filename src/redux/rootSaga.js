// src/redux/rootSaga.js
import { all, fork } from "redux-saga/effects";
import { watchAuthSaga } from "./auth/authSaga";
import { watchHomeSaga } from "./home/homeSaga";  // Import watchHomeSaga
import { watchCartSaga } from "./cart/cartSaga";
import { watchUpdateProfile } from "./editprofile/saga";
import { watchFetchProfile } from "./editprofile/saga";
import { watchProductFetch } from "./productfetch/productFetchSaga";

export default function* rootSaga() {
  yield all([
    fork(watchAuthSaga),  // Fork the auth saga
    fork(watchHomeSaga),  // Fork the home saga
    fork(watchCartSaga),
    fork(watchUpdateProfile),
    fork(watchFetchProfile),
    fork(watchProductFetch),
  ]);
}

