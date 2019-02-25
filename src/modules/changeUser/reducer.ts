import { ChangeUserAction } from './actions';
import {
    CHANGE_USER_OTP_FETCH,
    CHANGE_USER_ROLE_FETCH,
    CHANGE_USER_STATE_FETCH,
} from '../constants';

export interface ChangeUserState {
    OTPChanged: boolean;
    roleChanged: boolean;
    stateChanged: boolean;
}

const initial: ChangeUserState = {
    OTPChanged: false,
    roleChanged: false,
    stateChanged: false,
};

export const changeUserReducer = (state = initial, action: ChangeUserAction) => {
    switch (action.type) {
        case CHANGE_USER_OTP_FETCH:
            return {
                ...state,
                OTPChanged: true,
            };
        case CHANGE_USER_ROLE_FETCH:
            return {
                ...state,
                roleChanged: true,
            };
        case CHANGE_USER_STATE_FETCH:
            return {
                ...state,
                stateChanged: true,
            };
        default:
            return {
                ...state,
            };
    }
};
