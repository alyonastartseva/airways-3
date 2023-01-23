import { Box, FormLabel, Input, Text } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

interface IInputFieldProps {
  name: string;
  label: string;
  typeField?: string;
}

function InputField({ name, label, typeField = '' }: IInputFieldProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Box width="100%">
      <FormLabel
        color="#716f6f"
        htmlFor={name}
        fontWeight="400"
        fontSize="0.8rem"
        margin={0}
      >
        {label}
      </FormLabel>
      <Input
        border="1px solid #D9D9D9"
        boxShadow="0px 2px 2px rgba(0, 0, 0, 0.25)"
        borderRadius="4px"
        id={name}
        type={typeField}
        aria-label={name}
        {...register(name)}
      />
      {errors?.[name] && (
        <Text color="#E32E22" fontWeight="400" fontSize="1rem">
          {errors?.[name]?.message as unknown as string}
        </Text>
      )}
    </Box>
  );
}

export default InputField;
