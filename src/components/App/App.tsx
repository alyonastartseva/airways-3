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

const queryClient = new QueryClient({});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<SearchPage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="admin" element={<UsersPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<LoginAdminForm />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="airplanes" element={<AirplanesPage />} />
          <Route path="destinations" element={<DestinationsPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  );
};

export default App;
