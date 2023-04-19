import { Navigate } from 'react-router-dom';

import { Flights } from '@/components/Admin/Flights';
import ELinks from '@/services/adminRouterLinks.service';

function FlightsPage() {
  if (!localStorage.getItem('adminToken')) {
    return <Navigate to={ELinks.ADMIN_LOGIN} />;
  }
  return <Flights />;
}

export default FlightsPage;
