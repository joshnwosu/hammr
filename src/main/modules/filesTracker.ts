import fs from 'fs'
import { directories } from './directories'
import { removeDuplicates } from '../utilities'
import { Track } from '../types'

class FilesTracker {
  processedFiles: Track[] = []

  constructor() {
    if (fs.existsSync(directories.filesTrackerLocation)) {
      try {
        const data = JSON.parse(fs.readFileSync(directories.filesTrackerLocation, 'utf-8'))
        this.processedFiles = data
        this.checkForDeletedTracks()
      } catch (error) {
        console.log('Error in reading file tracker file', error)
      }
    }
  }

  addFile(track: Track) {
    this.processedFiles.unshift(track)
  }

  updateFile(track: Track) {
    const index = this.processedFiles.findIndex((t) => t.fileLocation === track.fileLocation)
    this.processedFiles[index] = track
    this.saveChanges()
  }

  checkForDeletedTracks() {
    console.log('Checking for deleted tracks')
    const deletedTracks = this.processedFiles.filter((track) => !fs.existsSync(track.fileLocation))
    deletedTracks.forEach((track) => this.deleteFile(track.fileLocation))
  }

  deleteFile(pathToTrack: string) {
    const indexOfDeletedTrack = this.processedFiles.findIndex(
      (track) => track.fileLocation === pathToTrack
    )
    this.processedFiles.splice(indexOfDeletedTrack, 1)
    this.saveChanges()
  }

  deleteFileBasedOnDirectory(folderPath: string) {
    const filtered = this.processedFiles.filter(
      (track) =>
        track.folderInfo.path.replace(/(.*)[\/\\]/, '') !== folderPath.replace(/(.*)[\/\\]/, '')
    )

    this.processedFiles = filtered
    this.saveChanges()
  }

  clearData() {
    this.processedFiles = []
  }

  saveChanges() {
    fs.writeFile(
      directories.filesTrackerLocation,
      JSON.stringify(removeDuplicates({ targetArray: this.processedFiles, props: 'fileLocation' })),
      (err) => {
        if (err) console.log(err)
      }
    )
  }

  get getTracks() {
    return this.processedFiles
  }
}

export const filesTracker = new FilesTracker()
