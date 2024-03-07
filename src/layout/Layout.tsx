import { Outlet } from 'react-router-dom';
import { Flex } from '@chakra-ui/react';

import { Footer } from '@components/Footer';
import { Header } from '@/components/Header';

const Layout = () => {
  return (
    <Flex
      flexDirection={'column'}
      justifyContent={'space-between'}
      overflow={'hidden'}
      minHeight={'100vh'}
    >
      {<Header />}
      <Outlet />
      {<Footer />}
    </Flex>
  );
};
export default Layout;
