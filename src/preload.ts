import { contextBridge, ipcRenderer } from "electron";
import type { Project } from "./store/Project";
import type { OpenFileDialogOptions } from "./electronApi/files";

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
});
