import fs from 'fs'
import { directories } from '../Directory/Directory'

function sortArrayOfObjects<T>(targetArray: T[], param: keyof T): void {
  function compare(a: T, b: T): number {
    if (a[param] < b[param]) {
      return -1
    }
    if (a[param] > b[param]) {
      return 1
    }
    return 0
  }
  targetArray.sort(compare)
}

function removeDuplicates<T>(targetArray: T[], prop: keyof T): T[] {
  return targetArray.filter((obj, index, arr) => {
    return arr.map((mapObj) => mapObj[prop]).indexOf(obj[prop]) === index
  })
}

class PlaybackStats {
  playedFiles: any[] = []
  tracksStats: any[] = []

  constructor() {
    if (fs.existsSync(directories.playbackStatsLocation)) {
      try {
        const data = JSON.parse(fs.readFileSync(directories.playbackStatsLocation, 'utf-8'))
        this.playedFiles = data.playedFiles
        this.tracksStats = data.tracksStats
      } catch (error) {
        console.log('An error occurred while reading playbackStats file')
      }
    }
  }

  addFile(file: any) {
    this.playedFiles.unshift(file)
    this.playedFiles = this.playedFiles.slice(0, 100)
    this.generateStats()
  }

  generateStats() {
    const duplicatesCounter: Record<string, number> = {}
    this.playedFiles.forEach((track: any) => {
      duplicatesCounter[track.fileLocation] = (duplicatesCounter[track.fileLocation] || 0) + 1
    })
    let stats: any[] = []
    Object.entries(duplicatesCounter).forEach((entry) => {
      const playStats = {
        trackLocation: entry[0],
        numberOfPlays: entry[1]
      }
      stats.push(playStats)
    })
    this.tracksStats = stats
    sortArrayOfObjects(this.tracksStats, 'numberOfPlays')
    this.saveChanges()
  }

  saveChanges() {
    const stats = {
      playedFiles: this.playedFiles.filter((file) => file != undefined),
      tracksStats: this.tracksStats.filter((file) => file != undefined)
    }
    fs.writeFile(directories.playbackStatsLocation, JSON.stringify(stats), (err) => {
      if (err) console.log(err)
    })
  }

  get recentlyPlayedTracks() {
    let tracks = [...this.playedFiles]
    tracks = removeDuplicates(tracks, 'fileLocation')
    tracks.slice(0, 19)
    return tracks
  }

  get playStats() {
    return this.tracksStats
  }
}

export const playbackStats = new PlaybackStats()
