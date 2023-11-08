import api from './axiosInstance';

const MenusAPI = {
  getAllOfPage: pageId => {
    const url = `/menus/page/${pageId}`;
    return api.get(url);
  },
  getOne: id => {
    const url = `/menus/${id}`;
    return api.get(url);
  },
  create: data => {
    const url = '/menus';
    return api.post(url, data);
  },
  deleteOne: id => {
    const url = `/menus/${id}`;
    return api.delete(url);
  }
};

export default MenusAPI;
