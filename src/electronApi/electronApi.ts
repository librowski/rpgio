import { app, ipcMain } from "electron";
import { loadProject, saveProject } from "./projects";
import type { Project } from "@/store/Project";
import "./media";

app.whenReady().then(() => {
  ipcMain.handle("loadProject", async () => await loadProject());
  ipcMain.handle("saveProject", async (_event, project: Project) =>
    saveProject(project),
  );
});
