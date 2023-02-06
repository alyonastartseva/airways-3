import { ILoginRequest, ILoginResponse } from '@interfaces/login.interfaces';
import { axiosInstance } from '@services/axios';
import ERoutes from '@services/endpoints';

export const useAuthAdmin = () => {
  const loginAdmin = (params: ILoginRequest) =>
    axiosInstance.post<ILoginResponse>(ERoutes.LOGIN_ADMIN, params);

  return {
    loginAdmin,
  };
};
