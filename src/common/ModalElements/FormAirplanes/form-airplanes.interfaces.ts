import { EModalNames } from '@/constants';
import { IAircraftPost, ISeatPost } from '@/interfaces';

export interface IFormAirplanesProps {
  formName: EModalNames;
  onClose: () => void;
}

export type TFormAirplanesValues = IAircraftPost & {
  seats: Omit<ISeatPost, 'aircraftId'>[];
};
