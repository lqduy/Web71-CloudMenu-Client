import api from './axiosInstance';

const AddressAPI = {
  getProvinces: () => {
    const url = 'https://vapi.vnappmob.com/api/province';
    return api.get(url);
  },
  getDistricts: provinceId => {
    const url = `https://vapi.vnappmob.com/api/province/district/${provinceId}`;
    return api.get(url);
  },
  getWard: districtId => {
    const url = `https://vapi.vnappmob.com/api/province/ward/${districtId}`;
    return api.get(url);
  }
};

export default AddressAPI;
