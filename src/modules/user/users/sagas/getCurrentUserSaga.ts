import { call, put } from 'redux-saga/effects';
import {
    alertPush,
    getCurrentUserData,
    GetCurrentUserFetch,
} from '../../../';
import { API } from '../../../../api';

export function* getCurrentUserSaga(action: GetCurrentUserFetch) {
    try {
        const user = yield call(API.get(), '/resource/users/me');
        yield put(getCurrentUserData(user.data));
    } catch (error) {
        yield put(alertPush({message: error.message, code: error.code, type: 'error'}));
    }
}
