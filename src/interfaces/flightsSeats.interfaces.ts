import { FieldValues } from 'react-hook-form';

import { ISort } from '@interfaces/api-interfaces';

import { ISeatPost } from './seat.interfaces';

// import { IDestination } from '@interfaces/destination.interfaces';
// import { IAircraft } from '@interfaces/aircraft.interfaces';

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

// export interface IFlightSeats {
//   id: number;
//   fare: number;
//   isRegistered: boolean;
//   isSold: boolean;
//   isBooked: boolean;
//   seat: ISeats;
// }

// export interface ISeats {
//   id: number;
//   seatNumber: string;
//   isNearEmergencyExit: boolean;
//   isLockedBack: boolean;
//   category: ISeatCategory;
//   aircraftId: number;
// }

// export interface IFlightSeatsPresentation {
//   seat:
//     | {
//         id: number;
//         seatNumber: string;
//         aircraftId: number;
//       }
//     | undefined;
//   id: number;
//   fare: number;
//   category: ISeatCategory;
//   isSold: boolean;
//   isRegistered: boolean;
//   isBooked: boolean;
// }

// // eslint-disable-next-line @typescript-eslint/no-empty-interface
// export interface IFlightSeatsPost
//   extends Omit<IFlightSeatsPresentation, 'id'> {}

// export interface IFlightSeatsPostFormFields
//   extends FieldValues,
//     Omit<IFlightSeatsPost, 'airportFrom' | 'airportTo'> {
//   code: number;
//   seat: ISeats;
//   price: number;
//   isSold: boolean;
//   isRegistered: boolean;
//   isBooked: boolean;
// }

// для всех интерфейсов Flight Seats будет использовано сокращение FS тобишь все интерфейсы и типы будут названы IFL
// ответ от сервера
export interface IFSQuery {
  content: IFSOne[];
  pageable: string;
  totalElements: number;
  totalPages: number;
  last: boolean;
  sort: ISort;
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

// Зачем? ниже копия
// вроде бы форма для отправки и её поля
export interface IFSpostField extends IFSOne {
  code: string;
  flightId: number;
  seat: IFSoneSeat;
}

export interface IFSForm extends IFSOne, FieldValues {
  code: string;
  flightId: number;
}

/////////////

export interface IFlightSeatBase {
  fare?: number;
  isRegistered?: boolean;
  isSold?: boolean;
  isBooked?: boolean;
  flightId?: number;
}

export interface IFlightSeats extends IFlightSeatBase {
  id: number;
  seat: ISeatPost;
}

export type TFormFlightSeats = IFlightSeatBase & FieldValues;

export interface IFlightSeatsPost extends IFlightSeatBase, FieldValues {
  id?: number;
  seat?: ISeatPost;
}
