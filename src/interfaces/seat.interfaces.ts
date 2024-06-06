import { FieldValues } from 'react-hook-form';

import { ISeat } from '@services/seat/seat.interfaces';

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
