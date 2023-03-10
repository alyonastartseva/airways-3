export type TPerson = {
  id: number;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  birthDate?: number;
  gender?: string;
  phoneNumber?: string;
  roles: { id: number; name: string }[];
  passport?: {
    gender?: string;
    passportIssuingCountry?: string;
    passportIssuingDate?: string;
    serialNumberPassport?: string;
  };
};
