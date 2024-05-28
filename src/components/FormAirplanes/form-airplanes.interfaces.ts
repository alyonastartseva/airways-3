import { EModalNames } from '@/constants';
import { IAircraftPost, ISeatPost } from '@/interfaces';

interface IFormAirplanesProps {
  formName: EModalNames;
  onClose: () => void;
}

type TFormAirplanesValues = IAircraftPost & {
  seats: Omit<ISeatPost, 'aircraftId'>[];
};

export type { IFormAirplanesProps, TFormAirplanesValues };
