import { truncate } from "./truncate";

export function log(options: LogOptions) {
	const { message, _fromElectron } = options;

	if (!globalThis.window) {
		const { BrowserWindow } = require("electron");
		const mainWindow = BrowserWindow.getFocusedWindow();
		mainWindow?.webContents.send("log", { ...options, _fromElectron: true });
		return;
	}

	if (window.env !== "development") {
		return;
	}

	const text =
		typeof message === "string"
			? message
			: prettifyJson(stringifyObject(message));

	const header = _fromElectron ? ELECTRON_HEADER : FRONTEND_HEADER;
	const headerBackground = _fromElectron ? "#359146" : "#355691";

	console.log(
		`${header} ${text}`,
		`font-weight: bold; color: #ffffff; background: ${headerBackground}; padding: 4px 0px; border-radius: 4px; font-family: monospace;`,
	);
}

const ELECTRON_HEADER = "%c RPGIO (ELECTRON) \x1b[39;49m\n";
const FRONTEND_HEADER = "%c RPGIO \x1b[39;49m\n";

export type LogOptions = {
	message: string | object;
	_fromElectron?: boolean;
};

function stringifyObject(value: object) {
	return JSON.stringify(
		value,
		(_key, value) => (typeof value === "string" ? truncate(value, 20) : value),
		4,
	);
}

function prettifyJson(jsonString: string) {
	return jsonString
		.replace(/(")(.*?)(")(?=:)/g, "\x1b[240;1m$2\x1b[0m") // Keys
		.replace(/"([^\\"]|\\.)*?"/g, "\x1b[37;3m$&\x1b[0m") // Strings
		.replace(/\b(true|false)\b/g, "\x1b[35;1m$1\x1b[0m") // Booleans
		.replace(/\b(null)\b/g, "\x1b[240m$1\x1b[0m") // Null
		.replace(/(:) (\d+)(?=,?)/g, "\x1b[36m$&\x1b[0m"); // Numbers
}
