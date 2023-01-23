import axios from 'axios';

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
    if (!localStorage.getItem('token')) {
      await this.getAuthorizationToken();
    }
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

  createUserAsPassenger = async (user: {
    firstName: string;
    lastName: string;
    password: string;
    question: string;
    phoneNumber: string;
    birthDate: string;
    email: string;
    passport: { passportIssuingCountry: string };
  }) => {
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
}
export default AviasalesService;
