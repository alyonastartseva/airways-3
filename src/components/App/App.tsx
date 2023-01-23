import { QueryClient, QueryClientProvider } from 'react-query';
import { Route, Routes } from 'react-router-dom';

import { Footer } from '@components/Footer';
import { UsersPage } from '@pages/Admin/UsersPage';
import { RegisterPage } from '@pages/User/RegisterPage';

const queryClient = new QueryClient({});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<RegisterPage />} />
        <Route path="/admin" element={<UsersPage />} />
      </Routes>
      <Footer />
    </QueryClientProvider>
  );
};

export default App;
