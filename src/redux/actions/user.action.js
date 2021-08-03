import { USER_ACTION } from '../constants';

export const loginAction = (params) => {
  return {
    type: USER_ACTION.LOGIN,
    payload: params,
  };
}

export const logoutAction = (params) => {
  return {
    type: USER_ACTION.LOGOUT,
    payload: params,
  };
}

export const registerAction = (params) => {
  return {
    type: USER_ACTION.REGISTER,
    payload: params,
  };
}
