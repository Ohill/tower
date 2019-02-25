import {
    CHANGE_USER_OTP_FETCH,
    CHANGE_USER_ROLE_FETCH,
    CHANGE_USER_STATE_FETCH,
} from '../constants';

export interface ChangeUserOTPFetch {
    type: typeof CHANGE_USER_OTP_FETCH,
    payload: {
        uid: string;
        otp: boolean;
    },
}

export interface ChangeUserRoleFetch {
    type: typeof CHANGE_USER_ROLE_FETCH,
    payload: {
        uid: string;
        role: string;
    },
}

export interface ChangeUserStateFetch {
    type: typeof CHANGE_USER_STATE_FETCH,
    payload: {
        uid: string;
        state: string;
    },
}

export type ChangeUserAction = ChangeUserOTPFetch | ChangeUserRoleFetch | ChangeUserStateFetch;

export const changeUserOTP = (payload: ChangeUserOTPFetch['payload']): ChangeUserOTPFetch => ({
    type: CHANGE_USER_OTP_FETCH,
    payload,
});

export const changeUserRole = (payload: ChangeUserRoleFetch['payload']): ChangeUserRoleFetch => ({
    type: CHANGE_USER_ROLE_FETCH,
    payload,
});

export const changeUserState = (payload: ChangeUserStateFetch['payload']): ChangeUserStateFetch => ({
    type: CHANGE_USER_STATE_FETCH,
    payload,
});
