import { IDestination } from '@interfaces/destination.interfaces';
import { ERolesPassenger } from '@interfaces/roles.interfaces';

export interface IArticle {
  title: string;
  header: string;
  body: string;
  image: {
    src: string;
    alt: string;
  };
}
export interface IPassenger {
  id: number;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  passport?: IPassport;
  phoneNumber: string;
  birthDate: string;
  email: string;
}

export interface IPassport {
  middleName?: string;
  gender?: string;
  serialNumberPassport?: string;
  passportIssuingDate?: string;
  passportIssuingCountry?: string;
}

interface ISort {
  unsorted: boolean;
  sorted: boolean;
  empty: boolean;
}

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

export interface FormPassengersPost {
  firstName?: string;
  lastName?: string;
  birthDate?: string;
  phoneNumber?: string;
  passport?: IPassport;
  email?: string;
  answerQuestion?: string;
  password?: string;
  roles?: {
    name?: ERolesPassenger;
  }[];
  securityQuestion?: string;
}
export interface ISearchPageTab {
  label: string;
  icon?: string;
}

export type TDestQuery = Omit<IDestination, 'id'>;

export interface ISearchQuery {
  departureDate: string;
  from: TDestQuery;
  numberOfPassengers: number;
  returnDate: string;
  to: TDestQuery;
}

export interface ITravelDates {
  departureDate: Date | null;
  returnDate: Date | null;
}

export interface IFromTo {
  from: TDestQuery;
  to: TDestQuery;
}

export interface IDestProps {
  fromOrTo: string;
  onSetDestination: (fromOrTo: string, destination: TDestQuery) => void;
  fromTo: IFromTo;
}
