import { ISeatPost, ISeatForm } from '@/interfaces/seat.interfaces';

export const mapSeatFormData = (data: ISeatForm): ISeatPost => {
  const {
    aircraftId,
    category,
    id,
    isLockedBack,
    isNearEmergencyExit,
    seatNumber,
  } = data;

  const seatPostData: ISeatPost = {
    aircraftId: aircraftId || 0,
    category: {
      categoryType: category?.categoryType || 'ECONOMY',
    },
    id: id || 0,
    isLockedBack: isLockedBack || false,
    isNearEmergencyExit: isNearEmergencyExit || false,
    seatNumber: seatNumber || '',
  };

  return seatPostData;
};
