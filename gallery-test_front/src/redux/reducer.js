import initialState from './initialState';
import * as constant from './constant';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case constant.AUTH_USER:
      return {
        ...state,
        currentUser: action.payload,
        isAuth: true,
      };
    case constant.REG_SUCCESS:
      return {
        ...state,
        authSuccess: action.payload,
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
        currentUser: action.payload,
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
    case constant.UPLOAD_NEW_IMAGE:
      return {
        ...state,
        images: [...state.images, action.payload],
      };
    case constant.UPLOAD_COMMENTS:
      return {
        ...state,
        currentImage: Object.assign({}, ...action.payload[0]),
        currentImageComments: action.payload[1],
      };
    case constant.NEW_COMMENT:
      return {
        ...state,
        currentImageComments: [action.payload, ...state.currentImageComments],
      };
    default:
      return state;
  }
};

export default reducer;
