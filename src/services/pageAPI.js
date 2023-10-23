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
  update: (id, data) => {
    const url = `/pages/${id}`;
    return api.put(url, data);
  },
  applyMenu: (id, body) => {
    const url = `/pages/${id}/apply-menu`;
    return api.put(url, body);
  },
  unApplyMenu: id => {
    const url = `/pages/${id}/un-apply-menu`;
    return api.put(url);
  },
  delete: (id, body) => {
    const url = `pages/${id}`;
    return api.post(url, body);
  }
};

export default PageAPI;
