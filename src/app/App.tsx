import { MainProvider } from "../providers/MainProvider";
import "./App.scss";
import { Layout } from "./Layout";

function App() {
  return (
    <MainProvider>
      <Layout />
    </MainProvider>
  );
}

export default App;
