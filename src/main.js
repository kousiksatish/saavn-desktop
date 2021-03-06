const { app, BrowserWindow, globalShortcut } = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

function createWindow () {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1200,
    height: 600,
    minWidth: 200,
    webPreferences: {
        sandbox: true
    }
  })

  win.maximize();

  // and load the index.html of the app.
  win.loadURL('https://www.jiosaavn.com/')

  // Open the DevTools.
  // win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
 
  globalShortcut.register('MediaPlayPause', () => {
      playPause();
  })
}
var shortcutInvokedFirstTime = true;
function playPause() {
    // Initialise buttons only during the first time
    if (shortcutInvokedFirstTime) {
        win.webContents.executeJavaScript(`
            let playButton = document.getElementById('play');
            let pauseButton = document.getElementById('pause');
        `)
        shortcutInvokedFirstTime = false;
    }
    // Function to play if paused and pause if playing
    win.webContents.executeJavaScript(`
        if (!playButton.classList.contains('hide')) {
        playButton.click();
        } else if (!pauseButton.classList.contains('hide')) {
            pauseButton.click();
        }
    `);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})
