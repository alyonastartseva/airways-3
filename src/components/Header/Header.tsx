import { Box, Flex, Button, Spacer } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { ELinks } from '@services/constants';
import { WebsiteLogo } from '@common/WebsiteLogo';
import { useAuth } from '@/hooks';
import UserHeader from '@/components/User/UserHeader/UserHeader';
import { AdminHeader } from '@/components/Admin/AdminHeader';
import setHeaderParams from '@utils/set-header-params.utils';

const Header = () => {
  const { isAdmin: isLogged } = useAuth();
  // TODO заглушка для отображения контента для неавторизованного пользователя
  const { pathname } = window.location;
  const isSignIn = pathname === ELinks.AUTHORIZATION;
  const { backgroundColor } = setHeaderParams(isLogged && !isSignIn);

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
          {isSignIn ? (
            <Link to={ELinks.REGISTRATION}>
              <Button
                fontSize="15"
                fontWeight="600"
                border="1px solid #CBD5E0"
                color="#006FFF"
                bg="white"
                _hover={{ bg: '#F2F3F6' }}
                _active={{ bg: '#85BAFF' }}
                _focus={{ outline: 'none' }}
              >
                Регистрация
              </Button>
            </Link>
          ) : (
            <Link to={ELinks.AUTHORIZATION}>
              <Button
                fontSize="15"
                fontWeight="600"
                border="1px solid #CBD5E0"
                color="#006FFF"
                bg="white"
                _hover={{ bg: '#F2F3F6' }}
                _active={{ bg: '#85BAFF' }}
                _focus={{ outline: 'none' }}
              >
                Вход
              </Button>
            </Link>
          )}

          <Link to="/">
            <Button
              fontSize="15"
              fontWeight="600"
              border="1px solid #CBD5E0"
              color="#006FFF"
              bg="white"
              _hover={{ bg: '#F2F3F6' }}
              _active={{ bg: '#85BAFF' }}
              _focus={{ outline: 'none' }}
            >
              На главную
            </Button>
          </Link>
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
