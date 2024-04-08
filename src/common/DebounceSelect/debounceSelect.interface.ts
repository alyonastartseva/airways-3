import { SelectProps } from 'antd';

import { ISelectValue } from '../ModalElements/ModalInput/ModalInput';

export type TGetOptions = (query: {
  page: number;
  searchValue: string;
}) => Promise<{
  optionsPart: { key: number; label: string; value: string }[];
  last: boolean;
}>;

export interface IDebounceSelectProps
  extends Omit<SelectProps<ISelectValue>, 'options' | 'children'> {
  debounceTimeout?: number;
  getOptions: TGetOptions;
}
