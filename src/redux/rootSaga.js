import { all, fork } from "redux-saga/effects";
import { watchAuth } from "./auth/authSaga";

const rootSaga = function* () {
  yield all([fork(watchAuth)]);
};

export default rootSaga;
