import { IFormValuesRegisterUser } from "@interfaces/form-values-register-user";
import { format } from "date-fns";

const getAllDaysInMonth = (month: any, year: any) =>
  Array.from(
    { length: new Date(year, month, 0).getDate() },
    (_, i) => new Date(year, month - 1, i + 1)
  );

const months = Array.from({ length: 12 }, (e, i) => i);

const years = Array.from(
  { length: 71 },
  (_, i) => new Date().getFullYear() - i
);

const prepareFormData = (values: IFormValuesRegisterUser) => {
  const {
    firstName,
    lastName,
    telCode,
    telNumber,
    yearOfBirth,
    monthOfBirth,
    dayOfBirth,
    password,
    question,
    email,
    country
  } = values;
  const phoneNumber = `${telCode} ${telNumber}`;
  const birthDate = format(
    new Date(yearOfBirth, monthOfBirth - 1, dayOfBirth),
    "yyyy-MM-dd"
  );
  const data = {
    firstName,
    lastName,
    password,
    question,
    phoneNumber,
    birthDate,
    email,
    passport: {
      passportIssuingCountry: country
    },
    roles: [{ id: 2, name: "ROLE_PASSENGER" }],
  };
  return data;
};

export { getAllDaysInMonth, months, years, prepareFormData };
