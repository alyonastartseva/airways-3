import axios from 'axios';

import { IFormPassanger } from '@/interfaces/form-passanger.interfaces';
class AviasalesService {
  async getAuthorizationToken(): Promise<string> {
    try {
      const res = await axios.post('http://localhost:8080/api/auth/login', {
        password: 'admin',
        username: 'admin@mail.ru',
      });
      localStorage.setItem('token', res.data.accessToken as string);
      return res.data.accessToken;
    } catch (err) {
      return Promise.reject(err);
    }
  }

  getUsers = async () => {
    await this.getAuthorizationToken();

    const token: string | null = localStorage.getItem('token');
    try {
      const response = await axios.get('http://localhost:8080/api/user', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const usersInfo = response.data;
      const users = usersInfo.map(
        ({
          id,
          firstName,
          lastName,
          middleName,
          gender,
          phoneNumber,
          roles,
          birthDate,
          passport,
        }: Record<
          string,
          {
            id: number;
            firstName: string;
            lastName: string;
            middleName: string;
            gender: string;
            phoneNumber: string;
            roles: { id: number; name: string }[];
            birthDate: number;
            passport: string;
          }
        >) => ({
          id,
          firstName,
          lastName,
          middleName,
          gender,
          phoneNumber,
          passport,
          birthDate,
          roles,
        })
      );
      return users;
    } catch (error) {
      return error;
    }
  };

  static createUserAsPassenger = async (user: IFormPassanger) => {
    try {
      const response = await axios.post('http://localhost:8080/api/user', {
        ...user,
        '@type': 'passenger',
        roles: [{ id: '2', name: 'ROLE_PASSENGER' }],
      });
      if (response.statusText === 'Created') {
        return response;
      }
      throw Error;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  //Planes

  getPlanes = async () => {
    if (!localStorage.getItem('token')) {
      await this.getAuthorizationToken();
    }
    const token: string | null = localStorage.getItem('token');
    try {
      const response = await axios.get('http://localhost:8080/api/aircraft', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const planesInfo = response.data;
      const planes = planesInfo.map(
        ({
          id,
          aircraftNumber,
          model,
          modelYear,
          flightRange,
        }: Record<
          string,
          {
            id: number;
            aircraftNumber: number;
            model: string;
            modelYear: number;
            flightRange: number;
          }
        >) => ({
          id,
          aircraftNumber,
          model,
          modelYear,
          flightRange,
        })
      );
      return planes;
    } catch (error) {
      return error;
    }
  };
}

export default AviasalesService;
