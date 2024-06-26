export interface IFormValuesRegisterUser {
  firstName: string;
  lastName: string;
  dayOfBirth: number;
  monthOfBirth: number;
  yearOfBirth: number;
  country: string;
  email: string;
  telNumber: string;
  telCode: string;
  password: string;
  repeatPassword: string;
  question: string;
  answer: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
