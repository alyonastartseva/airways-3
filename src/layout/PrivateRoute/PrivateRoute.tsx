import { Navigate, Outlet } from 'react-router-dom';

import { useAuth } from '@/hooks/useAuth';

const PrivateRoute = () => {
  const { isAdmin } = useAuth();
  return isAdmin ? <Outlet /> : <Navigate to="/admin" />;
};

export default PrivateRoute;
