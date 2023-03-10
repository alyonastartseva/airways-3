import { ButtonGroup, Button } from '@chakra-ui/react';

import { IButtonGroupAdmin } from '@interfaces/table.interfaces';

const ButtonGroupAdmin = ({ cancelEditing, patchRow }: IButtonGroupAdmin) => (
  <ButtonGroup my={8}>
    <Button
      width="12rem"
      border="1px solid #DEDEDE"
      borderRadius="2"
      boxShadow="0px 5px 5px rgba(0, 0, 0, 0.06)"
      bgColor="#F9F9F9"
      fontSize="14px"
      _hover={{
        backgroundColor: '#398AEA',
        borderColor: '#398AEA',
        color: '#FFFFFF',
      }}
      onClick={cancelEditing}
    >
      Отменить
    </Button>
    <Button
      width="12rem"
      border="1px solid #DEDEDE"
      borderRadius="2"
      boxShadow="0px 5px 5px rgba(0, 0, 0, 0.06)"
      bgColor="#F9F9F9"
      fontSize="14px"
      _hover={{
        backgroundColor: '#398AEA',
        borderColor: '#398AEA',
        color: '#FFFFFF',
      }}
      onClick={patchRow}
    >
      Сохранить
    </Button>
  </ButtonGroup>
);

export default ButtonGroupAdmin;
