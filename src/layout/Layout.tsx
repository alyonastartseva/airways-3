import { Outlet } from 'react-router-dom';

import { Footer } from '@components/Footer';
import { useAuth } from '@/hooks/useAuth';
import { AdminHeader } from '@/components/Admin/AdminHeader';
import { AdminFooter } from '@/components/Admin/AdminFooter';
import { UserHeader } from '@/components/User/UserHeader';

const Layout = () => {
  const { isAdmin } = useAuth();

  return (
    <>
      {!isAdmin ? <UserHeader /> : <AdminHeader />}
      <Outlet />
      {!isAdmin ? <Footer /> : <AdminFooter />}
    </>
  );
};
export default Layout;
