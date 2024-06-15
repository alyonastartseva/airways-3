import { FieldValues } from 'react-hook-form';

import { IGetQuery } from './api-interfaces';
import { ISeatCategory } from './flightsSeats.interfaces';

export type ISeat = IGetQuery<ISeatPost>;

export type ISeatCategoryType =
  | 'Первый класс'
  | 'Бизнес'
  | 'Эконом'
  | 'Премиум';

export interface ISeatPost {
  aircraftId: number;
  category: ISeatCategory;
  id: number;
  isLockedBack: boolean;
  isNearEmergencyExit: boolean;
  seatNumber: string;
}

export interface ISeatForm extends FieldValues {
  aircraftId?: number;
  category?: ISeatCategory;
  id?: number;
  isLockedBack?: boolean;
  isNearEmergencyExit?: boolean;
  seatNumber?: string;
}

export interface ISeatContent {
  content: ISeat[];
}
