import type { OpenDialogOptions } from "electron";
import { app, ipcMain } from "electron";
import { loadProject, saveProject } from "./projects";
import type { Project } from "@/store/Project";
import "./media";
import { openFileDialog } from "./files/openFileDialog";

app.whenReady().then(() => {
	ipcMain.handle("loadProject", async () => await loadProject());
	ipcMain.handle("saveProject", async (_event, project: Project) =>
		saveProject(project),
	);
	ipcMain.handle("openFileDialog", (_event, options: OpenDialogOptions) =>
		openFileDialog(options),
	);
});
