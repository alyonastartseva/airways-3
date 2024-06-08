import { ISeatForm, ISeatPost } from '@/interfaces/seat.interfaces';

export const mapSeatFormData = ({
  aircraftId,
  category,
  id,
  isLockedBack,
  isNearEmergencyExit,
  seatNumber,
}: ISeatForm): ISeatPost => {
  return {
    aircraftId: Number(aircraftId || 0),
    category: category || 'ECONOMY',
    id: id || 0,
    isLockedBack: isLockedBack || false,
    isNearEmergencyExit: isNearEmergencyExit || false,
    seatNumber: seatNumber || '',
  };
};
