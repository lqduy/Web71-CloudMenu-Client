import axios from 'axios';

const BASE_API_URL = 'http://localhost:3001/api/v1';

const api = axios.create({
  baseURL: BASE_API_URL,
  timeout: 10000
});

export default api;
