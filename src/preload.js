// Expose protected methods that allow the renderer process to use
window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const type of ["firefox", "node", "electron"]) {
    replaceText(`${type}-version`, process.versions[type]);
  }
});
