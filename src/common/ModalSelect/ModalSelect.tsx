import { ReactNode } from 'react';
import { FormLabel, Select, Text } from '@chakra-ui/react';
import {
  UseFormRegister,
  FieldValues,
  RegisterOptions,
  Path,
} from 'react-hook-form';

// provide your FormValues interface which you are using in useForm<FormValue> with your form fields.
export type FormSelectProps<TFormValues extends FieldValues> = {
  label: string;
  children: ReactNode;
  fieldName: Path<TFormValues>;
  errorMessage?: string;
  rules: RegisterOptions;
  register: UseFormRegister<TFormValues>;
};

const ModalSelect = <TFormValues extends Record<string, unknown>>({
  label,
  register,
  fieldName,
  rules,
  errorMessage,
  children,
}: FormSelectProps<TFormValues>): JSX.Element => {
  return (
    <>
      <FormLabel fontSize={14} w="100%" mb={5} color="#393939" fontWeight="400">
        {label}
        <Select
          bgColor="#F9F9F9"
          border={`1px solid ${errorMessage ? '#F56565' : '#DEDEDE'}`}
          borderRadius={2}
          fontSize={14}
          color="#393939"
          mt={2}
          mb={1}
          {...register(fieldName, rules)}
        >
          {children}
        </Select>
        {errorMessage && (
          <Text color="#F56565" role="alert">
            {errorMessage}
          </Text>
        )}
      </FormLabel>
    </>
  );
};

export default ModalSelect;
