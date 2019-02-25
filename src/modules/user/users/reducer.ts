import { UsersAction, UserInterface } from './actions';
import {
    GET_CURRENT_USER_FETCH,
    GET_CURRENT_USER_DATA,
    GET_DATA_BY_FILTER_FETCH,
    GET_USERS_FETCH,
    GET_USERS_SUCCESS,
} from '../../constants';

export interface UsersState {
    loading: boolean;
    users: UserInterface[];
    currentUser: UserInterface | undefined;
    loadingCurrentUser: boolean;
    usersTotal: number;
}

const initial: UsersState = {
    loading: false,
    currentUser: undefined,
    loadingCurrentUser: false,
    users: [],
    usersTotal: 0,
}

export const usersReducer = (state = initial, action: UsersAction) => {
    switch (action.type) {
      case GET_USERS_FETCH:
          return {
              ...state,
              loading: true,
          };
      case GET_USERS_SUCCESS:
          return {
              ...state,
              loading: false,
              users: action.payload.users,
              usersTotal: action.payload.total,
          };
      case GET_DATA_BY_FILTER_FETCH:
          return {
              ...state,
              loading: true,
          };
      case GET_CURRENT_USER_FETCH:
          return {
              ...state,
              loadingCurrentUser: true,
          };
      case GET_CURRENT_USER_DATA:
          return {
              ...state,
              loadingCurrentUser: false,
              currentUser: action.payload,
          };
      default:
          return {
              ...state,
          };
    }
}
