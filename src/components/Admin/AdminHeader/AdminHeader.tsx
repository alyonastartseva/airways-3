import { FC } from 'react';
import { Box, Text, Flex } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import HeaderLogo from '@common/icons/Logo';

const AdminHeader: FC = () => {
  return (
    <Box bg="#04396D" width="full" p="2">
      <Flex justifyContent="space-between" alignItems="center">
        <Flex position="relative" alignItems="flex-end">
          <HeaderLogo />
          <Text color="#fff" position="absolute" left="16" whiteSpace="nowrap">
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
