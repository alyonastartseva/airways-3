import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import ruRU from 'antd/locale/ru_RU';
import { setDefaultOptions } from 'date-fns';
import ru from 'date-fns/locale/ru/index';

import { App } from '@components/App';

import { AuthProvider } from './context/AuthContext';

import './index.css';

const theme = extendTheme({
  fonts: {
    heading: 'Roboto, sans-serif',
    body: 'Roboto, sans-serif',
  },
  components: {
    Modal: {
      baseStyle: () => ({
        dialog: { borderRadius: 0 },
      }),
    },
  },
});

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <ChakraProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </QueryClientProvider>
      </AuthProvider>
    </ChakraProvider>
  </StrictMode>
);
