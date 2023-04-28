import { ILoginRequest, ILoginResponse } from '@interfaces/login.interfaces';
import { adminInstance } from '@/services/axios.service';
import ERoutes from '@/services/endpoints.service';

export const useAuthAdmin = () => {
  const loginAdmin = (params: ILoginRequest) =>
    adminInstance
      .post<ILoginResponse>(ERoutes.LOGIN_ADMIN, params)
      .then((response) => {
        adminInstance.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${response.data.accessToken}`;
        localStorage.setItem('adminToken', response.data.accessToken);
      });

  return {
    loginAdmin,
  };
};