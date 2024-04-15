import { ChakraProvider } from '@chakra-ui/react';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import ruRU from 'antd/locale/ru_RU';
import { setDefaultOptions } from 'date-fns';
import ru from 'date-fns/locale/ru/index';

import { App } from '@components/App';
import { chakraTheme, antdTheme } from '@utils/theme.utils';

import { AuthProvider } from './context/AuthContext';

import './index.css';

setDefaultOptions({ locale: ru });
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <ChakraProvider theme={chakraTheme}>
      <ConfigProvider theme={antdTheme} locale={ruRU}>
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </QueryClientProvider>
        </AuthProvider>
      </ConfigProvider>
    </ChakraProvider>
  </StrictMode>
);
