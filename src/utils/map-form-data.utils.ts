import {
  ISeatCategory,
  IFlightSeatsPost,
} from '@/interfaces/flightsSeats.interfaces';
import { ISeatForm, ISeatPost } from '@/interfaces/seat.interfaces';

type PartialISeatForm = Partial<ISeatForm>;
type PartialIFlightSeatsPost = Partial<IFlightSeatsPost>;

export const mapFormData = (
  data: PartialISeatForm & PartialIFlightSeatsPost
): Partial<ISeatPost & IFlightSeatsPost> => {
  const defaultFlightId = 55;

  const seatPostData: Partial<ISeatPost> = {
    aircraftId: Number(data.aircraftId || 0),
    category: data.category || ISeatCategory.ECONOM,
    id: data.id || 0,
    isLockedBack: data.isLockedBack || false,
    isNearEmergencyExit: data.isNearEmergencyExit || false,
    seatNumber: data.seatNumber || '',
  };

  const flightSeatsData: Partial<IFlightSeatsPost> = {
    id: data.id,
    aircraftId: data.aircraftId,
    seat: data.seat || {
      seatNumber: '',
      isSold: false,
      isRegistered: false,
      isBooked: false,
      flightId: defaultFlightId,
    },
    isSold: data.seat?.isSold || false,
    flightId: defaultFlightId,
    isRegistered: data.seat?.isRegistered || false,
  };

  return { ...seatPostData, ...flightSeatsData };
};
