import { call, put, takeLatest } from 'redux-saga/effects';
import {
  fetchSearchResultsStart,
  fetchSearchResultsSuccess,
  fetchSearchResultsFailure,
} from './searchSlice';
import { searchProducts } from '../../utils/data'; // Assuming the API for search is here

export function* fetchSearchResultsSaga(action) {
  try {
    const { searchQuery, filter, sortBy } = action.payload;
    const results = yield call(searchProducts, searchQuery, filter, sortBy); // Modify based on the API
    yield put(fetchSearchResultsSuccess(results));
  } catch (error) {
    yield put(fetchSearchResultsFailure(error.message));
  }
}

export function* watchSearchSaga() {
  yield takeLatest(fetchSearchResultsStart.type, fetchSearchResultsSaga);
}

