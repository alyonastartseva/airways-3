import { Button } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

import { IButtonAddAdmin } from './buttonAddAdmin.interfaces';

const ButtonAddAdmin = ({ name, onClick }: IButtonAddAdmin) => (
  <Button
    border="1px solid #DEDEDE"
    borderRadius="2"
    boxShadow="0px 5px 5px rgba(0, 0, 0, 0.06)"
    bgColor="#F9F9F9"
    fontSize="14px"
    rightIcon={<AddIcon boxSize="3" />}
    _hover={{
      backgroundColor: '#398AEA',
      borderColor: '#398AEA',
      color: '#FFFFFF',
    }}
    onClick={onClick}
    minWidth="15rem"
  >
    {name}
  </Button>
);

export default ButtonAddAdmin;
