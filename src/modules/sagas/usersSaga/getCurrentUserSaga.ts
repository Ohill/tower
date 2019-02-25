import { call, put } from 'redux-saga/effects';
import { getCurrentUserData, getCurrentUserError, GetCurrentUserFetch } from '../../actions';
import { API } from '../../../api';

export function* getCurrentUserSaga(action: GetCurrentUserFetch) {
    try {
        const user = yield call(API.get(), '/resource/users/me');
        yield put(getCurrentUserData(user.data));
    } catch (error) {
        yield put(getCurrentUserError(error));
    }
}
