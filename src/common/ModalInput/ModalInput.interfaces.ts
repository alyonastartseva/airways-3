import { FieldValues, RegisterOptions, Path, PathValue } from 'react-hook-form';

import { TypeInput } from '@/interfaces';
import { TGetOptions } from '@common/DebounceSelect/debounceSelect.interface';

interface ISelectValue {
  label: string;
  value: PathValue<string, string>;
}

type FormInputProps<TFormValues extends FieldValues> = {
  children?: React.ReactNode;
  label: string;
  typeInput?: TypeInput;
  fieldName: Path<TFormValues>;
  rules?: RegisterOptions;
  type?: 'input' | 'select' | 'input-with-select';
  mask?: string;
  checkbox?: boolean;
  value?: number | string;
  getOptions?: TGetOptions;
};

export type { ISelectValue, FormInputProps };
