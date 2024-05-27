import { UseFormRegister, FieldValues } from 'react-hook-form';
import { Input, FormLabel } from '@chakra-ui/react';

interface IUserInputRegProps {
  name: string;
  regValue: string;
  typeField?: string;
  register: UseFormRegister<FieldValues>;
}

const UserInput = ({
  name,
  regValue,
  register,
  typeField,
}: IUserInputRegProps) => {
  return (
    <>
      <FormLabel>{name}</FormLabel>
      <Input
        marginBottom={5}
        padding={6}
        type={typeField}
        placeholder={name}
        {...register(regValue, {
          required: 'This is required',
          minLength: {
            value: 3,
            message: 'Minimum length should be 4',
          },
          maxLength: {
            value: 20,
            message: 'Maximum length should be 20',
          },
        })}
      />
    </>
  );
};

export default UserInput;
