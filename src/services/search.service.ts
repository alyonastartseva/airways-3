import { adminInstance } from '@/services/axios.service';
import { ISearchQuery } from '@interfaces/search.interfaces';
// import { ILoginRequest } from '@interfaces/login.interfaces';

class searchService {
  // admin: ILoginRequest = {
  //   password: 'admin',
  //   username: 'admin@mail.ru',
  // };

  // getHeaders = async () => {
  //   let token;
  //   if (localStorage.getItem('token')) {
  //     token = localStorage.getItem('token');
  //   } else {
  //     const res = await axiosInstance.post(ERoutes.LOGIN_ADMIN, {
  //       ...this.admin,
  //     });
  //     localStorage.setItem('token', res.data.accessToken as string);
  //     token = res.data.accessToken;
  //   }
  //   return {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       'Content-Type': 'application/json',
  //     },
  //   };
  // };

  getSearchId = async (searchQuery: ISearchQuery) => {
    return adminInstance.post<number>('/search', { ...searchQuery });
  };

  getSearchResult = async (searchQuery: ISearchQuery) => {
    const { data } = await this.getSearchId(searchQuery);
    return adminInstance.get(`/search/${data}`);
  };
}

export default new searchService();
