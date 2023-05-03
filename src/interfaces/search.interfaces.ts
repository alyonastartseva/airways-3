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
export interface Passenger {
  id: number;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  passport?: {
    middleName?: string;
    gender: string;
    serialNumberPassport: string;
    passportIssuingCountry: string;
    passportIssuingDate: string;
  };
  phoneNumber: string;
  birthDate: string;
}

export interface FormPassengersGet {
  content: Passenger[];
}

export interface FormPassengersPost {
  firstName?: string;
  lastName?: string;
  middleName?: string;
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
