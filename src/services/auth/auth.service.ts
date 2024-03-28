import {
  ILoginRequest,
  ILoginResponse,
} from '@/services/auth/login.interfaces';
import { adminInstance } from '@/services/axios.service';
import { ERoutes } from '@/services/constants';

export const useAuthAdmin = () => {
  const loginAdmin = (params: ILoginRequest) =>
    adminInstance
      .post<ILoginResponse>(ERoutes.LOGIN_ADMIN, params)
      .then((response) => {
        adminInstance.defaults.headers.common['Authorization'] =
          `Bearer ${response.data.accessToken}`;
        localStorage.setItem('adminToken', response.data.accessToken);
      })
      .catch((err) => {
        return Promise.reject(err);
      });

  return {
    loginAdmin,
  };
};
