import {call, put, takeLatest} from 'redux-saga/effects';
import {setAuth, initialAuthSetUpAction, setAuthAction} from './authSlice';
import {retrieveData, storeData} from '../../utils/asyncStorage';

function* initialAuthSetUpSaga() {
  try {
    const localAuthData = yield retrieveData('auth');
    if (localAuthData) {
      yield put(setAuth(localAuthData));
    }
  } catch (err) {
    console.error('Initial Auth Error Message', err);
  }
}

function* setAuthSaga(action) {
  try {
    yield put(setAuth(action.payload));
    yield storeData('auth', action.payload);
  } catch (err) {
    console.error('Set Auth Error Message', err);
  }
}

export function* watchAuth() {
  yield takeLatest(initialAuthSetUpAction.type, initialAuthSetUpSaga);
  yield takeLatest(setAuthAction.type, setAuthSaga);
}