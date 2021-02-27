import * as constant from '../constant';
import { authUserReq, registrationUserReq } from '../../api/requests';

export const registrationUser = (data) => {
  return async (dispatch) => {
    const response = await registrationUserReq(data);

    if (response.data.error) {
      return dispatch(authError(response.data.error));
    }

    dispatch(regSuccess(response.data.message));
  };
};

export const authUser = (data) => {
  return async (dispatch) => {
    const response = await authUserReq(data);

    if (response.data.error) {
      return dispatch(authError(response.data.error));
    }

    localStorage.setItem('token', response.data.token);
    const token = JSON.parse(window.atob(response.data.token.split('.')[1]));
    dispatch({
      type: constant.AUTH_USER,
      payload: token,
    });
  };
};

export const checkAuthUser = () => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(window.atob(token.split('.')[1]));

  return {
    type: constant.CHECK_AUTH,
    payload: user,
  };
};

export const regSuccess = (message) => {
  return {
    type: constant.REG_SUCCESS,
    payload: message,
  };
};

export const authError = (error) => {
  return {
    type: constant.AUTH_ERROR,
    payload: error,
  };
};

export const logoutUser = () => {
  localStorage.removeItem('token');
  return {
    type: constant.LOG_OUT,
  };
};
