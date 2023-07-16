import { app, shell, BrowserWindow, ipcMain } from 'electron'
import fs from 'fs'
import { join, parse } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { directories } from './modules/directories'
import chokidar from 'chokidar'
import { SUPPORTED_FORMATS, isValidFileType } from './utilities'
import { filesTracker } from './modules/filesTracker'
import { playlistsTracker } from './modules/playlistsTrackers'
import { playbackStats } from './modules/playbackStats'
import { settings } from './modules/settings'
import createParsedTrack from './core/createdParsedTrack'

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
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

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

// listen for file changes

chokidar
  .watch(directories.musicDirectory, {
    ignored: /[\/\\]\./,
    persistent: true,
    ignoreInitial: true,
    awaitWriteFinish: true
  })
  .on('add', async (path) => {
    if (isValidFileType(path)) {
      console.log(`File ${path} has been added.`)
    }
  })
  .on('change', (path) => {
    console.log(`File ${path} has been changed`)
  })
  .on('unlink', (path) => {
    console.log(`File ${path} has been removed`)
  })
  .on('ready', () => {
    console.log('Files Ready.')
  })

// ipc Listeners

ipcMain.on('show-context-menu', (event, data) => {
  const d = directories
  event.sender.send('show-context-menu', { ...data, country: 'Nigeria', appDIR: d })

  playerReady()
})

const playerReady = () => {
  const processedFiles = filesTracker.getTracks
  const playlists = playlistsTracker.getPlaylists
  const recentlyPlayedTracks = playbackStats.recentlyPlayedTracks
  const playStats = playbackStats.playStats

  console.log({ processedFiles, playlists, recentlyPlayedTracks, playStats })
  refreshTracks()
}

const refreshTracks = (): void => {
  const folders: string[] = settings.getSettings.foldersToScan
  let superFolder: any[] = []
  const handleAllFolders = (folders: string[], length: number, index: number): void => {
    parseFolder(folders[index], [], []).then((data: any[]) => {
      superFolder = [...superFolder, ...data]
      index += 1
      if (index <= length - 1) {
        handleAllFolders(folders, length, index)
      } else {
        prepareTracksForProcessing(superFolder)
      }
    })
  }

  handleAllFolders(folders, folders.length, 0)
}

const prepareTracksForProcessing = async (foldersFinalData: any[]): Promise<void> => {
  const data: any[] = []
  foldersFinalData.forEach((folder) => {
    folder.tracks.forEach((fileName: string) => {
      const filePath = join(folder.path, fileName)
      const parsed = filesTracker.getTracks.some((file) => file.fileLocation === filePath)
      if (!parsed) {
        data.push({ fileName, filePath, folder })
      }
    })
  })
  if (data.length !== 0) {
    processTracks(data, 0)
  }
}

const processTracks = async (data: any[], index: number): Promise<void> => {
  console.log('Beginning to parse ' + data[index].fileName)
  const newTrack = await createParsedTrack(data[index].filePath)
  // window.webContents.send("newTrack", newTrack);
  console.log('newTrack:', newTrack)
  console.log('Done parsing ' + data[index].fileName)
  if (index !== data.length - 1) {
    processTracks(data, index + 1)
    console.log('parsingProgress', [index + 2, data.length])
  } else {
    filesTracker.saveChanges()
    // window.webContents.send("parsingDone", data.length);
    return
  }
}

const parseFolder = async (
  folderPath: string,
  subFolders: string[],
  foldersFinalData: any[]
): Promise<any> => {
  return new Promise((resolve) => {
    ;(function recursiveReader(folderPath: string, subFolders: string[], foldersFinalData: any[]) {
      subFolders.shift()
      const folderObject_notParsed: {
        name: string
        path: string
        tracks: string[]
      } = {
        name: folderPath.replace(/(.*)[\/\\]/, '').split('.')[0],
        path: folderPath,
        tracks: []
      }
      fs.readdir(folderPath, async (_, files) => {
        let newSubFolders = files.filter((file) =>
          fs.lstatSync(join(folderPath, file)).isDirectory()
        )
        newSubFolders = newSubFolders.map((item) => join(folderPath, item))
        subFolders = [...subFolders, ...newSubFolders]
        const audioFiles = files.filter((file) => SUPPORTED_FORMATS.includes(parse(file).ext))
        folderObject_notParsed.tracks = audioFiles

        foldersFinalData = [...foldersFinalData, folderObject_notParsed]
        if (subFolders[0]) {
          recursiveReader(subFolders[0], subFolders, foldersFinalData)
        } else {
          resolve(foldersFinalData)
          console.log("I'm Done Reading all the folders")
        }
      })
    })(folderPath, subFolders, foldersFinalData)
  })
}
