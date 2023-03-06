import { Outlet } from 'react-router-dom';
import { Flex } from '@chakra-ui/react';

import { AdminFooter } from '@components/Admin/AdminFooter';
import { AdminHeader } from '@components/Admin/AdminHeader';

function AdminLayout() {
  return (
    <Flex flexDirection="column" justifyContent="space-between">
      <AdminHeader />
      <Outlet />
      <AdminFooter />
    </Flex>
  );
}

export default AdminLayout;
