import { Navigate } from 'react-router-dom';

import { Passengers } from '@components/Admin/Passengers';
import ELinks from '@/services/adminRouterLinks.service';

const PassengersPage = () => {
  if (!localStorage.getItem('adminToken')) {
    return <Navigate to={ELinks.ADMIN_LOGIN} />;
  }
  return <Passengers />;
};

export default PassengersPage;
