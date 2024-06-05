import { FieldValues } from 'react-hook-form';

import { IGetQuery } from './api-interfaces';

export interface IAircraft {
  id: number;
  aircraftNumber: number;
  model: string;
  modelYear: number;
  flightRange: number;
}

export interface IAircraftPost extends FieldValues {
  id?: number;
  aircraftNumber?: number;
  model?: string;
  modelYear?: number;
  flightRange?: number;
}

export type IAircraftsGet = IGetQuery<IAircraft>;
