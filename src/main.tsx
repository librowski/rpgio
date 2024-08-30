import React from "react";
import ReactDOM from "react-dom/client";
import { log } from "./utils/log";

import App from "./app/App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);

window.electronApi.addLogListener(log);
