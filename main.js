const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow;
const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      // activate nodeIntegration to require electron & ipc library
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadFile('index.html');

  // Handle search and redirection
  ipcMain.on('search', (event, searchValue) => {
    // Redirect to Google with the search term
    mainWindow.loadURL(
      `https://www.google.com/search?q=${encodeURIComponent(searchValue)}`
    );
  });
};

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
