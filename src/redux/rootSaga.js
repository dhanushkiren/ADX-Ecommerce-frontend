import { all, fork } from "redux-saga/effects";
import { watchAuthSaga } from "./auth/authSaga";
import { watchHomeSaga } from "./home/homeSaga";

export default function* rootSaga() {
  yield all([
    fork(watchAuthSaga), // Auth saga
    fork(watchHomeSaga), // Home saga
  ]);
}
