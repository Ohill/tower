import { call, put } from 'redux-saga/effects';
import { getUsersData, getUsersError, GetUsersFetch } from '../../actions';
import { API } from '../../../api';

export function* getUsersSaga(action: GetUsersFetch) {
    try {
        const page = action.payload ? action.payload.page : 1;
        const limit = action.payload ? action.payload.limit : 100
        const users = yield call(API.get(), `/admin/users?page=${page}&limit=${limit}`);
        yield put(getUsersData(users));
    } catch (error) {
        yield put(getUsersError(error));
    }
}
