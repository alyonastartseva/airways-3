import { EModalNames } from '@/constants/modal-constants/modal-names';

export interface IHeaderAdmin {
  heading: string;
  formName: EModalNames;
  select?: boolean;
  selectedValue?: string;
  handleSelectChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}
