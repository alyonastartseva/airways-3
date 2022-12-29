import axios from "axios";
import { IPerson } from "@interfaces/person";

class aviasalesService {
  getAuthorizationToken = async () => {
    const res = await axios
      .post("http://localhost:8080/api/auth/login", {
        password: "admin",
        username: "admin@mail.ru",
      })
      .catch((err) => Promise.reject(err));
    localStorage.setItem("token", res.data.accessToken);
    return res.data.accessToken;
  };

  getUsers = async () => {
    if (!localStorage.getItem("token")) {
      await this.getAuthorizationToken();
    }
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get("http://localhost:8080/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const usersInfo = response.data;
      console.log(usersInfo)
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
    try {
      const response = await axios.post("http://localhost:8080/api/user", {
        ...user,
        "@type": "passenger",
        roles: [{ id: "2", name: "ROLE_PASSENGER" }],
      });
      console.log('a',response)
      if (response.statusText === "Created") {
        return response;
      } else {
        throw Error;
      }
    } catch (error) {
      return Promise.reject(error)
    }
  };
}
export default new aviasalesService();
