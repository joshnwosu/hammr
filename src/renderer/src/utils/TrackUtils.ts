import { Track } from '@renderer/store/playerStore'

class TrackUtils {
  constructor() {}

  getTrack(tracks: Track[], id: string) {
    return tracks.find((track) => track.r_fileLocation === id)
  }

  getTrackIndex(tracks: Track[], id: string) {
    return tracks.findIndex((track) => track.r_fileLocation == id)
  }

  formatIndex(num: number) {
    let index = num + 1
    return index <= 9 ? '0' + index : index
  }

  formatDuration(length: number) {
    let seconds = Math.floor(length % 60) || 0
    let minutes = Math.floor((length / 60) % 60) || 0
    let hours = Math.floor(length / 3600) || 0

    // Ensure that values are two digits with leading zeros
    const padWithZero = (value: number) => (value <= 9 ? `0${value}` : value)

    const formattedSeconds = padWithZero(seconds)
    const formattedMinutes = padWithZero(minutes)
    const formattedHours = padWithZero(hours)

    // Return the formatted duration
    return length >= 3600
      ? `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
      : `${formattedMinutes}:${formattedSeconds}`
  }

  fetchDuration(path: string): Promise<number> {
    return new Promise((resolve, reject) => {
      const audio = new Audio()
      audio.src = path

      audio.addEventListener('loadedmetadata', () => {
        audio.pause()
        audio.currentTime = 0

        // Resolve with the audio duration
        resolve(audio.duration)
      })

      audio.addEventListener('error', (error) => {
        // Handle any errors that may occur while loading the audio
        reject(error)
      })
    })
  }

  getFirstAlbumArt(tracks: Track[]): string | undefined {
    let albumArt: string | undefined
    tracks?.some((track) => {
      if (track.albumArt) {
        albumArt = track.albumArt
        return true // Stop the iteration once we find album art
      }
      return false
    })
    return albumArt
  }

  removeDuplicates<T>(targetArray: T[], prop: keyof T): T[] {
    return targetArray.filter((obj, index, arr) => {
      return arr.map((mapObj) => mapObj[prop]).indexOf(obj[prop]) === index
    })
  }

  sortArrayOfObjects<T>(targetArray: T[], param: keyof T): void {
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
}

const trackUtils = new TrackUtils()

export default trackUtils
