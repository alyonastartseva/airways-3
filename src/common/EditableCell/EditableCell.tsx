import { useState } from 'react';
import { Input } from '@chakra-ui/react';

import { FlexCell } from '@common/FlexCell';
import { IEditableCell } from '@interfaces/table.interfaces';

const EditableCell = ({
  value: initialValue,
  index,
  id,
  editableRowIndex,
  updateData,
}: IEditableCell) => {
  const [value, setValue] = useState(initialValue);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onBlur = () => {
    if (value) updateData(id, value.toString());
  };

  return index === editableRowIndex ? (
    <Input
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
    />
  ) : (
    <FlexCell padding={16} value={value} />
  );
};

export default EditableCell;
