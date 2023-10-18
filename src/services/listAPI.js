import api from './axiosInstance';

const ListAPI = {
  getTopNewPage: quantity => {
    const url = `/lists/page/new?q=${quantity}`;
    return api.get(url);
  },
  getTopNewDish: quantity => {
    const url = `/lists/dish/new?q=${quantity}`;
    return api.get(url);
  }
};

export default ListAPI;
