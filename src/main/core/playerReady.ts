import fs from 'fs'
import { join, parse } from 'path'

import { SUPPORTED_FORMATS } from '../utilities'
import { filesTracker } from '../modules/filesTracker'
import { settings } from '../modules/settings'
import createParsedTrack from '../core/createdParsedTrack'

export const refreshTracks = (): void => {
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
