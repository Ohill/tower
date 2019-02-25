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

export interface SignInRequire2FA {
    type: typeof SIGN_IN_REQUIRE_2FA;
    payload: {
        require2fa: boolean;
    };
}

export interface LogoutFetch {
    type: typeof LOGOUT_FETCH,
}

export type AuthAction = LoginFetch 
    | LoginData
    | SignInRequire2FA
    | LogoutFetch;

export const login = (payload: LoginFetch['payload']): LoginFetch => ({
    type: LOGIN_FETCH,
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

export const logout = (): LogoutFetch => ({
    type: LOGOUT_FETCH,
});
