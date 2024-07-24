const { contextBridge, ipcRenderer } = require("electron");

// Here we expose some API from the Renderer process to the Main process.
contextBridge.exposeInMainWorld("electronAPI", {
  createDocument: (documentData) =>
    ipcRenderer.invoke("create-document", documentData),
  getDocuments: () => ipcRenderer.invoke("get-documents"),
  updateDocument: (id, updateData) =>
    ipcRenderer.invoke("update-document", id, updateData),
  deleteDocument: (id) => ipcRenderer.invoke("delete-document", id),
});

// Expose protected methods that allow the renderer process to use
window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const type of ["chrome", "node", "electron"]) {
    replaceText(`${type}-version`, process.versions[type]);
  }
});
