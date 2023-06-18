import { Box, Flex, Button, Spacer } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import ELinks from '@services/admin-router-links.service';
import { WebsiteLogo } from '@common/WebsiteLogo';
import { useAuth } from '@/hooks/useAuth';
import UserHeader from '@/components/User/UserHeader/UserHeader';
import { AdminHeader } from '@/components/Admin/AdminHeader';

const Header = () => {
  const { isAdmin } = useAuth();

  //Заглушка для авторизации пользователя
  const isLogged = isAdmin;

  return (
    <Box
      h="80px"
      display="flex"
      bg="#445EBD"
      pr="25px"
      pl="25px"
      justifyContent="space-between"
      alignItems="center"
    >
      <WebsiteLogo isFooter={false} />
      <Spacer />
      {!isLogged ? (
        <Flex gap="1rem" color="#006FFF" alignItems="center">
          <Link to={ELinks.ADMIN_LOGIN}>
            <Button
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
      ) : isAdmin ? (
        <AdminHeader />
      ) : (
        <UserHeader />
      )}
    </Box>
  );
};
export default Header;
