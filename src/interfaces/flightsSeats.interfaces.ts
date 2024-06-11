import { FieldValues } from 'react-hook-form';

import { ISort } from '@interfaces/api-interfaces';

import { ISeatPost } from './seat.interfaces';

export enum ISeatCategory {
  BUSINESS = 'BUSINESS',
  PREMIUM_ECONOMY = 'PREMIUM_ECONOMY',
  FIRST = 'FIRST',
  ECONOM = 'ECONOMY',
}

export type ISeatCategoryType =
  | 'Первый класс'
  | 'Бизнес'
  | 'Эконом'
  | 'Премиум';

export interface IFSQuery {
  content: IFSOne[];
  pageable?: string;
  totalElements: number;
  totalPages: number;
  last: boolean;
  sort?: ISort;
  first: boolean;
  numberOfElements: number;
  size: number;
  number: number;
  empty: boolean;
}

// одно месте
export interface IFSOne {
  seat: IFSoneSeat | undefined;
  id: number;
  fare: number;
  isRegistered: boolean;
  isSold: boolean;
  isBooked: boolean;
}
// о кресле
export interface IFSoneSeat {
  id: number;
  seatNumber: string;
  aircraftId: number;
  category: ISeatCategory;
}

export interface IFSForm extends IFSOne, FieldValues {
  code: string;
  flightId: number;
}

export interface IFlightSeatBase {
  fare?: number;
  isRegistered?: boolean;
  isSold?: boolean;
  isBooked?: boolean;
  flightId?: number;
  seat?: ISeatPost;
}

export interface IFlightSeats extends IFlightSeatBase {
  id: number;
  seat: ISeatPost;
}

export type TFormFlightSeats = IFlightSeatBase & FieldValues;

export interface IFlightSeatsPost extends FieldValues {
  id: number;
  aircraftId: number;
  seat: {
    seatNumber: string;
    isSold: boolean;
    isRegistered: boolean;
    isBooked: boolean;
    flightId: number;
  };
  isSold: boolean;
  flightId: number | string;
  isRegistered: boolean;
}
