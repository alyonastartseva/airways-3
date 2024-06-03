import { FieldValues } from 'react-hook-form';

import { ISeat } from '@services/seat/seat.interfaces';

import { ISeatCategory } from './flightsSeats.interfaces';

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
