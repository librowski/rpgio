import "./electronApi/electronApi";

import { app, BrowserWindow, session } from "electron";
import os from "node:os";
import path from "node:path";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
	app.quit();
}

export let mainWindow: BrowserWindow | null = null;
function createWindow() {
	mainWindow = new BrowserWindow({
		height: 600,
		webPreferences: {
			preload: path.join(__dirname, "preload.js"),
		},
		width: 800,
		frame: false,
	});

	// and load the index.html of the app.
	if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
		mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
	} else {
		mainWindow.loadFile(
			path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`),
		);
	}
}

app.on("ready", createWindow);
app.on("ready", async () => {
	const webAudioDevToolsPath = path.join(
		os.homedir(),
		"~/.config/google-chrome/Default/Extensions/cmhomipkklckpomafalojobppmmidlgl/3.0.9_0",
	);

	await session.defaultSession.loadExtension(webAudioDevToolsPath);
});

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});
