import { useState } from 'react';
import { Select } from '@chakra-ui/react';

import { FlexCell } from '@common/FlexCell';
import {
  IEditableSelectCell,
  InitialSelectValue,
} from '@interfaces/table.interfaces';

const EditableSelectCell = <K,>({
  value: initialValue,
  index,
  id,
  editableRowIndex,
  updateData,
  getRenderValue,
  selectOptions,
}: IEditableSelectCell<K>) => {
  const initialValueObj = initialValue as InitialSelectValue;

  const editableInitial: string | number | undefined =
    typeof initialValueObj === 'object' &&
    initialValueObj &&
    'categoryType' in initialValueObj
      ? initialValueObj.categoryType
      : initialValueObj;

  const [value, setValue] = useState<string | number | undefined>(
    editableInitial
  );

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
  };

  const onBlur = () => {
    if (!value) return;
    updateData(id, value.toString());
  };

  return index === editableRowIndex ? (
    <Select
      value={String(value)}
      onChange={onChange}
      onBlur={onBlur}
      fontSize="0.87rem"
      border="1px solid #242424"
      _hover={{
        borderColor: '#398AEA',
      }}
      _active={{
        borderColor: '#398AEA',
      }}
    >
      {selectOptions.map((option) => (
        <option key={option} value={option}>
          {getRenderValue(option)}
        </option>
      ))}
    </Select>
  ) : (
    <FlexCell
      padding={16}
      value={
        value && typeof value === 'string'
          ? getRenderValue(value)
          : String(value)
      }
    />
  );
};

export default EditableSelectCell;
