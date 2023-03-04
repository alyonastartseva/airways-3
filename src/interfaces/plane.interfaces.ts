export interface IAirplane {
  id: number;
  aircraftNumber: number;
  model: string;
  modelYear: number;
  flightRange: number;
}

export interface IAirplanePost {
  aircraftNumber: number;
  model: string;
  modelYear: number;
  flightRange: number;
}
