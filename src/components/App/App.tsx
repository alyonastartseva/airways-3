import { QueryClient, QueryClientProvider } from 'react-query';
import { Route, Routes } from 'react-router-dom';

import { UsersPage } from '@pages/Admin/UsersPage';
import { RegisterPage } from '@pages/User/RegisterPage';
import { SearchPage } from '@pages/User/SearchPage';
import Layout from '@/layout/layout';
import { AirplanesPage } from '@/pages/Admin/AirplanesPage';
import { DestinationsPage } from '@/pages/Admin/DestinationsPage';

const queryClient = new QueryClient({});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<SearchPage />} />
          <Route path="searchService" element={<SearchPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="admin" element={<UsersPage />} />
          <Route path="admin/airplanes" element={<AirplanesPage />} />
          <Route path="admin/destinations" element={<DestinationsPage />} />
        </Route>
      </Routes>
    </QueryClientProvider>
  );
};

export default App;
