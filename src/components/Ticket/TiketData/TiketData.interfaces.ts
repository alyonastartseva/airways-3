export interface TiketDataProps {
  flights: {
    flights: {
      totalPrice: number;
      dataTo: {
        airportFrom: string;
        airportTo: string;
        cityFrom: string;
        cityTo: string;
        departureDateTime: string;
        arrivalDateTime: string;
        flightTime: string;
        flightSeatId: number;
      };
      dataBack: {
        airportFrom: string;
        airportTo: string;
        cityFrom: string;
        cityTo: string;
        departureDateTime: string;
        arrivalDateTime: string;
        flightTime: string;
        flightSeatId: number;
      };
    }[];
    search: {
      from: string;
      to: string;
      departureDate: string;
      returnDate: string;
      numberOfPassengers: number;
      categoryOfSeats: string;
    };
  };
}
