const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const url = require("url");
const isDev = !app.isPackaged;

const Datastore = require("@seald-io/nedb");
const { rejects } = require("assert");

// Initialize NeDB with Persistent datastore with automatic loading
const db = new Datastore({
  filename: path.join(__dirname, "memoir.db"),
  autoload: true,
});
// try {
//   db.loadDatabaseAsync();
//   console.log(db.filename + " DB successfully loaded"); // loading has succeeded
// } catch (error) {
//   console.log(db.filename + " DB failed to load" + error); // loading has failed
// }

// Create the main window
let mainWindow;

async function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      enableRemoteModule: true,
      nodeIntegration: true,
      contextIsolation: true,
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

ipcMain.handle("create-document", async (event, documentData) => {
  return new Promise((resolv, reject) => {
    db.insert(documentData, (err, newDoc) => {
      if (err) reject(err);
      else resolve(newDoc);
    });
  });
});

ipcMain.handle("get-documents", async () => {
  return new Promise((resolv, reject) => {
    db.find({}, (err, docs) => {
      if (err) reject(err);
      else resolv(docs);
    });
  });
});

ipcMain.handle("update-document", async (event, id, updateData) => {
  return new Promise((resolv, reject) => {
    db.update({ _id: id }, { $set: updateData }, {}, (err, numReplaced) => {
      if (err) reject(err);
      else resolve(numReplaced);
    });
  });
});

ipcMain.handle("delete-document", async (event, id) => {
  return new Promise((resolve, reject) => {
    db.remove({ _id: id }, {}, (err, numRemoved) => {
      if (err) reject(err);
      else resolve(numRemoved);
    });
  });
});
