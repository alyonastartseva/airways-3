import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '@/hooks';

const PrivateRoute = () => {
  const { isAdmin } = useAuth();
  return isAdmin ? <Outlet /> : <Navigate to="/admin" />;
};

export default PrivateRoute;
