import { dialog, app, ipcMain } from "electron";
import { readFileSync } from "node:fs";

app.whenReady().then(() => {
  ipcMain.handle("openFile", handleFileOpen);
});

function handleFileOpen() {
  const path = "/home/jl/Downloads/gospel-choir-heavenly-transition-3-186880.mp3"
  const buffer = readFileSync(path);
  return buffer;
}
