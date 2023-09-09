import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import chokidar from 'chokidar'
import { isValidFileType } from './utilities'
import { refreshTracks } from './core/refreshTracks'
import createParsedTrack from './core/createdParsedTrack'
import { filesTracker } from './modules/FilesTracker/FilesTracker'
import { playlistsTracker } from './modules/PlaylistsTracker/PlaylistsTracker'
import { playbackStats } from './modules/PlaybackStats/PlaybackStats'
import { settings } from './modules/Settings/Settings'

let mainWindow: BrowserWindow

function createWindow(): void {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    frame: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  mainWindow.on('will-resize', () => {
    mainWindow.webContents.send('isMaximize', false)
  })

  mainWindow.on('maximize', () => {
    mainWindow.webContents.send('isMaximize', true)
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// listen for file changes
chokidar
  .watch(settings.getSettings.foldersToScan, {
    ignored: /[\/\\]\./,
    persistent: true,
    ignoreInitial: true,
    awaitWriteFinish: true
  })
  .on('add', async (path) => {
    if (isValidFileType(path)) {
      console.log(`File ${path} has been added.`)
      const newTrack = await createParsedTrack(path)
      mainWindow.webContents.send('newTrack', newTrack)
      filesTracker.saveChanges()
      playerReady()
    }
  })
  .on('change', (path) => {
    console.log(`File ${path} has been changed`)
    playerReady()
  })
  .on('unlink', (path) => {
    console.log(`File ${path} has been removed`)
    filesTracker.deleteFile(path)
    playerReady()
  })
  .on('ready', () => {
    console.log('Files Ready.')
    playerReady()
  })

export const playerReady = () => {
  const processedFiles = filesTracker.getTracks
  const playlists = playlistsTracker.getPlaylists
  const recentlyPlayedTracks = playbackStats.recentlyPlayedTracks
  const playStats = playbackStats.playStats

  ipcMain.on('playerReady', (_event) => {
    _event.sender.send('processedFiles', processedFiles)
    _event.sender.send('userPlaylists', playlists)
    _event.sender.send('recentlyPlayed', recentlyPlayedTracks)
    _event.sender.send('playStats', playStats)
  })
  refreshTracks()
}

// ipc Listeners

ipcMain.on('isPlaying', () => {
  // Do something here.
})

ipcMain.on('frame', (_event, arg) => {
  if (arg === 'destroy') mainWindow.destroy()
  else if (arg === 'kill') app.quit()
  else if (arg === 'minimize') mainWindow.minimize()
  else if (arg === 'maximize') {
    if (mainWindow.isMaximized()) {
      _event.sender.send('isMaximize', false)
      mainWindow.unmaximize()
    } else {
      _event.sender.send('isMaximize', true)
      mainWindow.maximize()
    }
  } else if (arg === 'close') {
    saveAppData()
    mainWindow.close()
  }
})

function saveAppData() {
  console.log('Saving App Data...')
}
