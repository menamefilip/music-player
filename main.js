const { app, BrowserWindow, screen } = require('electron');

function createWindow() {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize;

  const win = new BrowserWindow({
    width: 220,
    height: 340,
    x: width - 240,
    y: height - 360,
    frame: false,
    transparent: true,
    alwaysOnTop: true,
    resizable: false,
    skipTaskbar: false,
    hasShadow: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
    },
  });

  win.loadFile('index.html');
  // win.webContents.openDevTools({ mode: 'detach' }); // debug
}

app.whenReady().then(createWindow);
app.on('window-all-closed', () => app.quit());
