import { ReactElement } from 'react';
import { useFormContext } from 'react-hook-form';
import { Box, FormLabel, Select, Text } from '@chakra-ui/react';

interface ISelectFieldProps {
  name: string;
  label: string;
  options: ReactElement[];
}

function SelectField({ name, label, options }: ISelectFieldProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <Box position="relative" width="100%">
      <FormLabel
        display="inline-block"
        position="absolute"
        left="5px"
        top="5px"
        color="#0A66C2"
        fontWeight="400"
        fontSize="0.6rem"
        htmlFor={name}
      >
        {label}
      </FormLabel>
      <Select
        data-testid="select"
        border="1px solid #D9D9D9"
        boxShadow="0px 2px 2px rgba(0, 0, 0, 0.25)"
        borderRadius="4px"
        textAlign="center"
        id={name}
        aria-label={name}
        {...register(name)}
      >
        {options}
      </Select>
      {errors?.[name] && (
        <Text color="#E32E22" fontWeight="400" fontSize="1rem">
          {errors?.[name]?.message as unknown as string}
        </Text>
      )}
    </Box>
  );
}

export default SelectField;
