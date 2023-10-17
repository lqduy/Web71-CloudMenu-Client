import axios from 'axios';

const BASE_API_URL = 'https://vapi.vnappmob.com/api/province';

const api = axios.create({
  baseURL: BASE_API_URL,
  timeout: 10000
});

const AddressAPI = {
  getProvinces: () => {
    const url = '/';
    return api.get(url);
  },
  getDistricts: provinceId => {
    const url = `/district/${provinceId}`;
    return api.get(url);
  },
  getWard: districtId => {
    const url = `/ward/${districtId}`;
    return api.get(url);
  }
};

export default AddressAPI;
