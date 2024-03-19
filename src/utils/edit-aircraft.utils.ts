import { ISeatForm } from '@/interfaces/seat.interfaces';

export const mapEditAircraftFormData = (formData: ISeatForm) => {
  const aircraftId = Number(formData.aircraftId);
  return { aircraftId, ...formData } as ISeatForm;
};
