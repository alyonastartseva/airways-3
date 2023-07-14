import { FieldValues } from 'react-hook-form';

export interface IAircraft {
  id: number;
  aircraftNumber: number;
  model: string;
  modelYear: number;
  flightRange: number;
}

export interface IAircraftsGet {
  content: IAircraft[];
  totalPages: number;
  totalElements: number;
}

export interface IAircraftPost extends FieldValues {
  aircraftNumber?: number;
  model?: string;
  modelYear?: number;
  flightRange?: number;
}
