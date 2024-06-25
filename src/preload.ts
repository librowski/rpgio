// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronApi", {
  startSoundStream: () => ipcRenderer.send("startSoundStream"),
  onChunkProcessed: (callback: any) =>
    ipcRenderer.on("onChunkProcessed", (_event, value) => callback(value)),
});
