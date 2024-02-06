import { FieldValues } from 'react-hook-form';

import { IGetQuery } from './api-interfaces';

export type TSeatCategory =
  | 'BUSINESS'
  | 'ECONOMY'
  | 'FIRST'
  | 'PREMIUM_ECONOMY';

export interface ISeatPost {
  aircraftId: number;
  category: TSeatCategory;
  id: number;
  isLockedBack: boolean;
  isNearEmergencyExit: boolean;
  seatNumber: string;
}

export type ISeat = IGetQuery<ISeatPost>;

export interface ISeatForm extends FieldValues {
  aircraftId?: number;
  category?: TSeatCategory;
  id?: number;
  isLockedBack?: boolean;
  isNearEmergencyExit?: boolean;
  seatNumber?: string;
}

export interface ISeatContent {
  content: ISeat[];
}
