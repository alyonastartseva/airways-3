import { FC } from 'react';
import { Box, Text, Flex, Button, Spacer } from '@chakra-ui/react';
import { Link, NavLink, useNavigate } from 'react-router-dom';

import HeaderLogo from '@common/icons/Logo';
import ELinks from '@services/adminRouterLinks.service';
import { useAuth } from '@/hooks/useAuth';

const AdminHeader: FC = () => {
  const { setIsAdmin } = useAuth();
  const navigate = useNavigate();
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
    <Box bg="#04396D" width="full" p="2">
      <Flex justifyContent="space-between" alignItems="center">
        <Flex position="relative" alignItems="flex-end">
          <HeaderLogo />
          <Text color="#fff" position="absolute" left="16" whiteSpace="nowrap">
            UX AIR
          </Text>
        </Flex>
        <Flex
          ml="4.25rem"
          gap="1.875rem"
          color="white"
          alignItems="center"
          h="100%"
        >
          <NavLink to={ELinks.ADMIN_PASSENGERS} style={checkActive}>
            Пассажиры
          </NavLink>
          <NavLink to={ELinks.ADMIN_AIRPLANES} style={checkActive}>
            Самолёты
          </NavLink>
          <NavLink to={ELinks.ADMIN_DESTINATIONS} style={checkActive}>
            Места назначения
          </NavLink>
          <NavLink to="hours" style={checkActive}>
            Часовые пояса
          </NavLink>
          <NavLink to="flights" style={checkActive}>
            Рейсы
          </NavLink>
        </Flex>
        <Spacer />
        <Link to="/search">
          <Button onClick={handleClick} bg="#fff" borderRadius="5" mr="1.25rem">
            Выход
          </Button>
        </Link>
      </Flex>
    </Box>
  );
};

export default AdminHeader;
