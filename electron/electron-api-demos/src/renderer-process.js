const BrowserWindow = require('electron').remote.BrowserWindow;
const path = require('path');

const manageWindowBtn = document.getElementById('manage-window');
let win;

manageWindowBtn.addEventListener('click', (e) => {
  console.log(__dirname);
  const modalPath = path.join('file://', __dirname, './childwindow.html');

  win = new BrowserWindow({
    width: 400,
    height: 275,
    frame: false,
  });

  win.on('resize', updateReplay);
  win.on('move', updateReplay);
  win.on('focus', hideFocusBtn);
  win.on('blur', showFocusBtn);
  win.on('close', () => {
    hideFocusBtn();
    win = null;
  });
  win.loadURL(modalPath);
  win.show();

  function updateReplay() {
    const manageWindowReplay = document.getElementById('manage-window-replay');
    const message = `Size: ${win.getSize()} Position: ${win.getPosition()}`
    manageWindowReplay.innerText = message;
  }

  const focusModalBtn = document.getElementById('focus-on-modal-window');

  function showFocusBtn() {
    if (!win) return;
    focusModalBtn.classList.add('smooth-appear');
    focusModalBtn.classList.remove('disappear');
    focusModalBtn.addEventListener('click', () => {
      win.focus();
    });
  }
  function hideFocusBtn() {
    focusModalBtn.classList.add('disappear');
    focusModalBtn.classList.remove('smooth-appear');
  }

});
