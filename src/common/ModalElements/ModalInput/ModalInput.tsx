import { FormLabel, Input, InputGroup, InputLeftAddon, Select } from '@chakra-ui/react';
import {
  FieldValues,
  RegisterOptions,
  Path,
  useFormContext,
} from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

export type FormInputProps<TFormValues extends FieldValues> = {
  children?: React.ReactNode;
  label: string;
  typeInput?: 'text' | 'number' | 'datetime-local' | 'date' | 'tel';
  fieldName: Path<TFormValues>;
  rules: RegisterOptions;
  select?: true;
  mask?: string;
};

const ModalInput = <TFormValues extends Record<string, unknown>>({
  label,
  fieldName,
  rules,
  typeInput = 'text',
  select,
  children,
  mask,
}: FormInputProps<TFormValues>): JSX.Element => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

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
