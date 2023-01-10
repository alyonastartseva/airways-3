import "@/App.css";
import { additional, departure, Footer, ret } from "@components/Footer";

function App() {
  return <Footer departure={departure} return={ret} additional={additional} />;
}

export default App;
