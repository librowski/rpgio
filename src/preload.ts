import { contextBridge, ipcRenderer } from "electron";
import type { Project } from "./store/Project";
import type { OpenFileDialogOptions } from "./electronApi/files/openFileDialog";
import type { LogOptions } from "./utils/log";

contextBridge.exposeInMainWorld("electronApi", {
	loadProject() {
		return ipcRenderer.invoke("loadProject");
	},
	saveProject(project: Project) {
		return ipcRenderer.invoke("saveProject", project);
	},
	openFileDialog(options: OpenFileDialogOptions) {
		return ipcRenderer.invoke("openFileDialog", options);
	},
	addLogListener(listener: (options: LogOptions) => void) {
		return ipcRenderer.on("log", (_event, options: LogOptions) => {
			listener(options);
		});
	},
});

contextBridge.exposeInMainWorld("env", process.env.NODE_ENV);
