import { AuthAction } from './';
import {
    LOGIN_DATA,
    LOGIN_FETCH,
    LOGOUT_FETCH,
    SIGN_IN_REQUIRE_2FA,
} from '../constants';

interface UserDataInterface {
    email: string;
    level: number;
    otp: boolean;
    role: string;
    state: string;
    uid: string;
}

export interface AuthState {
    user: UserDataInterface;
    require2FA?: boolean;
}

export const authReducer = (state = {}, action: AuthAction) => {
    switch (action.type) {
        case LOGIN_FETCH:
            return {
                ...state,
            };
        case LOGIN_DATA:
            return {
                ...state,
                user: action.payload,
            };
        case LOGOUT_FETCH:
            return {
                ...state,
            };
        case SIGN_IN_REQUIRE_2FA:
            return {
                ...state,
                require2FA: action.payload.require2fa,
            }
        default:
            return {
                ...state,
            };
    }
}
