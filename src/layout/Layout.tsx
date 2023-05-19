import { Outlet } from 'react-router-dom';

import { Footer } from '@components/Footer';
import { Header } from '@components/Header';
import { useAuth } from '@/hooks/useAuth';
import { AdminHeader } from '@/components/Admin/AdminHeader';
import { AdminFooter } from '@/components/Admin/AdminFooter';

const Layout = () => {
  const { isAdmin } = useAuth();

  return (
    <>
      {!isAdmin ? <Header /> : <AdminHeader />}
      <Outlet />
      {!isAdmin ? <Footer /> : <AdminFooter />}
    </>
  );
};
export default Layout;
