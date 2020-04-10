const { installDevtools } = require('./installDevtools');
const { windowOptions } = require('./windowOptions');
const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', function () {
    if (mainWindow === null) {
        createWindow();
    }
});

app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required');

app.applicationMenu = null;

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow(windowOptions);

    const startUrl =
        process.env.ELECTRON_START_URL ||
        url.format({
            pathname: path.join(__dirname, '../../build/index.html'),
            protocol: 'file:',
            slashes: true,
        });

    mainWindow.loadURL(startUrl);
    mainWindow.on('closed', () => (mainWindow = null));
    mainWindow.webContents.openDevTools();

    if ('--with-devtools' in process.execArgv) {
        installDevtools();
    }
}
