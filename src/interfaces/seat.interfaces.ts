import { FieldValues } from 'react-hook-form';

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

export type ISeat = ISeatPost;

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
