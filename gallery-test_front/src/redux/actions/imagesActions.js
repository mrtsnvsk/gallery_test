import * as constant from '../constant';
import { uploadImagesReq, uploadNewImageReq } from '../../api/requests';

export const uploadImages = () => {
  return async (dispatch) => {
    const response = await uploadImagesReq();
    dispatch({
      type: constant.UPLOAD_IMAGES,
      payload: response.data,
    });
  };
};

export const uploadNewImage = (formData) => {
  return async (dispatch) => {
    const response = await uploadNewImageReq(formData);

    dispatch({
      type: constant.UPLOAD_NEW_IMAGE,
      payload: response.data,
    });
  };
};
