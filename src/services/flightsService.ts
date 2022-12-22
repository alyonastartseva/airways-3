import axios from "axios";
import Person from "@/Interfaces/Person";

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

//   getAllDestinations = async () => {
//     const token = localStorage.getItem("token");
//     const res = await fetch("http://localhost:5173/api/destination", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     }).catch((err) => Promise.reject(err));
//     const result = await res.json();
//     return result;
//   };

  getUsers = async () => {
    const response = await axios.get("http://localhost:5173/api/user", {
    });
    const usersInfo = response.data;
    const users: Person[] = usersInfo.map(
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
      }: Person) => {
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
  };
}
export default new aviasalesService();
