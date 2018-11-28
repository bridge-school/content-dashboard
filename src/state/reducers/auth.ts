import { Action } from '../actions';

const AuthReducerMap = {
  SET_SIGNIN_USER: (state, action) => {
    return { ...state, loggedInUser: action.payload };
  }
};

export interface AuthState {
  auth: {
    loggedInUser: any
  }
}

export const authReducer = (state = { loggedInUser: null }, action: Action) => {
  if (action && AuthReducerMap.hasOwnProperty(action.type)) {
    return AuthReducerMap[action.type](state, action);
  }

  return state;
};