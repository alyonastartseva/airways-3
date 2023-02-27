import { QueryClient, QueryClientProvider } from 'react-query';
import { Route, Routes } from 'react-router-dom';

import { Layout } from '@/layout';
import { LoginAdminForm } from '@components/LoginAdminForm';
import { AirplanesPage } from '@pages/Admin/Airplane';
import { UsersPage } from '@pages/Admin/Users';
import { RegisterPage } from '@pages/User/RegisterPage';
import { SearchPage } from '@pages/User/SearchPage';

const queryClient = new QueryClient({});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="search" element={<SearchPage />} />
          <Route path="searchService" element={<SearchPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
        <Route path="" element={<Layout />}>
          <Route path="/admin" element={<LoginAdminForm />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="airplanes" element={<AirplanesPage />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  );
};

export default App;
