import * as constant from '../constant';
import { uploadImagesReq } from '../../api/requests';

export const uploadImages = () => {
  return async (dispatch) => {
    const response = await uploadImagesReq();
    dispatch({
      type: constant.UPLOAD_IMAGES,
      payload: response.data,
    });
  };
};
