import { all, call } from 'redux-saga/effects';
import { combineReducers } from 'redux';
import {
    alertReducer,
    AlertState,
    rootHandleAlertSaga,
} from './alert';
import {
    authReducer,
    AuthState,
    rootAuthSaga,
} from './auth';
import {
    changeUserReducer,
    ChangeUserState,
    rootChangeUserSaga,
} from './changeUser';
import {
    labelReducer,
    LabelState,rootLabelSaga,
} from './label';
import {
    rootGetUserDataSaga,
    rootUsersSaga,
    userDataReducer,
    UserDataState,
    usersReducer,
    UsersState,
} from './user';

export * from './alert';
export * from './auth';
export * from './changeUser';
export * from './label';
export * from './user';

export interface AppState {
    alert: AlertState;
    auth: AuthState;
    changeUserState: ChangeUserState;
    userLabels: LabelState;
    usersData: {
        selectedUser: UserDataState;
        users: UsersState;
    };
}

const usersDataReducer = combineReducers({
    selectedUser: userDataReducer,
    users: usersReducer,
});

export const appReducer = combineReducers({
    alert: alertReducer,
    auth: authReducer,
    changeUserState: changeUserReducer,
    userLabels: labelReducer,
    usersData: usersDataReducer,
});

export function* rootSaga() {
    yield all([
        call(rootLabelSaga),
        call(rootAuthSaga),
        call(rootChangeUserSaga),
        call(rootGetUserDataSaga),
        call(rootUsersSaga),
        call(rootHandleAlertSaga),
    ]);
}
