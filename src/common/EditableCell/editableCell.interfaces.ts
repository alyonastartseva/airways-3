import { CellContext } from '@tanstack/react-table';

export interface IEditableCell<T> {
  value: string | number | undefined;
  index: number;
  id: string;
  editableRowIndex: number | null;
  fieldName?: string;
  info?: CellContext<T, string | number | undefined>;
  isDisabled?: boolean;
  updateData(id: string, value: string): void;
}
