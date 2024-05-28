import { Input, FormLabel } from '@chakra-ui/react';

import { IUserInputRegProps } from './UserInput.interfaces';

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
