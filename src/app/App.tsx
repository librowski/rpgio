import "./App.scss";
import { MainProvider } from "../providers/MainProvider";

import { Topbar } from "./Topbar/Topbar";
import { useAutosave } from "@/store/useAutosave";

function App() {
	useAutosave();

	return (
		<div className="flex flex-column max-w-screen max-h-screen w-screen h-screen overflow-hidden">
			<MainProvider>
				<Topbar />
			</MainProvider>
		</div>
	);
}

export default App;
