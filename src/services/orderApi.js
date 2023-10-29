import api from './axiosInstance';

const OrderAPI = {
  create: data => {
    const url = '/orders';
    return api.post(url, data);
  },
  getAllOfPage: pageId => {
    const url = `/orders/${pageId}`;
    return api.get(url);
  },
  update: (id, body) => {
    const url = `/orders/${id}`;
    return api.put(url, body);
  }
};

export default OrderAPI;
