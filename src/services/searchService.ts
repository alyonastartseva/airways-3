// eslint-disable-next-line import/no-named-as-default
import axiosInstance from '@services/axios';
import { IDestination, ISearchQuery } from '@interfaces/search.interfaces';
import { ILoginRequest } from '@interfaces/login.interfaces';
import ERoutes from '@services/endpoints';

class searchService {
  admin: ILoginRequest = {
    password: 'admin',
    username: 'admin@mail.ru',
  };

  getHeaders = async () => {
    let token;
    if (localStorage.getItem('token')) {
      token = localStorage.getItem('token');
    } else {
      const res = await axiosInstance.post(ERoutes.LOGIN_ADMIN, {
        ...this.admin,
      });
      localStorage.setItem('token', res.data.accessToken as string);
      token = res.data.accessToken;
    }
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    };
  };

  getDestinations = async () => {
    return await axiosInstance.get<IDestination[]>(
      ERoutes.DESTINATION,
      await this.getHeaders()
    );
  };

  getSearchId = async (searchQuery: ISearchQuery) => {
    return axiosInstance.post<number>(
      '/search',
      { ...searchQuery },
      await this.getHeaders()
    );
  };

  getSearchResult = async (searchQuery: ISearchQuery) => {
    const { data } = await this.getSearchId(searchQuery);
    return axiosInstance.get(`/search/${data}`), await this.getHeaders();
  };
}

export default new searchService();
