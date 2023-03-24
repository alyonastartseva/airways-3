import { QueryClient, QueryClientProvider } from 'react-query';
import { Route, Routes } from 'react-router-dom';

import { Layout } from '@/layout';
import { AdminLayout } from '@/layout/AdminLayout';
import { LoginAdminForm } from '@components/LoginAdminForm';
import { AirplanesPage } from '@pages/Admin/Airplane';
import { UsersPage } from '@pages/Admin/Users';
import { RegisterPage } from '@pages/User/RegisterPage';
import { SearchPage } from '@pages/User/SearchPage';
import { DestinationsPage } from '@pages/Admin/DestinationsPage';
import { PageNotFound } from '@common/PageNotFound';
import { PassengersPage } from '@pages/Passengers';

const queryClient = new QueryClient({});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<SearchPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="admin" element={<LoginAdminForm />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
        <Route element={<AdminLayout />}>
          <Route path="users" element={<UsersPage />} />
          <Route path="airplanes" element={<AirplanesPage />} />
          <Route path="passengers" element={<PassengersPage />} />
          <Route path="destinations" element={<DestinationsPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  );
};

export default App;
