import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./components/App";
import "./index.css";
import { ChakraProvider } from "@chakra-ui/react";
// import theme from "./common/theme/theme";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
