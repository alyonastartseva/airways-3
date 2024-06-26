import { EModalNames } from '@/constants';

interface IHeaderAdmin {
  heading: string;
  formName: EModalNames;
  select?: boolean;
  selectedValue?: string;
  handleSelectChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  initialFormValues?: Record<string, number | string | undefined>;
}

export type { IHeaderAdmin };
