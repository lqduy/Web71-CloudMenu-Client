import api from './axiosInstance';

const PageAPI = {
  getAllOfUser: userId => {
    const url = `/pages/user/${userId}`;
    return api.get(url);
  },
  getOne: id => {
    const url = `/pages/${id}`;
    return api.get(url);
  },
  create: data => {
    const url = '/pages';
    return api.post(url, data);
  },
  applyMenu: (id, body) => {
    const url = `/pages/${id}/apply-menu`;
    return api.put(url, body);
  }
};

export default PageAPI;
