import "./App.scss";
import { MainProvider } from "../providers/MainProvider";

import { Layout } from "./Layout";

function App() {
	return (
		<MainProvider>
			<Layout />
		</MainProvider>
	);
}

export default App;
