import { UsersPage } from "@pages/Admin/UsersPage";
import { RegisterPage } from "@pages/User/RegisterPage";
import { QueryClient, QueryClientProvider } from "react-query";
import { Routes, Route } from "react-router-dom";
import { additional, departure, Footer, ret } from "@components/Footer";

const queryClient = new QueryClient({});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<RegisterPage />} />
        <Route path="/admin" element={<UsersPage />} />
      </Routes>
      <Footer
        departure={departure}
        return={ret}
        // additional={additional}
      />
    </QueryClientProvider>
  );
}

export default App;
