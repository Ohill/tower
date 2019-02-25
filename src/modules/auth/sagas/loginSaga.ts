import { call, put } from 'redux-saga/effects';
import {
    LoginFetch,
    loginData,
    logout,
    signInRequire2FA,
} from '../';
import { alertPush } from '../../';
import { API } from '../../../api';

export function* loginSaga(action: LoginFetch) {
    try {
        const user = yield call(API.post(), '/identity/sessions', action.payload);
        if (user.data.role === 'admin') {
            yield put(loginData(user.data));
            document.cookie = 'session=true; path=/';
            window.location.replace('/tower');
        } else {
            yield put(logout());
        }
    } catch (error) {
        const responseStatus = error.code;
        const is2FAEnabled = responseStatus === 403;

        if (is2FAEnabled) {
            yield put(signInRequire2FA({ require2fa: true }));
        } else {
            yield put(alertPush({message: error.message, code: error.code, type: 'error'}));
        }
    }
}
