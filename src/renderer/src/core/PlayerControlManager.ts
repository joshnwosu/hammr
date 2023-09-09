import trackUtils from '@renderer/utils/TrackUtils'
import { Track, usePlayerStore } from '../store/playerStore/playerStore'

export class PlayerControlManager {
  public audio: HTMLAudioElement
  public tracks: Track[]
  public fileTrack: string
  public shuffle: boolean
  public repeat: number

  constructor() {
    this.audio = new Audio()
    this.tracks = []
    this.fileTrack = ''
    this.shuffle = true
    this.repeat = 0
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
      if (this.tracks[index]) {
        usePlayerStore.setState((prevState) => ({
          playerStatus: {
            ...prevState.playerStatus,
            lastPlayed: [...prevState.playerStatus.lastPlayed, index]
          }
        }))
      }

      usePlayerStore.setState({
        trackFile: this.tracks[index >= this.tracks.length ? 0 : index].r_fileLocation
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
      this.tracks = usePlayerStore.getState().tracks
    }

    let currentIndex = trackUtils.getTrackIndex(this.tracks, this.fileTrack)

    if (!this.shuffle) {
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

  public previousTrack() {
    if (!this.audio.src) return
    let currentIndex = trackUtils.getTrackIndex(this.tracks, this.fileTrack)

    if (!this.shuffle) {
      if (currentIndex == 0) currentIndex = this.tracks.length
      else currentIndex--
    } else {
      // remove last played
      usePlayerStore.getState().playerStatus.lastPlayed.pop()
      // set current index to last played.
      currentIndex = usePlayerStore.getState().playerStatus.lastPlayed.pop() || 0
    }

    if (currentIndex == undefined || currentIndex < 0) currentIndex = 0
    this.playTrack(currentIndex)
  }

  shuffleTrack() {}
}

const pcManager = new PlayerControlManager()
export default pcManager
