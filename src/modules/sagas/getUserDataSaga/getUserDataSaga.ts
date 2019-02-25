import { call, put } from 'redux-saga/effects';
import {
    getUserDataError,
    getUserDataSuccess,
    UserDataFetch
} from '../../actions';
import { API } from '../../../api';

export function* getUserDataSaga(action: UserDataFetch) {
    try {
        const user = yield call(API.get(), `/admin/users/${action.payload.uid}`);
        yield put(getUserDataSuccess(user.data));
    } catch (error) {
        yield put(getUserDataError(error));
    }
}
