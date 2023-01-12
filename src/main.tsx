import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "@components/App";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { Footer } from "@components/Footer";
import { QueryClient, QueryClientProvider } from "react-query";
import theme from "@utils/theme";
import "@fontsource/open-sans/700.css";

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
