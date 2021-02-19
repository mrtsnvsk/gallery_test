import initialState from './initialState';
import * as constant from './constant';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case constant.AUTH_USER:
      return {
        ...state,
        user: action.payload,
        isAuth: true,
      };
    case constant.AUTH_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case constant.CHECK_AUTH:
      return {
        ...state,
        isAuth: true,
        user: action.payload,
      };
    case constant.LOG_OUT:
      return {
        ...state,
        isAuth: false,
      };
    case constant.UPLOAD_IMAGES:
      return {
        ...state,
        images: action.payload,
      };
    case constant.UPLOAD_COMMENTS:
      return {
        ...state,
        currentImage: Object.assign({}, ...action.payload[0]),
        currentImageComments: action.payload[1],
      };
    default:
      return state;
  }
};

export default reducer;
