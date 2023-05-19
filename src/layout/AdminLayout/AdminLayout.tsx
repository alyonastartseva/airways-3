import { Navigate, Outlet } from 'react-router-dom';
import { Flex } from '@chakra-ui/react';

import { AdminFooter } from '@components/Admin/AdminFooter';
import { AdminHeader } from '@components/Admin/AdminHeader';
import { useAuth } from '@/hooks/useAuth';
import ELinks from '@/services/adminRouterLinks.service';

const AdminLayout = () => {
  const { isAdmin } = useAuth();

  return isAdmin ? (
    <Flex flexDirection="column" justifyContent="space-between">
      <AdminHeader />
      <Outlet />
      <AdminFooter />
    </Flex>
  ) : (
    <Navigate to={ELinks.ADMIN_LOGIN} />
  );
};

export default AdminLayout;
