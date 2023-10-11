import api from './axiosInstance';

const DishesAPI = {
  getAll: () => {
    const url = '/dishes';
    return api.get(url);
  },
  create: data => {
    const url = '/dishes';
    return api.post(url, data);
  },
  update: (id, data) => {
    const url = `/dishes/${id}`;
    return api.put(url, data);
  },
  deleteById: id => {
    const url = `dishes/${id}`;
    return api.delete(url);
  }
};

export default DishesAPI;
