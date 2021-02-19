import * as constant from '../constant';
import { authUserReq } from '../../api/requests';

export const authUser = (data) => {
  return async (dispatch) => {
    const response = await authUserReq(data);

    if (response.data.error) {
      return dispatch(authError(response.data.error));
    }

    localStorage.setItem('token', response.data.token);
    const token = window.atob(response.data.token.split('.')[1]);
    dispatch({
      type: constant.AUTH_USER,
      payload: token,
    });
  };
};

export const checkAuthUser = () => {
  const token = localStorage.getItem('token');
  const user = window.atob(token.split('.')[1]);

  return {
    type: constant.CHECK_AUTH,
    payload: user,
  };
};

export const authError = (data) => {
  return {
    type: constant.AUTH_ERROR,
    payload: data,
  };
};

export const logoutUser = () => {
  localStorage.removeItem('token');
  return {
    type: constant.LOG_OUT,
  };
};
