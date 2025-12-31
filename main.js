const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  const isDev = process.argv.slice(2).some(arg => arg === '--serve');

  if (isDev) {
    win.loadURL('http://localhost:4200');
    win.webContents.openDevTools(); // Abre o debug em dev
  } else {
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/AngularWithElectron/browser/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }

  win.on('closed', () => {
    win = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});