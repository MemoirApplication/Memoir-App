const { app, BrowserWindow } = require("electron");
const path = require("path");
const url = require("url");
const isDev = !app.isPackaged;

const Datastore = require("@seald-io/nedb");

// Initialize NeDB with Persistent datastore with automatic loading
const db = new Datastore({ filename: "notes.db", autoload: true });
try {
  await db.loadDatabaseAsync();
} catch (error) {
  // loading has failed
}
// loading has succeeded

// Create the main window
let mainWindow;

async function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  if (isDev) {
    // In development, we'll use the Next.js dev server
    await mainWindow.loadURL("http://localhost:3000");
    mainWindow.webContents.openDevTools();
  } else {
    // In production, we'll load the built app
    const startUrl = url.format({
      pathname: path.join(__dirname, "./out/index.html"),
      protocol: "file:",
      slashes: true,
    });
    await mainWindow.loadURL(startUrl);
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
