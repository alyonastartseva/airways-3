import axios from 'axios';

const baseURL = 'http://localhost:8080/api';

export const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers.set('Content-Type', 'application/json');
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export const clientInstance = axios.create({
  baseURL,
});

clientInstance.interceptors.request.use(
  (config) => {
    config.headers.set('Content-Type', 'application/json');
    if (!localStorage.getItem('accessToken')) {
      getToken();
    }
    config.headers.set(
      'Authorization',
      `Bearer ${localStorage.getItem('accessToken')}`
    );
    return config;
  },
  (error) => Promise.reject(error)
);

clientInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export const getToken = async () => {
  try {
    const response = await axiosInstance.post('/auth/login', {
      password: 'admin',
      username: 'admin@mail.ru',
    });
    localStorage.setItem('accessToken', response.data.accessToken);
  } catch (err) {
    console.log(err);
  }
};

export default axiosInstance;
