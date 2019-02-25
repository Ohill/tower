import { call, put } from 'redux-saga/effects';
import {
    alertPush,
    ChangeUserRoleFetch,
    getUserData,
} from '../../';
import { API } from '../../../api';

export function* changeUserRoleSaga(action: ChangeUserRoleFetch) {
    try {
        yield call(API.put(), `/admin/users`, action.payload);
        yield put(getUserData({uid: action.payload.uid}));
    } catch (error) {
        yield put(alertPush({message: error.message, code: error.code, type: 'error'}));
    }
}
