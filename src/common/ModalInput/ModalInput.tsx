import { FormLabel, Input, Select, Text } from '@chakra-ui/react';
import {
  UseFormRegister,
  FieldValues,
  RegisterOptions,
  Path,
} from 'react-hook-form';

// provide your FormValues interface which you are using in useForm<FormValue> with your form fields.
export type FormInputProps<TFormValues extends FieldValues> = {
  children?: React.ReactNode;
  label: string;
  typeInput?: 'text' | 'number' | 'datetime-local' | 'date' | 'tel';
  fieldName: Path<TFormValues>;
  errorMessage?: string;
  rules: RegisterOptions;
  register: UseFormRegister<TFormValues>;
  select?: true;
};

const ModalInput = <TFormValues extends Record<string, unknown>>({
  label,
  register,
  fieldName,
  rules,
  errorMessage,
  typeInput = 'text',
  select,
  children,
}: FormInputProps<TFormValues>): JSX.Element => {
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
          <Input
            type={typeInput}
            bgColor="#F9F9F9"
            border={`1px solid ${errorMessage ? '#F56565' : '#DEDEDE'}`}
            borderRadius={2}
            fontSize={14}
            color="#393939"
            mt={2}
            mb={1}
            {...register(fieldName, rules)}
          />
        ) : (
          <Select
            bgColor="#F9F9F9"
            border={`1px solid ${errorMessage ? '#F56565' : '#DEDEDE'}`}
            borderRadius={2}
            fontSize={14}
            color="#393939"
            mt={2}
            mb={1}
            id={fieldName}
            {...register(fieldName)}
          >
            {children}
          </Select>
        )}
        {errorMessage && (
          <Text color="#F56565" role="alert">
            {errorMessage}
          </Text>
        )}
      </FormLabel>
    </>
  );
};

export default ModalInput;
