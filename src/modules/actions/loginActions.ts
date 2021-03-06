import {
    LOGIN_DATA,
    LOGIN_FETCH,
    LOGIN_FAILURE,
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

export interface LoginError {
    code?: number;
    message?: string;
}

export interface LoginFetch {
    type: typeof LOGIN_FETCH,
    payload: {
        email: string,
        password: string,
        otp_code?: string,
    };
}

export interface LoginData {
    type: typeof LOGIN_DATA,
    payload: UserDataInterface;
}

export interface LoginFailed {
    type: typeof LOGIN_FAILURE,
    payload: LoginError,
}

export interface SignInRequire2FA {
    type: typeof SIGN_IN_REQUIRE_2FA;
    payload: {
        require2fa: boolean;
    };
}

export type LoginAction = LoginFetch | LoginFailed | LoginData | SignInRequire2FA;

export const login = (payload: LoginFetch['payload']): LoginFetch => ({
    type: LOGIN_FETCH,
    payload,
});

export const loginError = (payload: LoginFailed['payload']): LoginFailed => ({
    type: LOGIN_FAILURE,
    payload,
});

export const loginData = (payload: LoginData['payload']): LoginData => ({
    type: LOGIN_DATA,
    payload,
});

export const signInRequire2FA = (payload: SignInRequire2FA['payload']): SignInRequire2FA => ({
    type: SIGN_IN_REQUIRE_2FA,
    payload,
});
