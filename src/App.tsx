import { QueryClient, QueryClientProvider } from "react-query";
import { ChakraProvider } from "@chakra-ui/react";
import "@/App.css";
import { Footer } from "@components/Footer";

const queryClient = new QueryClient();

function App() {
  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <Footer />
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default App;
