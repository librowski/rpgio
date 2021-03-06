/* eslint-disable @typescript-eslint/no-var-requires */
const { installDevtools } = require('./installDevtools');
const { windowOptions } = require('./windowOptions');
const { isDev } = require('../../development/modeCheck');
const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

let mainWindow;

const createWindow = () => {
    mainWindow = new BrowserWindow(windowOptions);

    const startUrl =
        process.env.ELECTRON_START_URL ||
        url.format({
            pathname: path.join(__dirname, '../../build/index.html'),
            protocol: 'file:',
            slashes: true,
        });

    mainWindow.loadURL(startUrl);
    mainWindow.once('ready-to-show', () => mainWindow.show());
    mainWindow.on('closed', () => (mainWindow = null));

    if (isDev()) {
        mainWindow.webContents.openDevTools();
        installDevtools();
    }
};

// App userData and listeners

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

