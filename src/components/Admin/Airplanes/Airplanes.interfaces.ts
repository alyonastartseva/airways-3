import { FieldValues } from 'react-hook-form';

export interface IAircraftPost extends FieldValues {
  aircraftNumber?: number;
  model?: string;
  modelYear?: number;
  flightRange?: number;
  seat?: number;
}
