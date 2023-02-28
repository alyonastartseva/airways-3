import { QueryClient, QueryClientProvider } from 'react-query';
import { Route, Routes } from 'react-router-dom';

import { Layout } from '@/layout';
import { LoginAdminForm } from '@components/LoginAdminForm';
import { AirplanesPage } from '@pages/Admin/Airplane';
import { UsersPage } from '@pages/Admin/Users';
import { RegisterPage } from '@pages/User/RegisterPage';
import { SearchPage } from '@pages/User/SearchPage';
import { DestinationsPage } from '@pages/Admin/DestinationsPage';

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
        </Route>
        <Route path="/admin" element={<Layout />}>
          <Route index element={<LoginAdminForm />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="airplanes" element={<AirplanesPage />} />
          <Route path="destinations" element={<DestinationsPage />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  );
};

export default App;
