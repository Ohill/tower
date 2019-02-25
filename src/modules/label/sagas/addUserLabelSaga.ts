import { call, put } from 'redux-saga/effects';
import {
    AddUserLabelFetch,
    alertPush,
    getUserData,
} from '../../';
import { API } from '../../../api';

export function* addUserLabelSaga(action: AddUserLabelFetch) {
    try {
        yield call(API.post(), `/admin/users/labels`, action.payload);
        yield put(getUserData({uid: action.payload.uid}));
    } catch (error) {
        yield put(alertPush({message: error.message, code: error.code, type: 'error'}));
    }
}
