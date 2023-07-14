import { ChakraProvider } from '@chakra-ui/react';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';

import { App } from '@components/App';
import theme from '@utils/theme.utils';

import { AuthProvider } from './context/AuthContext';

import './index.css';

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
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
