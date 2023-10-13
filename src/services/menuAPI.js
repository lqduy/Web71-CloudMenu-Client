import api from './axiosInstance';

const MenusAPI = {
  getAll: () => {
    const url = '/menus';
    return api.get(url);
  },
  create: data => {
    const url = '/menus';
    return api.post(url, data);
  }
};

export default MenusAPI;
