import { EModalNames } from '@constants/modal-constants/modal-names';
import { IAircraftPost } from '@interfaces/aircraft.interfaces';
import { ISeatPost } from '@interfaces/seat.interfaces';

export interface IFormAirplanesProps {
  formName: EModalNames;
  onClose: () => void;
}

export type TFormAirplanesValues = IAircraftPost & {
  seats: Omit<ISeatPost, 'aircraftId'>[];
};
