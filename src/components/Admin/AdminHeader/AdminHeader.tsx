import { FC } from 'react';
import { Box, Text, Flex, Button, Spacer } from '@chakra-ui/react';
import { Link, NavLink } from 'react-router-dom';

import HeaderLogo from '@common/icons/Logo';

const AdminHeader: FC = () => {
  const activeStyle = {
    textDecoration: 'underline',
    textDecorationThickness: '0.25rem',
    textUnderlineOffset: '1.875rem',
  };
  const checkActive = ({ isActive }: { isActive: boolean }) =>
    isActive ? activeStyle : undefined;

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
          ml="11.25rem"
          gap="1.875rem"
          color="white"
          alignItems="center"
          position="absolute"
          h="100%"
        >
          <NavLink to="passengers" style={checkActive}>
            Пассажиры
          </NavLink>
          <NavLink to="airplanes" style={checkActive}>
            Самолёты
          </NavLink>
          <NavLink to="destinations" style={checkActive}>
            Место назначения
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
          <Button bg="#fff" borderRadius="5" mr="1.25rem">
            Выход!
          </Button>
        </Link>
      </Flex>
    </Box>
  );
};

export default AdminHeader;
