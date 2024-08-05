import { ChakraProvider } from '@chakra-ui/react';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import './utils/dayjsConfig';

import { App } from '@components/App';

import { AuthProvider } from './context/AuthContext';
import { chakraTheme } from './theme.utils';
import { store } from './store';

import './index.css';

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <ChakraProvider theme={chakraTheme}>
      <AuthProvider>
        <ReduxProvider store={store}>
          <QueryClientProvider client={queryClient}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </QueryClientProvider>
        </ReduxProvider>
      </AuthProvider>
    </ChakraProvider>
  </StrictMode>
);
