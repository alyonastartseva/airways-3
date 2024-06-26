import { CellContext } from '@tanstack/react-table';

import { TypeInput } from '@/interfaces';

interface IEditableCell<T> {
  value: string | number | undefined;
  index: number;
  id: string;
  editableRowIndex: number | null;
  typeInput?: TypeInput;
  fieldName?: string;
  info?: CellContext<T, string | number | undefined>;
  isDisabled?: boolean;
  updateData(id: string, value: string): void;
}

export type { IEditableCell };
