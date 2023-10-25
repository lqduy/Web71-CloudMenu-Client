import api from './axiosInstance';

const MediaAPI = {
  uploadImage: body => {
    const url = '/media/images';
    return api.post(url, body, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    });
  }
};

export default MediaAPI;
