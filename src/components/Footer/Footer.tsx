import { Box, Flex, Link, Spacer } from '@chakra-ui/react';
import { Link as routerLink } from 'react-router-dom';

import { WebsiteLogo } from '@common/WebsiteLogo';
import { useAuth } from '@/hooks';
import { ELinks } from '@services/constants';

const Footer = () => {
  const { isAdmin: isLogged } = useAuth();
  // TODO заглушка для отображения контента для неавторизованного пользователя
  const { pathname } = window.location;
  const isSignIn = pathname === ELinks.AUTHORIZATION;

  const hoverStyles = {
    color: 'white',
    opacity: '0.8',
    textDecoration: 'underline',
  };
  return (
    <Box
      h="80px"
      display="flex"
      bg={isLogged && !isSignIn ? '#F5F5F5' : '#445EBD'}
      pr="30px"
      pl="30px"
      borderTopColor={'#C2C2C2'}
      borderTopWidth={1}
      justifyContent="space-between"
      alignItems="center"
    >
      {isLogged && !isSignIn ? (
        <Flex gap="1rem" color="#141414" fontSize="0.9rem" alignItems="center">
          <Link as={routerLink} _hover={hoverStyles} to="/">
            Air Alien © 2023
          </Link>
        </Flex>
      ) : (
        <Flex gap="1rem" color="white" fontSize="0.9rem" alignItems="center">
          <Link as={routerLink} _hover={hoverStyles} to="/">
            О нас
          </Link>
          <Link as={routerLink} _hover={hoverStyles} to="/">
            Политика конфиденциальности
          </Link>
          <Link as={routerLink} _hover={hoverStyles} to="/">
            Связаться с нами
          </Link>
        </Flex>
      )}
      <Spacer />
      <WebsiteLogo isFooter={true} isLogged={isLogged && !isSignIn} />
    </Box>
  );
};

export default Footer;
