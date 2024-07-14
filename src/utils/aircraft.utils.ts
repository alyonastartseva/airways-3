import { ISeatCategory } from '@/interfaces/flightsSeats.interfaces';
import { ISeatForm, ISeatPost } from '@/interfaces/seat.interfaces';

export const convertSeatFormToPostData = ({
  aircraftId,
  category,
  id,
  isLockedBack,
  isNearEmergencyExit,
  seatNumber,
}: ISeatForm): ISeatPost => {
  return {
    aircraftId: Number(aircraftId || 0),
    category: category || ISeatCategory.ECONOM,
    id: id || 0,
    isLockedBack: isLockedBack || false,
    isNearEmergencyExit: isNearEmergencyExit || false,
    seatNumber: seatNumber || '',
  };
};
