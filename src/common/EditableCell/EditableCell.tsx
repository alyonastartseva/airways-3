import { useState } from 'react';
import { Input, Tooltip } from '@chakra-ui/react';

import { FlexCell } from '@/common';

import { IEditableCell } from './editableCell.interfaces';

const EditableCell = <K,>({
  value: initialValue,
  index,
  id,
  editableRowIndex,
  updateData,
  info,
  typeInput = 'text',
  fieldName,
  isDisabled = false,
}: IEditableCell<K>) => {
  const [value, setValue] = useState(initialValue);
  const [validationMessage, setValidationMessage] = useState('');

  const columnMeta: any = info?.column.columnDef.meta;

  const displayValidationMessage = <T extends HTMLInputElement>(
    e: React.ChangeEvent<T>
  ) => {
    if (!columnMeta?.validate) return;

    if (columnMeta.validate(e.target.value)) {
      setValidationMessage('');
    } else {
      setValidationMessage(columnMeta.validationMessage);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    displayValidationMessage(e);
    setValue(e.target.value);
  };

  const onBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    displayValidationMessage(e);
    if (value && !validationMessage) updateData(id, value.toString());
  };

  return index === editableRowIndex ? (
    <Tooltip label={validationMessage} placement="bottom-start">
      <Input
        type={typeInput}
        name={fieldName}
        value={String(value)}
        onBlur={onBlur}
        onChange={onChange}
        fontSize="0.87rem"
        border={validationMessage ? '2px solid red' : '1px solid  #242424'}
        disabled={isDisabled}
        _hover={{
          borderColor: '#398AEA',
        }}
        _active={{
          borderColor: '#398AEA',
        }}
      />
    </Tooltip>
  ) : (
    <FlexCell padding={16} value={String(value)} />
  );
};

export default EditableCell;
