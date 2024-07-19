import { IFlightSeatsPost } from '@/interfaces/flightsSeats.interfaces';

export const mapFlightSeatFormData = ({
  id,
  aircraftId,
  seat,
}: IFlightSeatsPost): IFlightSeatsPost => {
  // в отправке стоят заглушки ибо с бэка приходит 371 место
  const flightId = 55;
  return {
    id,
    aircraftId,
    seat,
    isSold: seat.isSold,
    flightId: flightId,
    isRegistered: seat.isRegistered,
  };
};
