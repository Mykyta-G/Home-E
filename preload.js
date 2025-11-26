const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('api', {
  title: "Electron Vue App",
  // Add your APIs here
});

