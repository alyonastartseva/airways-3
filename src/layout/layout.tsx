import { Outlet } from 'react-router-dom';

import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';

const Layout = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer
      // departure={departure}
      // return={ret}
      // additional={additional}
      />
    </>
  );
};
export default Layout;
