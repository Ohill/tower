import { takeLatest } from 'redux-saga/effects';
import {
    CHANGE_USER_OTP_FETCH,
    CHANGE_USER_ROLE_FETCH,
    CHANGE_USER_STATE_FETCH,
} from '../../constants';
import { changeUserOTPSaga } from './changeUserOTPSaga';
import { changeUserRoleSaga } from './changeUserRoleSaga';
import { changeUserStateSaga } from './changeUserStateSaga';

export function* rootChangeUserSaga() {
    yield takeLatest(CHANGE_USER_OTP_FETCH, changeUserOTPSaga);
    yield takeLatest(CHANGE_USER_ROLE_FETCH, changeUserRoleSaga);
    yield takeLatest(CHANGE_USER_STATE_FETCH, changeUserStateSaga);
}
