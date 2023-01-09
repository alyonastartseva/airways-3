import { QueryClient, QueryClientProvider } from "react-query";
import { ChakraProvider } from "@chakra-ui/react";
import "@/App.css";
import { additional, departure, Footer, ret } from "@components/Footer";

const queryClient = new QueryClient();

function App() {
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <Footer
          departure={departure}
          return={ret}
          // additional={additional}
        />
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
