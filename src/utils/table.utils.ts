import { TPerson } from '@interfaces/person.interfaces';
import { IDestination } from '@/interfaces/destination.interfaces';
import { IAircraft } from '@interfaces/aircraft.interfaces';

export type TTableData = TPerson | IDestination | IAircraft;

export interface IsRowEditing<Data> {
  (
    index: number,
    id: string,
    value: string | { categoryType: string } | undefined,
    row: Data | null,
    editableIndex: number | null
  ): string | number | undefined;
}

export const isRowEditing: IsRowEditing<TTableData> = (
  index,
  id,
  value,
  row,
  editableIndex
) => {
  if (row && editableIndex !== null && editableIndex === index) {
    if (id.indexOf('_') !== -1) {
      const key1 = id.slice(0, id.indexOf('_'));
      const key2 = id.slice(id.indexOf('_') + 1);
      const nestedObject = row[key1 as keyof typeof row];

      if (nestedObject && typeof nestedObject === 'object') {
        return nestedObject[key2 as keyof typeof nestedObject];
      }
    }
    const returnValue = row[id as keyof TTableData];
    return returnValue ? returnValue : '';
  } else {
    return value ? String(value) : '';
  }
};
