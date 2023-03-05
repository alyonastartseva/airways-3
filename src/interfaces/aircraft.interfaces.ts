export interface IAircraft {
  id: number;
  aircraftNumber: number;
  model: string;
  modelYear: number;
  flightRange: number;
}

export type IAircraftPost = {
  aircraftNumber: number;
  model: string;
  modelYear: number;
  flightRange: number;
};
