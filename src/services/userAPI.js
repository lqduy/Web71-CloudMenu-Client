import api from './axiosInstance';

const UserAPI = {
  getOne: id => {
    const url = `/users/${id}`;
    return api.get(url);
  }
};

export default UserAPI;
