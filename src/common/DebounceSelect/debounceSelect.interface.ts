import { SelectProps } from 'antd';

import { ISelectValue } from '@/common/ModalInput';

type TGetOptions = (query: { page: number; searchValue: string }) => Promise<{
  optionsPart: { key: number; label: string; value: string }[];
  last: boolean;
}>;

interface IDebounceSelectProps
  extends Omit<SelectProps<ISelectValue>, 'options' | 'children'> {
  debounceTimeout?: number;
  getOptions: TGetOptions;
}

export type { TGetOptions, IDebounceSelectProps };
