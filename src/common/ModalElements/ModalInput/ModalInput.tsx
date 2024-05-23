import { useState } from 'react';
import {
  FieldValues,
  RegisterOptions,
  Path,
  useFormContext,
  PathValue,
} from 'react-hook-form';
import {
  FormLabel,
  Input,
  InputGroup,
  Checkbox,
  InputLeftAddon,
  Select,
} from '@chakra-ui/react';
import { ErrorMessage } from '@hookform/error-message';

import { TypeInput } from '@interfaces/type-input.types';
import { DebounceSelect } from '@/common';
import { TGetOptions } from '@common/DebounceSelect/debounceSelect.interface';

export interface ISelectValue {
  label: string;
  value: PathValue<string, string>;
}

export type FormInputProps<TFormValues extends FieldValues> = {
  children?: React.ReactNode;
  label: string;
  typeInput?: TypeInput;
  fieldName: Path<TFormValues>;
  rules?: RegisterOptions;
  type?: 'input' | 'select' | 'input-with-select';
  mask?: string;
  checkbox?: boolean;
  value?: number | string;
  getOptions?: TGetOptions;
};

const ModalInput = <TFormValues extends Record<string, unknown>>({
  label,
  fieldName,
  rules,
  typeInput = 'text',
  type = 'input',
  children,
  mask,
  checkbox,
  value,
  getOptions,
}: FormInputProps<TFormValues>): JSX.Element => {
  const {
    register,
    formState: { errors },
    setValue,
    clearErrors,
  } = useFormContext();

  const [selectValue, setSelectValue] = useState<ISelectValue>();

  const onChange = (newSelectValue: ISelectValue) => {
    setValue(fieldName, newSelectValue.value);
    clearErrors(fieldName);
    setSelectValue(newSelectValue);
  };

  if (typeInput === 'hidden') {
    return (
      <Input type={typeInput} value={value} {...register(fieldName, rules)} />
    );
  }

  if (checkbox) {
    return (
      <Checkbox
        w="100%"
        mb={4}
        color="#393939"
        fontWeight="400"
        {...register(fieldName, rules)}
      >
        {label}
      </Checkbox>
    );
  }

  const defaultProps = {
    bgColor: '#F9F9F9',
    border: `1px solid ${errors?.[fieldName]?.message ? '#F56565' : '#DEDEDE'}`,
    borderRadius: 2,
    fontSize: 14,
    fontStyle: 'italic',
    color: '#393939',
    ...register(fieldName, rules),
  };

  const componentFor = {
    input: (
      <InputGroup display="flex" alignItems="center" mt={2} mb={1}>
        {mask && <InputLeftAddon>{mask}</InputLeftAddon>}
        <Input type={typeInput} aria-label="modal-input" {...defaultProps} />
      </InputGroup>
    ),
    select: (
      <Select mt={2} mb={1} id={fieldName} {...defaultProps}>
        {children}
      </Select>
    ),
    'input-with-select': getOptions && (
      <DebounceSelect
        getOptions={getOptions}
        status={errors?.[fieldName]?.message && 'error'}
        value={selectValue}
        onChange={onChange}
      />
    ),
  };

  return (
    <>
      <FormLabel
        htmlFor={fieldName}
        fontSize={14}
        fontStyle="italic"
        w="100%"
        mb={5}
        color="#393939"
        fontWeight="400"
      >
        {label}
        {componentFor[type]}

        <ErrorMessage
          errors={errors}
          name={fieldName}
          render={({ message }) => (
            <p style={{ color: '#F56565' }}>{message}</p>
          )}
        />
      </FormLabel>
    </>
  );
};

export default ModalInput;
