import { IEditableCell } from '@/common/EditableCell/editableCell.interfaces';

export type InitialSelectValue = string | { categoryType: string };

export interface IEditableSelectCell<T> extends IEditableCell<T> {
  selectOptions: string[];
  getRenderValue(value: string | boolean | object): string;
}
