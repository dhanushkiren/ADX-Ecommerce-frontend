import { all, fork } from "redux-saga/effects";
import { watchAuthSaga } from "./auth/authSaga";
import { watchUpdateProfile } from "./editprofile/saga";

const rootSaga = function* () {
  yield all([
    fork(watchAuthSaga),
    fork(watchUpdateProfile),
  ]);
};

export default rootSaga;