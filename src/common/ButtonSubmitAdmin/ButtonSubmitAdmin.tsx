import { Input } from '@chakra-ui/react';

const ButtonSubmitAdmin = () => (
  <Input
    border="1px solid #DEDEDE"
    borderRadius="2"
    boxShadow="0px 5px 5px rgba(0, 0, 0, 0.06)"
    bgColor="#F9F9F9"
    fontSize="14px"
    textAlign="center"
    type="submit"
    value="Сохранить"
    cursor="pointer"
    _hover={{
      backgroundColor: '#398AEA',
      borderColor: '#398AEA',
      color: '#FFFFFF',
    }}
  />
);

export default ButtonSubmitAdmin;
