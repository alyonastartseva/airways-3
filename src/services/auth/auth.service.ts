import { adminInstance, ERoutes } from '@/services';

import { ILoginRequest, ILoginResponse } from './login.interfaces';

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
