import { FC } from 'react';
import { Box, Image, Text, Flex } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import headerLogo from '@assets/images/logo.png';

const AdminHeader: FC = () => {
  return (
    <Box bg="#04396D" width="full" p="2">
      <Flex justifyContent="space-between" alignItems="center">
        <Flex position="relative" alignItems="flex-end">
          <Image src={headerLogo} alt="" />
          <Text color="#fff" position="absolute" left="14" whiteSpace="nowrap">
            UX AIR
          </Text>
        </Flex>
        <Link to="/search">
          <Box bg="#fff" borderRadius="5" py="2" px="4">
            Главная страница
          </Box>
        </Link>
      </Flex>
    </Box>
  );
};

export default AdminHeader;
