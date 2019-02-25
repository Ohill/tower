import { call, put } from 'redux-saga/effects';
import { LogoutFetch } from '../';
import { alertPush } from '../../';
import { API } from '../../../api';

export function* logoutSaga(action: LogoutFetch) {
    try {
        document.cookie = "session=; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
        window.location.replace('/tower/login');
        yield call(API.delete(), '/identity/sessions');
    } catch (error) {
        yield put(alertPush({message: error.message, code: error.code, type: 'error'}));
    }
}
