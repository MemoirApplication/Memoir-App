const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const url = require("url");
const isDev = !app.isPackaged;

// app.disableHardwareAcceleration();

// Create the main window
let mainWindow;

async function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 1200,
    minHeight: 800,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      enableRemoteModule: true,
      nodeIntegration: true,
      // contextIsolation: false,
    },
  });

  if (isDev) {
    // In development, we'll use the Next.js dev server
    mainWindow.loadURL("http://localhost:3000");
    mainWindow.webContents.openDevTools(); // this will open browser dev tools
  } else {
    // In production, we'll load the built app
    const startUrl = url.format({
      pathname: path.join(__dirname, "./out/index.html"),
      protocol: "file:",
      slashes: true,
    });
    mainWindow.loadURL(startUrl);
  }

  mainWindow.on("closed", function () {
    mainWindow = null;
  });
}
app.on("ready", createWindow);

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", function () {
  if (mainWindow === null) createWindow();
});
