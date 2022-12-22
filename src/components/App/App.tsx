import { Header } from "../Header";
import { SignIn } from "../SingIn";
import { UsersPage } from "../../pages/Admin/UsersPage";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "react-query";
const queryClient = new QueryClient({});
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UsersPage />
    </QueryClientProvider>
  );
}

export default App;
