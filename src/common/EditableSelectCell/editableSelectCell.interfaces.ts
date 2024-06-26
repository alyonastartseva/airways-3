import { IEditableCell } from '@common/EditableCell';

type InitialSelectValue = string | { categoryType: string };

interface IEditableSelectCell<T> extends IEditableCell<T> {
  selectOptions: string[] | React.ReactElement;
  getRenderValue(value: string | boolean | object): string;
}

export type { InitialSelectValue, IEditableSelectCell };
