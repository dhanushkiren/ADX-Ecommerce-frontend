import { all, fork } from "redux-saga/effects";
import { watchAuthSaga } from "./auth/authSaga";
import { watchHomeSaga } from "./home/homeSaga";
import { watchCartSaga } from "./cart/cartSaga";
import { watchUpdateProfile, watchFetchProfile } from "./editprofile/saga";
import { watchProductFetch } from "./productfetch/productFetchSaga";
import { watchOrdersSaga } from "./orders/ordersSaga";

export default function* rootSaga() {
  yield all([
    fork(watchAuthSaga),
    fork(watchHomeSaga),
    fork(watchCartSaga),
    fork(watchUpdateProfile),
    fork(watchFetchProfile),
    fork(watchProductFetch),
    fork(watchOrdersSaga),
  ]);
}
