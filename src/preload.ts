import { contextBridge, ipcRenderer } from "electron";
import type { Project } from "./store/Project";

contextBridge.exposeInMainWorld("electronApi", {
  loadProject() {
    return ipcRenderer.invoke("loadProject");
  },
  saveProject(project: Project) {
    return ipcRenderer.invoke("saveProject", project);
  },
});
