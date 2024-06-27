import { ButtonGroup, Button } from '@chakra-ui/react';

import { useTheme } from '@context/:ThemeProvider';

import { IButtonGroupAdmin } from './buttonGroupAdmin.interfaces';

const ButtonGroupAdmin = ({ cancelEditing, patchRow }: IButtonGroupAdmin) => {
  const { theme } = useTheme();

  return (
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
        bgColor={theme === 'dark' ? '#2D3748' : '#F9F9F9'}
        color={theme === 'dark' ? '#FFFFFF' : '#000000'}
        fontSize="14px"
        _hover={{
          backgroundColor: theme === 'dark' ? '#4A5568' : '#398AEA',
          borderColor: theme === 'dark' ? '#4A5568' : '#398AEA',
          color: '#FFFFFF',
        }}
        onClick={patchRow}
      >
        Сохранить
      </Button>
    </ButtonGroup>
  );
};

export default ButtonGroupAdmin;
