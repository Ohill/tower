import {
    GET_CURRENT_USER_FETCH,
    GET_CURRENT_USER_DATA,
    GET_DATA_BY_FILTER_FETCH,
    GET_USERS_FETCH,
    GET_USERS_SUCCESS,
} from '../../constants';

export interface GetUsersError {
    code?: number;
    message?: string;
}

export interface UserInterface {
    created_at: string;
    email: string;
    id: number;
    level: number;
    otp: false
    role: string;
    state: string;
    uid: string;
    updated_at: string;
}

export interface GetUsersFetch {
    type: typeof GET_USERS_FETCH,
    payload?: {
        page: number;
        limit: number;
    },
}

export interface GetUsersSuccess {
    type: typeof GET_USERS_SUCCESS,
    payload: {
        users: UserInterface[],
        total: number,
    },
}

export interface GetCurrentUserFetch {
    type: typeof GET_CURRENT_USER_FETCH,
}

export interface GetCurrentUserData {
    type: typeof GET_CURRENT_USER_DATA,
    payload: UserInterface;
}

export interface GetDataByFilterFetch {
    type: typeof GET_DATA_BY_FILTER_FETCH,
    payload: {
        field: string;
        value: string;
        page?: number;
        limit?: number;
    }
}

export type UsersAction = GetUsersFetch
    | GetUsersSuccess
    | GetCurrentUserFetch
    | GetCurrentUserData
    | GetDataByFilterFetch;

export const getUsers = (payload: GetUsersFetch['payload']): GetUsersFetch => ({
    type: GET_USERS_FETCH,
    payload,
});

export const getUsersData = (payload: GetUsersSuccess['payload']): GetUsersSuccess => ({
    type: GET_USERS_SUCCESS,
    payload,
});

export const getCurrentUser = (): GetCurrentUserFetch => ({
    type: GET_CURRENT_USER_FETCH,
});

export const getCurrentUserData = (payload: GetCurrentUserData['payload']): GetCurrentUserData => ({
    type: GET_CURRENT_USER_DATA,
    payload,
});

export const getDataByFilter = (payload: GetDataByFilterFetch['payload']): GetDataByFilterFetch => ({
    type: GET_DATA_BY_FILTER_FETCH,
    payload,
});
