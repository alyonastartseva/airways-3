import { IsRowEditing, TTableData } from '@interfaces/table.interfaces';

export const isRowEditing: IsRowEditing<TTableData> = (
  index,
  id,
  value,
  row,
  editableIndex
) => {
  return row && editableIndex !== null && editableIndex === index
    ? row[id as keyof TTableData]
    : value;
};
