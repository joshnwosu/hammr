import trackUtils from '@renderer/utils/TrackUtils'
import { Track, usePlayerStore } from '../../store/playerStore'

export class PlayerControlManager {
  public audio: HTMLAudioElement
  public tracks: Track[]
  public fileTrack: string

  constructor() {
    this.audio = new Audio()
    this.tracks = []
    this.fileTrack = ''
  }

  initPlayer(currentTrack: string) {
    this.fileTrack = currentTrack
    let index = trackUtils.getTrackIndex(this.tracks, currentTrack)
    // Set the audio source and play it
    this.audio.src = this.tracks[index]?.r_fileLocation

    this.audio.onloadeddata = () => {
      this.audio.play()
    }
    this.audio.oncanplay = () => {
      //
      usePlayerStore.getState()
    }
    this.audio.onplaying = () => {
      //
    }
    this.audio.onpause = () => {
      //
    }
    this.audio.ontimeupdate = () => {
      //
    }
    this.audio.onended = () => {
      //
    }
    this.audio.onerror = () => {
      //
    }
  }

  selectedTrack(currentTrack: string, tracks: Track[]) {
    this.tracks = tracks
    this.fileTrack = currentTrack

    usePlayerStore.getState().setTrackFile('')
    if (currentTrack !== undefined) {
      usePlayerStore.getState().setTrackFile(currentTrack)

      usePlayerStore.getState().setQueues(tracks)
    }
  }

  private isPlaying(status: boolean) {
    window.api.send('isPlaying', status)
  }

  togglePlaying() {
    if (this.audio.src) return this.nextTrack()

    if (this.audio.paused) {
      this.audio.play()
      this.isPlaying(true)
    } else {
      this.audio.pause()
      this.isPlaying(false)
    }
  }

  playTrack(index: number) {
    if (!this.tracks) return
    else {
      // if (this.tracks[index]) {
      //   usePlayerStore.setState({}) // do something here
      // }

      usePlayerStore.setState({
        trackFile: this.tracks[index].r_fileLocation
      })
    }

    this.isPlaying(true)
  }

  pauseTrack() {
    this.audio.pause()
    this.isPlaying(false)
  }

  playAll() {
    this.fileTrack = ''
  }

  public nextTrack() {
    if (this.tracks.length === 0) {
      // Push tracks to queues if they are empty
      console.log('empty')
    }

    let currentIndex = trackUtils.getTrackIndex(this.tracks, this.fileTrack)

    const status = true

    if (status) {
      currentIndex++
      if (currentIndex > this.tracks.length - 1) currentIndex = 0
    } else {
      if (this.tracks.length > 1) {
        let temp = currentIndex
        while (currentIndex == temp) {
          currentIndex = Math.floor(Math.random() * this.tracks.length)
        }
      }
    }

    if (this.tracks[currentIndex]) {
      this.playTrack(currentIndex)
    }

    console.log('current index: ', currentIndex)
  }

  previousTrack() {}

  shuffleTrack() {}
}

const pcManager = new PlayerControlManager()
export default pcManager
