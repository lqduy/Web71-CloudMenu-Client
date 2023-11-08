import axios from 'axios';
import { PATH } from '~/routes';
import { TOKEN_TYPES } from '~/utils/constants';

const SERVER_DOMAIN = import.meta.env.VITE_SERVER_DOMAIN;
const BASE_API_URL = `${SERVER_DOMAIN}/api/v1`;

const api = axios.create({
  baseURL: BASE_API_URL,
  timeout: 10000
});

// Attach accessToken to request headers
api.interceptors.request.use(
  config => {
    const accessToken = localStorage.getItem(TOKEN_TYPES.ACCESS_TOKEN);

    if (accessToken) {
      config.headers['x-access-token'] = accessToken;
    }

    return config;
  },
  error => {
    return Promise.reject(error.response.data);
  }
);

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      localStorage.removeItem(TOKEN_TYPES.ACCESS_TOKEN);
      window.location.href = PATH.LOGIN;
    }
    return Promise.reject(error.response.data);
  }
);

export default api;
