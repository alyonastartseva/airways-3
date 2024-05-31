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

export interface IFlightSeats {
  id: number;
  fare: number;
  isRegistered: boolean;
  isSold: boolean;
  isBooked: boolean;
  flightId: number;
  seat: ISeats;
}

export interface ISeats {
  id: number;
  seatNumber: string;
  isNearEmergencyExit: boolean;
  isLockedBack: boolean;
  category: ISeatCategory;
  aircraftId: number;
}

export interface IFlightSeatsPresentation {
  seat:
    | {
        id: number;
        seatNumber: string;
        aircraftId: number;
      }
    | undefined;
  id: number;
  fare: number;
  category: ISeatCategory;
  isSold: boolean;
  isRegistered: boolean;
  isBooked: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IFlightPost extends Omit<IFlightSeats, 'id'> {}

export interface IFlightPostFormFields
  extends FieldValues,
    Omit<IFlightPost, 'airportFrom' | 'airportTo'> {
  // Добавлены недостающие свойства
  seat: ISeats;
  price: number;
  isSold: boolean;
  isRegistered: boolean;
  isBooked: boolean;
}
