import api from './axiosInstance';

const NewsAPI = {
  getNewest: limit => {
    const url = `/news/?q=${limit}`;
    return api.get(url);
  }
};

export default NewsAPI;
