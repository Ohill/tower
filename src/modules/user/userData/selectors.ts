import { AppState, UserDataState } from '../../';

export const selectUserData = (state: AppState): UserDataState['userData'] =>
    state.usersData.selectedUser.userData;

export const selectUserDataSuccess = (state: AppState): UserDataState['getUserData'] =>
    state.usersData.selectedUser.getUserData;
