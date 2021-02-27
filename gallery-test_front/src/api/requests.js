import axios from './axios';

export const authUserReq = (data) => {
  return axios.post('/api/auth', data);
};

export const registrationUserReq = (data) => {
  return axios.post('/api/register', data);
};

export const uploadImagesReq = () => {
  return axios.get('/api/images');
};

export const uploadCommentsReq = (id) => {
  return axios.post(`/api/comment/${id}`);
};

export const newCommentReq = (data) => {
  return axios.post('/api/newComment', data);
};

export const uploadNewImageReq = (formData) => {
  const config = {
    headers: { 'content-type': 'multipart/form-data' },
  };
  return axios.post('http://localhost:8080/api/newImage', formData, config);
};
