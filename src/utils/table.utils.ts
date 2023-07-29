import { IsRowEditing, TTableData } from '@interfaces/table.interfaces';

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
    return row[id as keyof TTableData];
  } else {
    if (typeof value === 'object') return value.categoryType;
    else return String(value);
  }
};
