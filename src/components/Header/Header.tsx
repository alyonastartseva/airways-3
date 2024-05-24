import { Link, useLocation } from 'react-router-dom';
import { Box, Flex, Button, Spacer } from '@chakra-ui/react';

import { useAuth } from '@/hooks';
import { WebsiteLogo } from '@/common';
import { ELinks } from '@/services/constants/admin-router-links.constants';
import setParams from '@utils/set-params.utils';
import { UserHeader, AdminHeader } from '@/components';

const HEADER_LINKS = [
  { path: ELinks.AUTHORIZATION, name: 'Вход' },
  { path: ELinks.REGISTRATION, name: 'Регистрация' },
  { path: '/', name: 'На главную' },
];

const Header = () => {
  const { isAdmin: isLogged } = useAuth();
  // TODO заглушка для отображения контента для неавторизованного пользователя

  const { pathname } = useLocation();
  const isSignIn = pathname === ELinks.AUTHORIZATION;
  const { backgroundColor } = setParams('header', isLogged && !isSignIn);

  //Заглушка для авторизации пользователя

  return (
    <Box
      h="4.685rem"
      display="flex"
      bg={backgroundColor}
      boxShadow="0 1px 15px #A3A3A3"
      pr="1.5rem"
      pl="1.5rem"
      justifyContent="space-between"
      alignItems="center"
      position="relative"
      zIndex={10}
    >
      <WebsiteLogo isFooter={false} isLogged={isLogged && !isSignIn} />
      <Spacer />
      {!isLogged || isSignIn ? (
        <Flex gap="1rem" color="#006FFF" alignItems="center">
          {HEADER_LINKS.map(
            ({ path, name }) =>
              path !== pathname && (
                <Link key={path} to={path}>
                  <Button
                    color="#006EFF"
                    fontSize="15"
                    fontWeight="600"
                    _hover={{ bgColor: '#C2DCFF' }}
                    _active={{ bgColor: '#85BAFF' }}
                    _focus={{ outline: 'none' }}
                  >
                    {name}
                  </Button>
                </Link>
              )
          )}
        </Flex>
      ) : isLogged ? (
        <AdminHeader />
      ) : (
        <UserHeader />
      )}
    </Box>
  );
};
export default Header;
