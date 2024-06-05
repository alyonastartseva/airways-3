import { FieldValues } from 'react-hook-form';

import { ERolesPassenger } from '@interfaces/roles.interfaces';

import { IPassenger } from './search.interfaces';
import { ISort } from './api-interfaces';

export interface FormPassengersGet {
  content: IPassenger[];
  totalPages: number;
  pageable: {
    sort: ISort;
    pageNumber: number;
    pageSize: number;
    offset: number;
    unpaged: boolean;
    paged: boolean;
  };
  last: boolean;
  totalElements: number;
  first: boolean;
  sort: ISort;
  numberOfElements: number;
  size: number;
  number: number;
  empty: boolean;
}

export interface IFormPassengers extends FieldValues {
  lastName?: string;
  firstName?: string;
  middleName?: string;

  gender?: string;
  serialNumberPassport?: string;
  passportIssuingCountry?: string;
  passportIssuingDate?: string;

  phoneNumber?: string;
  birthDate?: string;
  email?: string;
  securityQuestion?: string;
  answerQuestion?: string;
  rolesName?: ERolesPassenger;
  password?: string;
}
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
    },
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
