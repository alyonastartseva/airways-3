export type TPerson = {
  id: number;
  firstName?: string;
  lastName?: string;
  birthDate?: number;
  gender?: string;
  phoneNumber?: string;
  roles: { id: number; name: string }[];
  middleName?: string;
  passport?: {
    middleName?: string;
    gender?: string;
    passportIssuingCountry?: string;
    passportIssuingDate?: string;
    serialNumberPassport?: string;
  };
};

export enum PersonGenders {
  MALE = 'male',
  FEMALE = 'female',
}
