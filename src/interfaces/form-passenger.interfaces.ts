export interface IFormPassenger {
  firstName?: string;
  lastName?: string;
  password?: string;
  question?: string;
  phoneNumber?: string;
  birthDate?: string;
  email?: string;
  passport?: { passportIssuingCountry: string };
}
export interface PassengersTableInterface {
  answerQuestion: string;
  email: string;
  id: number;
  password: string;
  roles: [
    {
      id: number;
      name: string;
    }
  ];
  securityQuestion: string;
  birthDate: string;
  firstName: string;
  lastName: string;
  passport: {
    gender: string;
    middleName: string;
    passportIssuingCountry: string;
    passportIssuingDate: string;
    serialNumberPassport: string;
  };
  phoneNumber: string;
}
