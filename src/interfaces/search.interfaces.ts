import { IDestination } from '@interfaces/destination.interfaces';

export interface IArticle {
  title: string;
  header: string;
  body: string;
  image: {
    src: string;
    alt: string;
  };
}
export interface FormPassengers {
  id: number;
  middleName?: string;
  lastName?: string;
  firstName?: string;
  passport?: {
    gender: string;
    serialNumberPassport: string;
    passportIssuingCountry: string;
    passportIssuingDate: string;
  };
  phoneNumber: string;
  birthDate: string;
}
export interface FormPassengersPost {
  middleName?: string;
  lastName?: string;
  firstName?: string;
  passport?: {
    gender: string;
    serialNumberPassport: string;
    passportIssuingCountry: string;
    passportIssuingDate: string;
  };
  phoneNumber: string;
  birthDate: string;
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

export interface IFromTo {
  from: TDestQuery;
  to: TDestQuery;
}

export interface IDestProps {
  fromOrTo: string;
  onSetDestination: (fromOrTo: string, destination: TDestQuery) => void;
  fromTo: IFromTo;
}
