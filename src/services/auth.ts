import { ILoginRequest, ILoginResponse } from '@interfaces/login.interfaces';
import { axiosInstance } from '@services/axios';
import ERoutes from '@services/endpoints';

export const useAuthAdmin = () => {
  const loginAdmin = (params: ILoginRequest) =>
    axiosInstance
      .post<ILoginResponse>(ERoutes.LOGIN_ADMIN, params)
      .then((response) => {
        axiosInstance.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${response.data.accessToken}`;
        localStorage.setItem('token', response.data.accessToken);
      });

  return {
    loginAdmin,
  };
};
