import { FormLabel, Input, InputGroup,  Checkbox, InputLeftAddon, Select } from '@chakra-ui/react';
import {
  FieldValues,
  RegisterOptions,
  Path,
  useFormContext,
} from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

import { TypeInput } from '@interfaces/type-input.types';

export type FormInputProps<TFormValues extends FieldValues> = {
  children?: React.ReactNode;
  label: string;
  typeInput?: TypeInput;
  fieldName: Path<TFormValues>;
  rules?: RegisterOptions;
  select?: true;
  mask?: string;
  checkbox?: boolean;
  value?: number | string;
};

const ModalInput = <TFormValues extends Record<string, unknown>>({
  label,
  fieldName,
  rules,
  typeInput = 'text',
  select,
  children,
  mask,
  checkbox,
  value,
}: FormInputProps<TFormValues>): JSX.Element => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  if (typeInput === 'hidden') {
    return <Input
      type={typeInput}
      value={value}
      {...register(fieldName, rules)}
    />;
  }

  if (checkbox) {
    return <Checkbox 
              w="100%"
              mb={4}
              color="#393939"
              fontWeight="400"
              {...register(fieldName, rules)}
            >
              {label}
            </Checkbox>;
  }
  return (
    <>
      <FormLabel
        htmlFor={fieldName}
        fontSize={14}
        w="100%"
        mb={5}
        color="#393939"
        fontWeight="400"
      >
        {label}
        {!select ? (
          <InputGroup display="flex" alignItems="center" mt={2}
          mb={1}>
            {mask && <InputLeftAddon>
              {mask}
            </InputLeftAddon>}
            <Input
              type={typeInput}
              bgColor="#F9F9F9"
              border={`1px solid ${
                errors?.[fieldName]?.message ? '#F56565' : '#DEDEDE'
              }`}
              borderRadius={2}
              fontSize={14}
              color="#393939"
              aria-label="modal-input"
              {...register(fieldName, rules)}
            />
         </InputGroup>
        ) : (
          <Select
            bgColor="#F9F9F9"
            border={`1px solid ${
              errors?.[fieldName]?.message ? '#F56565' : '#DEDEDE'
            }`}
            borderRadius={2}
            fontSize={14}
            color="#393939"
            mt={2}
            mb={1}
            id={fieldName}
            {...register(fieldName, rules)}
          >
            {children}
          </Select>
        )}

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
