import axios from "axios";
import { IPerson } from "@interfaces/person";

class aviasalesService {
  getAuthorizationToken = async () => {
    const res = await axios
      .post("http://localhost:5173/api/auth/login", {
        password: "admin",
        username: "admin@mail.ru",
      })
      .catch((err) => Promise.reject(err));
    localStorage.setItem("token", res.data.accessToken);
    return res;
  };

  getUsers = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get("http://localhost:5173/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const usersInfo = response.data;
      const users: IPerson[] = usersInfo.map(
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
        }: IPerson) => {
          return {
            id,
            firstName,
            lastName,
            middleName,
            gender,
            phoneNumber,
            passport,
            birthDate,
            roles,
          };
        }
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
    console.log(user)
    try {
      const response = await axios.post("http://localhost:5173/api/user", {
        ...user,
        "@type": "passenger",
        roles: [{ id: "2", name: "ROLE_PASSENGER" }],
      });
      return response;
    } catch (error) {
      return error;
    }
  };
}
export default new aviasalesService();
