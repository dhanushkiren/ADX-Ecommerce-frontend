import { all, fork } from "redux-saga/effects";
import { watchAuthSaga } from "./auth/authSaga";
import { watchCartSaga } from "./cart/cartSaga";

const rootSaga = function* () {
  yield all([fork(watchAuthSaga),  fork(watchCartSaga),]);
};

export default rootSaga;

