// src/redux/rootSaga.js
import { all, fork } from "redux-saga/effects";
import { watchAuthSaga } from "./auth/authSaga";
import { watchHomeSaga } from `"./home/homeSaga"`;  // Import watchHomeSaga

export default function* rootSaga() {
  yield all([
    fork(watchAuthSaga),  // Fork the auth saga
    fork(watchHomeSaga),  // Fork the home saga
  ]);
}
