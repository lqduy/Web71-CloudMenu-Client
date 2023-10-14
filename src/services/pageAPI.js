import api from './axiosInstance';

const PageAPI = {
  getAll: () => {
    const url = '/pages';
    return api.get(url);
  },
  getOne: id => {
    const url = `/pages/${id}`;
    return api.get(url);
  },
  create: data => {
    const url = '/pages';
    return api.post(url, data);
  }
};

export default PageAPI;
