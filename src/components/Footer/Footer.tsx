import { Box, Flex, Link, Spacer } from '@chakra-ui/react';
import { Link as routerLink } from 'react-router-dom';

import { WebsiteLogo } from '@common/WebsiteLogo';
import { useAuth } from '@/hooks/useAuth';

const Footer = () => {
  const { isAdmin: isLogged } = useAuth();

  const hoverStyles = {
    color: 'white',
    opacity: '0.8',
    textDecoration: 'underline',
  };
  return (
    <Box
      h="80px"
      display="flex"
      bg="#445EBD"
      pr="30px"
      pl="30px"
      justifyContent="space-between"
      alignItems="center"
    >
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
      <Spacer />
      <WebsiteLogo isFooter={true} isLogged={isLogged} />
    </Box>
  );
};

export default Footer;
