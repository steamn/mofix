import axios, {AxiosInstance} from 'axios';
import {API_KEY} from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = API_KEY;

const $axios: AxiosInstance = axios.create({
  baseURL: api,
  headers: {'Accept-Language': 'ru', 'Content-Type': 'application/json'},
});

$axios.interceptors.request.use(
  async config => {
    const authToken = await AsyncStorage.getItem('token');

    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }

    // console.log({
    //   baseUrl: config.baseURL,
    //   url: config.url,
    //   authToken,
    //   method: config.method,
    // });

    return config;
  },
  err => Promise.reject(err),
);

export default $axios;
