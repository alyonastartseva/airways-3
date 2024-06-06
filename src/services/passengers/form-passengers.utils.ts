import { FormPassengersPost, IPassport, IFormPassengers } from '@/interfaces';

export const mapPassengersFormData = (
  data: IFormPassengers
): FormPassengersPost => {
  const {
    rolesName,
    passportIssuingCountry,
    passportIssuingDate,
    serialNumberPassport,
    gender,
    middleName,
    ...dataRest
  } = data;

  const rolesArray = rolesName ? [{ name: rolesName }] : [];

  const roles = {
    roles: rolesArray,
  };

  const passport: { passport: IPassport } = {
    passport: {
      passportIssuingCountry,
      passportIssuingDate,
      serialNumberPassport,
      gender,
      middleName,
    },
  };

  const passenger = {
    '@type': 'passenger',
  };

  return Object.assign({}, dataRest, roles, passport, passenger);
};
