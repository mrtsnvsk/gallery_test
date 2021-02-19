import * as constant from '../constant';
import { uploadCommentsReq } from '../../api/requests';

export const uploadComments = (id) => {
  return async (dispatch) => {
    const response = await uploadCommentsReq(id);
    dispatch({
      type: constant.UPLOAD_COMMENTS,
      payload: response.data,
    });
  };
};
