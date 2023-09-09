import trackUtils from '@renderer/utils/TrackUtils'
import { Track, usePlayerStore } from '../store/playerStore/playerStore'
import { RepeatEnum } from '@renderer/store/playerStore/types'

export class PlayerControlManager {
  public audio: HTMLAudioElement
  public tracks: Track[]
  public fileTrack: string
  public shuffle: boolean
  public repeat: RepeatEnum

  constructor() {
    this.audio = new Audio()
    this.tracks = []
    this.fileTrack = ''
    this.shuffle = usePlayerStore.getState().playerStatus.shuffle
    this.repeat = usePlayerStore.getState().playerStatus.repeat
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
      usePlayerStore.setState((prevState) => ({
        playerStatus: {
          ...prevState.playerStatus,
          duration: this.audio.duration
        }
      }))
    }
    this.audio.onplaying = () => {
      usePlayerStore.setState((prevState) => ({
        playerStatus: {
          ...prevState.playerStatus,
          playing: true
        }
      }))
    }
    this.audio.onpause = () => {
      usePlayerStore.setState((prevState) => ({
        playerStatus: {
          ...prevState.playerStatus,
          playing: false
        }
      }))
    }
    this.audio.ontimeupdate = () => {
      // Calculate seek position
      const seekPosition = (this.audio.currentTime / this.audio.duration) * 100

      usePlayerStore.setState((prevState) => ({
        playerStatus: {
          ...prevState.playerStatus,
          currentTime: this.audio.currentTime,
          seekPosition: seekPosition
        }
      }))
    }
    this.audio.onended = () => {
      this.playNextTrack()
    }
    this.audio.onerror = () => {
      usePlayerStore.getState().playerStatus.playing = false
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

  private updateShuffle(value: boolean) {
    usePlayerStore.setState((prevState) => ({
      playerStatus: {
        ...prevState.playerStatus,
        shuffle: value
      }
    }))
  }

  private updateRepeat(value: RepeatEnum) {
    usePlayerStore.setState((prevState) => ({
      playerStatus: {
        ...prevState.playerStatus,
        repeat: value
      }
    }))
  }

  shuffleTrack() {
    this.shuffle = usePlayerStore.getState().playerStatus.shuffle
    this.repeat = usePlayerStore.getState().playerStatus.repeat

    if (!this.audio.src) return

    if (this.shuffle) {
      this.updateShuffle(false)
    } else {
      this.updateShuffle(true)
      if (this.repeat == RepeatEnum.One) {
        this.updateRepeat(RepeatEnum.Off)
      }
    }
  }

  repeatTrack() {
    this.shuffle = usePlayerStore.getState().playerStatus.shuffle
    this.repeat = usePlayerStore.getState().playerStatus.repeat

    if (!this.audio.src) return

    if (this.repeat == RepeatEnum.Off) {
      this.updateRepeat(RepeatEnum.All)
    } else if (this.repeat == RepeatEnum.All) {
      this.updateRepeat(RepeatEnum.One)
      if (this.shuffle) {
        this.updateShuffle(false)
      }
    } else if (this.repeat == RepeatEnum.One) {
      this.updateRepeat(RepeatEnum.Off)
    }
  }

  playNextTrack() {
    let currentIndex = trackUtils.getTrackIndex(this.tracks, this.fileTrack)

    if (this.shuffle) {
      if (this.tracks.length > 1) {
        let temp = currentIndex
        while (currentIndex == temp) {
          currentIndex = Math.floor(Math.random() * this.tracks.length)
        }

        if (this.tracks[currentIndex]) {
          this.playTrack(currentIndex)
        }
      }
    } else {
      if (this.repeat == RepeatEnum.Off) {
        if (currentIndex >= this.tracks.length - 1) {
          console.log('All track played.')
        } else {
          currentIndex++
          this.playTrack(currentIndex)
        }
      } else if (this.repeat == RepeatEnum.All) {
        if (currentIndex >= this.tracks.length - 1) {
          currentIndex = 0
        } else {
          currentIndex++
        }
        this.playTrack(currentIndex)
      } else if (this.repeat == RepeatEnum.One) {
        if (this.tracks[currentIndex]) {
          this.audio.play()
        }
      }
    }
  }

  seekBar(value: number) {
    if (this.audio.src) {
      this.audio.currentTime = (value * this.audio.duration) / 100
      console.log((value * this.audio.duration) / 100)
    }
  }
}

const pcManager = new PlayerControlManager()
export default pcManager
