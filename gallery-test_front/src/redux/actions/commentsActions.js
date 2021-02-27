import * as constant from '../constant';
import { uploadCommentsReq, newCommentReq } from '../../api/requests';

export const uploadComments = (id) => {
  return async (dispatch) => {
    const response = await uploadCommentsReq(id);
    dispatch({
      type: constant.UPLOAD_COMMENTS,
      payload: response.data,
    });
  };
};

export const newComment = (data) => {
  return async (dispatch) => {
    await newCommentReq(data);
    dispatch({
      type: constant.NEW_COMMENT,
      payload: data,
    });
  };
};
