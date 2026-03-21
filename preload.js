const { contextBridge } = require('electron');
const path = require('path');
const os   = require('os');

// Expose home dir so renderer can resolve ~/path
contextBridge.exposeInMainWorld('nativeEnv', {
  homeDir: os.homedir(),
});
