import fs from 'fs'
import { directories } from './directories'

class Settings {
  settings = {
    foldersToScan: [directories.musicDirectory]
  }
  constructor() {
    if (fs.existsSync(directories.settingsLocation)) {
      try {
        const data = JSON.parse(fs.readFileSync(directories.settingsLocation, 'utf-8'))
        this.settings = data
      } catch (error) {
        console.log('An error occurred while reading settings file', error)
      }
    }
  }
  updateSettings(payload: any) {
    this.settings = payload
    this.saveSettings()
  }

  addFolderToScan(folderPath: string) {
    this.settings.foldersToScan.push(folderPath)
    this.saveSettings()
  }

  removeFromScannedFolders(folderPath: string) {
    this.settings.foldersToScan.forEach((folder: string, index: number) => {
      if (folder.replace(/(.*)[\/\\]/, '') === folderPath.replace(/(.*)[\/\\]/, '')) {
        this.settings.foldersToScan.splice(index, 1)
        return
      }
    })
    this.saveSettings()
  }

  saveSettings() {
    fs.writeFile(directories.settingsLocation, JSON.stringify(this.settings), (err) => {
      if (err) console.log(err)
    })
  }

  get getSettings() {
    return this.settings
  }
}

export const settings = new Settings()
