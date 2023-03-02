import { axiosInstance } from '@services/axios';
import {
  IDestination,
  ISearchQuery,
  IDestinationPost,
} from '@interfaces/search.interfaces';
import { IAirplane, IAirplanePost } from '@interfaces/plane.interfaces';
// import { ILoginRequest } from '@interfaces/login.interfaces';
import ERoutes from '@services/endpoints';

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

  getDestinations = async () => {
    return await axiosInstance.get<IDestination[]>(ERoutes.DESTINATION);
  };

  patchDestinations = async (data: IDestination | null) => {
    if (data) {
      const { id, ...rest } = data;
      return await axiosInstance.patch<IDestination>(
        ERoutes.DESTINATION + id,
        rest
      );
    }
  };

  deleteDestination = async (id: number | undefined) => {
    if (id) {
      return await axiosInstance.delete<IDestination>(ERoutes.DESTINATION + id);
    }
  };

  postDestinations = async (data: IDestinationPost) => {
    return await axiosInstance.post<IDestinationPost>(
      ERoutes.DESTINATION,
      data
    );
  };

  getAircrafts = async () => {
    return await axiosInstance.get<IAirplane[]>(ERoutes.AIRCRAFT);
  };

  postAircraft = async (data: IAirplanePost) => {
    return await axiosInstance.post<IAirplanePost>(ERoutes.AIRCRAFT, data);
  };

  deleteAircraft = async (id: number | undefined) => {
    if (id) {
      return await axiosInstance.delete<IAirplane>(ERoutes.AIRCRAFT + id);
    }
  };

  patchAircraft = async (data: IAirplane | null) => {
    if (data) {
      const { id, ...rest } = data;
      return await axiosInstance.patch<IAirplane>(ERoutes.AIRCRAFT + id, rest);
    }
  };

  getSearchId = async (searchQuery: ISearchQuery) => {
    return axiosInstance.post<number>('/search', { ...searchQuery });
  };

  getSearchResult = async (searchQuery: ISearchQuery) => {
    const { data } = await this.getSearchId(searchQuery);
    return axiosInstance.get(`/search/${data}`);
  };
}

export default new searchService();
