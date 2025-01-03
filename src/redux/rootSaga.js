import { all, fork } from "redux-saga/effects";
import { watchAuthSaga } from "./auth/authSaga";

const rootSaga = function* () {
  yield all([fork(watchAuthSaga)]);
};

export default rootSaga;
