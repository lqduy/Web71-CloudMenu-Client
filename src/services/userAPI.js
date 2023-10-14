import api from './axiosInstance';

const UserAPI = {
  getOne: id => {
    const url = `/users/${id}`;
    return api.get(url);
  },
  update: (id, data) => {
    const url = `/users/${id}`;
    return api.put(url, data);
  }
};

export default UserAPI;
