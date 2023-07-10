import { FC } from 'react';
import { Flex, Button, Spacer } from '@chakra-ui/react';
import { NavLink, useNavigate } from 'react-router-dom';

import ELinks from '@services/admin-router-links.service';
import { useAuth } from '@/hooks/useAuth';
import setHeaderParams from '@utils/set-header-params.utils';
import { PhoneNumber } from '@common/PhoneNumber';

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
  ];

  const activeStyle = {
    textDecoration: 'underline',
    textDecorationThickness: '0.25rem',
    textDecorationColor: '#4797ff',
    textUnderlineOffset: '1.875rem',
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
    >
      {tabs.map((tab) => {
        return (
          <NavLink key={tab.tabPath} to={tab.tabPath} style={checkActive}>
            {tab.tabName}
          </NavLink>
        );
      })}
      <Spacer />

      <PhoneNumber />
      <Button
        onClick={handleClick}
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
      >
        Выход
      </Button>
    </Flex>
  );
};

export default AdminHeader;
