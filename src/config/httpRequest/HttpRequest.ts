import axios from 'axios';
import LocalStorageHelper from '../../helpers/LocalStorageHelper';
import { AUTH_TOKEN } from '../../utils/constants';

// Create a new Axios instance with default configuration
const httpRequest = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL, 
});

// Add an interceptor to include the authentication token in each request
httpRequest.interceptors.request.use(
  (config) => {
    const token = LocalStorageHelper.getItem(AUTH_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default httpRequest;
