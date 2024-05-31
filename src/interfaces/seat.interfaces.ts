import { FieldValues } from 'react-hook-form';

import { ISeat } from '@services/seat/seat.interfaces';

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
