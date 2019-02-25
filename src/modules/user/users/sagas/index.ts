import { takeLatest } from 'redux-saga/effects';
import { GET_USERS_FETCH, GET_CURRENT_USER_FETCH, GET_DATA_BY_FILTER_FETCH } from '../../../constants';
import { getUsersSaga, getUsersSagaSearch } from './getUsersSaga';
import { getCurrentUserSaga } from './getCurrentUserSaga';

export function* rootUsersSaga() {
    yield takeLatest(GET_USERS_FETCH, getUsersSaga);
    yield takeLatest(GET_CURRENT_USER_FETCH, getCurrentUserSaga);
    yield takeLatest(GET_DATA_BY_FILTER_FETCH, getUsersSagaSearch);
}
