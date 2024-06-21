export interface IFlightTest {
  airportFrom: string;
  airportTo: string;
  cityFrom: string;
  cityTo: string;
  departureDateTime: string;
  arrivalDateTime: string;
  flightTime: string;
  flightSeatId: number;
}

export interface ISearch {
  from: string;
  to: string;
  departureDate: string;
  returnDate: string;
  numberOfPassengers: number;
  categoryOfSeats: string;
}
export interface TiketDataProps {
  flights: {
    flights: {
      totalPrice: number;
      dataTo: IFlightTest;
      dataBack: IFlightTest;
    }[];
    search: ISearch;
  };
}

export interface ITicketFlightProps {
  totalPrice: number;
  dataTo: IFlightTest;
  dataBack: IFlightTest;
}
