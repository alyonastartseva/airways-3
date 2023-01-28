import { QueryClient, QueryClientProvider } from 'react-query';
import { Route, Routes } from 'react-router-dom';

import { Footer } from '@components/Footer';
import { UsersPage } from '@/pages/Admin/UsersPage';
import { AirplanesPage } from '@/pages/Admin/AirplanesPage';
import { RegisterPage } from '@/pages/User/RegisterPage';
import { getToken } from '@services/axios';

const queryClient = new QueryClient({});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<RegisterPage />} />
        <Route path="/admin" element={<UsersPage />} />
        <Route path="/admin/airplanes" element={<AirplanesPage />} />
      </Routes>
      <Footer />
    </QueryClientProvider>
  );
};

export default App;
