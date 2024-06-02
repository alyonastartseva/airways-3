import { FieldValues } from 'react-hook-form';

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

export interface IFlightSeats {
  id: number;
  fare: number;
  isRegistered: boolean;
  isSold: boolean;
  isBooked: boolean;
  seat: IFlightOneSeat | undefined;
}

export interface IFlightSeatsPresentation {
  seat: IFlightOneSeat | undefined;
  id: number;
  fare: number;
  category: ISeatCategory;
  isSold: boolean;
  isRegistered: boolean;
  isBooked: boolean;
}

export interface IFlightOneSeat {
  id: number;
  seatNumber: string;
  aircraftId: number;
  category: ISeatCategory;
}

export interface IFlightSeatPostField
  extends FieldValues,
    IFlightSeatsPresentation {
  code: string;
  flightId: number;
  seat: IFlightOneSeat;
}
