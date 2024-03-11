import { Box, Flex, Button, Spacer } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import {ELinks} from '@services/constants';
import { WebsiteLogo } from '@common/WebsiteLogo';
import { useAuth } from '@/hooks';
import UserHeader from '@/components/User/UserHeader/UserHeader';
import { AdminHeader } from '@/components/Admin/AdminHeader';
import setHeaderParams from '@utils/set-header-params.utils';

const Header = () => {
  const { isAdmin: isLogged } = useAuth();
  const { backgroundColor } = setHeaderParams(isLogged);

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
      <WebsiteLogo isFooter={false} isLogged={isLogged} />
      <Spacer />
      {!isLogged ? (
        <Flex gap="1rem" color="#006FFF" alignItems="center">
          <Link to={ELinks.ADMIN_LOGIN} >
            <Button
              display="none"
              fontSize="15"
              fontWeight="600"
              _hover={{ bgColor: '#C2DCFF' }}
              _active={{ bgColor: '#85BAFF' }}
              _focus={{ outline: 'none' }}
            >
              Вход
            </Button>
          </Link>
          <Link to="/search">
            <Button
              fontSize="15"
              fontWeight="600"
              _hover={{ bgColor: '#C2DCFF' }}
              _active={{ bgColor: '#85BAFF' }}
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
