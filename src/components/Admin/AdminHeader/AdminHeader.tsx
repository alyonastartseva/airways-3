import { FC } from 'react';
import { Flex, Button } from '@chakra-ui/react';
import { NavLink, useNavigate } from 'react-router-dom';

import ELinks from '@services/admin-router-links.service';
import { useAuth } from '@/hooks/useAuth';

const AdminHeader: FC = () => {
  const { setIsAdmin } = useAuth();
  const navigate = useNavigate();

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
    }
  ];

  const activeStyle = {
    textDecoration: 'underline',
    textDecorationThickness: '0.25rem',
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
      gap="1.2rem"
      color="white"
      data-testid="adminHeader"
    >
      {tabs.map(tab => {
        return (<NavLink key={tab.tabPath} to={tab.tabPath} style={checkActive}>
        {tab.tabName}
      </NavLink>);
      })}
      <Button
        onClick={handleClick}
        bg="#fff"
        borderRadius="5"
        color="black"
        mr="1.25rem"
      >
        Выход
      </Button>
    </Flex>
  );
};

export default AdminHeader;
