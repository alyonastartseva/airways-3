import axios from 'axios';

const baseURL = 'http://92.118.114.29:8080/api';

// пока нигде не используется
export const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// инстанс для админских грязных дел
export const adminInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

adminInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

adminInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

// клиентский инстанс, пока нигде не используется
export const clientInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

clientInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

clientInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default adminInstance;
