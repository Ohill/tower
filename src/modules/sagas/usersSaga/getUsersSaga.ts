import { call, put } from 'redux-saga/effects';
import { getUsersData, getUsersError, GetDataByFilterFetch, GetUsersFetch } from '../../actions';
import { API } from '../../../api';

export function* getUsersSaga(action: GetUsersFetch) {
    try {
        const page = action.payload ? action.payload.page : 1;
        const limit = action.payload ? action.payload.limit : 100
        const users = yield call(API.get(), `/admin/users?page=${page}&limit=${limit}`);
        yield put(getUsersData({users: users.data, total: users.headers.total}));
    } catch (error) {
        yield put(getUsersError(error));
    }
}

export function* getUsersSagaSearch(action: GetDataByFilterFetch) {
    try {
        const page = action.payload.page ? action.payload.page : 1;
        const limit = action.payload.limit ? action.payload.limit : 100;
        const users = yield call(API.get(), `/admin/users/search?field=${action.payload.field}&value=${action.payload.value}&page=${page}&limit=${limit}`);
        yield put(getUsersData({users: users.data, total: users.headers.total}));
    } catch (error) {
        yield put(getUsersError(error));
    }
}
