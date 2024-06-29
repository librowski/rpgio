import "./App.scss";
import { MainProvider } from "../providers/MainProvider";

import { Topbar } from "./Topbar/Topbar";

function App() {
	return (
		<div className="flex flex-column max-w-screen max-h-screen w-screen h-screen overflow-hidden">
			<MainProvider>
				<Topbar />
			</MainProvider>
		</div>
	);
}

export default App;
