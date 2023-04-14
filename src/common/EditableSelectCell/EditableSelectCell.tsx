import { useState } from 'react';
import { Select } from '@chakra-ui/react';

import { FlexCell } from '@common/FlexCell';
import { IEditableSelectCell } from '@interfaces/table.interfaces';

const EditableSelectCell = ({
  value: initialValue,
  index,
  id,
  editableRowIndex,
  updateData,
  getRenderValue,
  selectOptions,
}: IEditableSelectCell) => {
  const [value, setValue] = useState(initialValue);

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
  };

  const onBlur = () => {
    if (value) updateData(id, value.toString());
  };

  return index === editableRowIndex ? (
    <Select
      value={value}
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
      value={value && typeof value === 'string' ? getRenderValue(value) : value}
    />
  );
};

export default EditableSelectCell;
