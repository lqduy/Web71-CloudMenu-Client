import api from './axiosInstance';

const OrderAPI = {
  create: data => {
    const url = '/order';
    return api.post(url, data);
  }
};

export default OrderAPI;
