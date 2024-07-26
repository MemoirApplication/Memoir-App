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

try {
  db.loadDatabaseAsync();
  console.log(db.filename + " DB successfully loaded"); // loading has succeeded
} catch (error) {
  console.log(db.filename + " DB failed to load" + error); // loading has failed
}

app.disableHardwareAcceleration();

// Create the main window
let mainWindow;

async function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      // enableRemoteModule: true,
      nodeIntegration: true,
      contextIsolation: false,
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

// Listen for IPC messages from the renderer process
ipcMain.handle("create-document", async (event, documentData) => {
  try {
    if (!documentData) {
      throw new Error("documentData cannot be null or undefined");
    }

    const newDoc = await db.insertAsync(documentData);

    if (!newDoc) {
      throw new Error("Failed to create document");
    }

    return newDoc;
  } catch (err) {
    throw new Error(`Failed to create document: ${err}`);
  }
});

ipcMain.handle("get-documents", async () => {
  try {
    const documents = await db.findAsync({});
    if (!documents) {
      throw new Error("Failed to get documents");
    }
    return documents;
  } catch (error) {
    throw new Error(`Failed to get documents: ${error}`);
  }
});

ipcMain.handle("update-document", async (event, id, updateData) => {
  if (!id) {
    throw new Error("id cannot be null or undefined");
  }
  try {
    const numReplaced = await db.updateAsync(
      { _id: id },
      { $set: updateData },
      { returnUpdatedDocs: true }
    );

    if (!numReplaced) {
      throw new Error("Failed to update document");
    }

    return numReplaced;
  } catch (error) {
    console.error("Failed to update document:", error);
    throw new Error(`Failed to update document: ${error}`);
  }
});

ipcMain.handle("delete-document", async (event, id) => {
  if (!id) {
    throw new Error("id cannot be null or undefined");
  }
  try {
    const numRemoved = await db.removeAsync({ _id: id });
    if (numRemoved === null || numRemoved === undefined) {
      throw new Error("Failed to delete document");
    }
    if (numRemoved === 0) {
      throw new Error("Document not found");
    }
    return numRemoved;
  } catch (error) {
    console.error("Failed to delete document:", error);
  }
});
