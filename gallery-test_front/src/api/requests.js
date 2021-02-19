import axios from './axios';

export const authUserReq = (data) => {
  return axios.post('/api/auth', { ...data });
};

export const uploadImagesReq = () => {
  return axios.get('/api/images');
};

export const uploadCommentsReq = (id) => {
  return axios.post(`/api/comment/${id}`);
};
