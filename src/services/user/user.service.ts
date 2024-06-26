import { IFormUserCreate, ERolesPassenger } from '@/interfaces';
import { clientInstance } from '@/services';

import { IFormPost } from './user.interfaces';

export const userApi = {
  async postUser(data: IFormUserCreate) {
    try {
      const requestData = {
        answerQuestion: data.answerQuestion,
        email: data.email,
        password: data.password,
        roles: [{ name: ERolesPassenger.ROLE_PASSENGER }],
        securityQuestion: data.securityQuestion,
      };

      const response = await clientInstance.post<IFormPost>('/accounts', {
        requestData,
      });

      const token = response?.data?.token;
      if (token) {
        localStorage.setItem('token', token);
      }
      return response.data;
    } catch (error) {
      return { error: 'Ошибка при регистрации' };
    }
  },
};
