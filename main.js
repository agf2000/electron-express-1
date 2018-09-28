const electron = require('electron');
const {
    app,
    BrowserWindow,
    Menu,
    Tray
} = electron;

let mainWindow = null;

app.on('ready', function () {
    'use strict';

    let path = require('path');
    let iconPath = path.join(__dirname, 'build/icon.ico');
    const appIcon = new Tray(iconPath);
    mainWindow = new BrowserWindow({
        title: "SGI Sincronizador",
        // x: 0,
        // y: 10,
        // autoHideMenuBar: true,
        // minimizable: false,
        width: 800,
        height: 620,
        resizable: false,
        icon: path.join(__dirname, 'build/icon.ico')
    });
    appIcon.setToolTip('My Cool App');
    mainWindow.loadURL('http://localhost:3000/');

    // remove this for production
    let template = [{
        label: 'View',
        submenu: [{
                label: 'Reload',
                accelerator: 'CmdOrCtrl+R',
                click: function (item, focusedWindow) {
                    if (focusedWindow) {
                        focusedWindow.reload();
                    }
                }
            },
            {
                label: 'Toggle Full Screen',
                accelerator: (function () {
                    if (process.platform === 'darwin') {
                        return 'Ctrl+Command+F';
                    } else {
                        return 'F11';
                    }
                })(),
                click: function (item, focusedWindow) {
                    if (focusedWindow) {
                        focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
                    }
                }
            },
            {
                label: 'Toggle Developer Tools',
                accelerator: (function () {
                    if (process.platform === 'darwin') {
                        return 'Alt+Command+I';
                    } else {
                        return 'Ctrl+Shift+I';
                    }
                })(),
                click: function (item, focusedWindow) {
                    if (focusedWindow) {
                        focusedWindow.toggleDevTools();
                    }
                }
            },
        ]
    }];

    var menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);

    mainWindow.focus();
});

// shut down all parts to app after windows all closed.
app.on('window-all-closed', function () {
    'use strict';
    app.quit();
});