const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const Menu = electron.Menu;
const MenuItem = electron.MenuItem;

const path = require('path');
const url = require('url');

let mainWindow = null;

const menu = new Menu();
menu.append(new MenuItem({label: 'Hello'}));
menu.append(new MenuItem({type: 'separator'}));
menu.append(new MenuItem({label: 'Electron', type: 'checkbox', checked: true}));

app.on('ready', createWindow);

app.on('browser-window-created', (event, win) => {
  win.webContents.on('context-menu', (e, params) => {
    menu.popup(win, params.x, params.y);
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

function createWindow() {
  const menuTemplate = getMenuTemplate();
  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);

  mainWindow = new BrowserWindow({width: 800, height: 600});

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file',
    slashes: true
  }));

  mainWindow.webContents.openDevTools();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

function getMenuTemplate() {
  let template = [{
    label: '編集',
    submenu: [{
      label: 'やり直し',
      accelerator: 'Shift+CmdOrCtrl+Z',
      role: 'redo'
    }, {
      type: 'separator'
    }, {
      label: 'コピー',
      accelerator: 'CmdOrCtrl+C',
      role: 'copy'
    }]
  }, {
    label: '表示',
    submenu: [{
      label: '全画面表示を切り替える',
      accelerator: (() => {
        if (process.platform === 'darwin') {
          return 'Ctrl+Command+F'
        } else {
          return 'F11'
        }
      })(),
      click: (item, focusedWindow) => {
        if (focusedWindow) {
          focusedWindow.setFullScreen(!focusedWindow.isFullScreen())
        }
      }
    }]
  }];

  if (process.platform === 'darwin') {
    const name = app.getName();
    template.unshift({
      label: name,
      submenu: [{
        label: `About ${name}`,
        role: 'about'
      }, {
        label: 'Quit',
        accelerator: 'Command+Q',
        click: (() => {
          app.quit();
        })
      }]
    })
  }

  return template;
}
