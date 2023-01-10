export interface Aircraft {
  aircraftNumber: string;
  flightRange: number;
  id: number;
  model: string;
  modelYear: number;
  seatSet: Seat[];
}

export interface Seat {
  aircraft: object;
  category: Category;
  id: number;
  isLockedBack: boolean;
  isNearEmergencyExit: boolean;
  seatNumber: string;
}

type CategoryType = "BUSINESS" | "ECONOMY" | "FIRST" | "PREMIUM_ECONOMY";

export interface Category {
  categoryType: CategoryType;
  id: number;
}

export interface Destination {
  airportCode: string;
  airportName: string;
  cityName: string;
  countryName: string;
  id: number;
  timezone: string;
}

type FlightStatus =
  | "ARRIVED"
  | "CANCELED"
  | "COMPLETED"
  | "DELAYED"
  | "DEPARTED"
  | "ON_TIME";

export interface Flight {
  aircraft: Aircraft;
  arrivalDateTime: string;
  code: string;
  departureDateTime: string;
  flightStatus: FlightStatus;
  from: Destination;
  id: number;
  to: Destination;
}
