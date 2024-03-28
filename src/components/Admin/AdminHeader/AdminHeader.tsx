import { FC } from 'react';
import { Flex, Button, Spacer, Text, Box } from '@chakra-ui/react';
import { NavLink, useNavigate } from 'react-router-dom';

import { ELinks } from '@services/constants';
import { useAuth } from '@/hooks';
import setHeaderParams from '@utils/set-header-params.utils';
import { PhoneNumber } from '@common/PhoneNumber';
import { ExitIcon } from '@/common/icons';

const AdminHeader: FC = () => {
  const { isAdmin: isLogged, setIsAdmin } = useAuth();
  const navigate = useNavigate();

  const { color, backgroundColor, buttonBackgroundColor, buttonColor, hover } =
    setHeaderParams(isLogged);

  const tabs = [
    {
      tabName: 'Пассажиры',
      tabPath: ELinks.ADMIN_PASSENGERS,
    },
    {
      tabName: 'Самолёты',
      tabPath: ELinks.ADMIN_AIRPLANES,
    },
    {
      tabName: 'Места назначения',
      tabPath: ELinks.ADMIN_DESTINATIONS,
    },
    {
      tabName: 'Часовые пояса',
      tabPath: ELinks.ADMIN_HOURS,
    },
    {
      tabName: 'Рейсы',
      tabPath: ELinks.ADMIN_FLIGHTS,
    },
    {
      tabName: 'Билеты',
      tabPath: ELinks.ADMIN_TICKETS,
    },
    {
      tabName: 'Бронирование',
      tabPath: ELinks.ADMIN_BOOKING,
    },
  ];

  const activeStyle = {
    textDecoration: 'underline',
    textDecorationThickness: '0.25rem',
    textDecorationColor: '#4797ff',
    textUnderlineOffset: '1.775rem',
  };
  // проверяем активность ссылки, если активна, добавляем стили выше для активной кнопки
  const checkActive = ({ isActive }: { isActive: boolean }) =>
    isActive ? activeStyle : undefined;

  // удаление токена авторизации при нажатии на кнопку выхода
  const handleClick = () => {
    localStorage.removeItem('adminToken');
    setIsAdmin(false);
    navigate('/', { replace: true });
  };

  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      gap="3rem"
      color={color}
      data-testid="adminHeader"
      fontWeight="semibold"
      fontSize="0.875rem"
    >
      {tabs.map((tab) => {
        return (
          <NavLink key={tab.tabPath} to={tab.tabPath} style={checkActive}>
            {tab.tabName}
          </NavLink>
        );
      })}
      <Spacer w="3.5rem" />

      <PhoneNumber />
      <Button
        w="6.25rem"
        h="2rem"
        display="none"
        bg={buttonBackgroundColor}
        borderRadius="5"
        alignSelf="right"
        color={buttonColor}
        _hover={{
          backgroundColor: { backgroundColor },
          border: { hover },
        }}
        _active={{
          backgroundColor: { color },
          border: { hover },
        }}
        mr="1.25rem"
        onClick={handleClick}
      >
        <Flex justifyContent="space-between" alignItems="center" gap="0.725rem">
          <Text fontSize="0.875rem">Выход</Text>
          <Box position="relative" top="1px">
            <ExitIcon w={4} h={5} />
          </Box>
        </Flex>
      </Button>
    </Flex>
  );
};

export default AdminHeader;
