import { UserDataAction } from './actions';
import {
    GET_USER_DATA_FETCH,
    GET_USER_DATA_SUCCESS,
} from '../../constants';

export interface UserDataState {
    userData: any;
    getUserData: boolean;
}

const initial: UserDataState = {
    userData: undefined,
    getUserData: false,
};

export const userDataReducer = (state = initial, action: UserDataAction) => {
    switch (action.type) {
      case GET_USER_DATA_FETCH:
          return {
              ...state,
              getUserData: false,
          };
      case GET_USER_DATA_SUCCESS:
          return {
              ...state,
              userData: action.payload,
              getUserData: true,
          };
      default:
          return {
              ...state,
          };
    }
}
