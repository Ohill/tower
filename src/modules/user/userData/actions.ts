import {
    GET_USER_DATA_FETCH,
    GET_USER_DATA_SUCCESS,
} from '../../constants';

export interface UserDataFetch {
    type: typeof GET_USER_DATA_FETCH,
    payload: {
        uid: string,
    };
}

export interface UserDataSuccess {
    type: typeof GET_USER_DATA_SUCCESS,
    payload: {
        user: any,
    };
}

export type UserDataAction = UserDataFetch | UserDataSuccess;

export const getUserData = (payload: UserDataFetch['payload']): UserDataFetch => ({
    type: GET_USER_DATA_FETCH,
    payload,
});

export const getUserDataSuccess = (payload: UserDataSuccess['payload']): UserDataSuccess => ({
    type: GET_USER_DATA_SUCCESS,
    payload,
});
