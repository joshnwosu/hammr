import trackUtils from '@renderer/utils/TrackUtils'
import { Track, usePlayerStore } from '../../store/playerStore'
import React from 'react'

export class PlayerControlManager {
  private audioRef: React.RefObject<HTMLAudioElement>

  public audio: HTMLAudioElement
  public tracks: Track[]
  public fileTrack: string

  constructor() {
    this.audio = new Audio()
    this.tracks = []
    this.fileTrack = ''
    this.audioRef = React.createRef() // Create a ref for the audio element
    this.setAudioRef() // Set the audio element reference

    this.initPlayer()
  }

  private setAudioRef() {
    this.audioRef = React.createRef() // Create a ref
    this.audio = this.audioRef.current || new Audio() // Assign the ref's current value to audio
  }

  initPlayer() {
    const { audio, fileTrack: selectedTrack } = this

    let queues = usePlayerStore.getState().queues
    let index = trackUtils.getTrackIndex(queues, selectedTrack)

    console.log('The Index: ', index)

    audio.src = queues[index]?.r_fileLocation

    // audio.src = selectedTrack
    audio.onloadeddata = () => {
      audio.play()
    }
    audio.oncanplay = () => {
      //
      usePlayerStore.getState()
    }
    audio.onplaying = () => {
      //
    }
    audio.onpause = () => {
      //
    }
    audio.ontimeupdate = () => {
      //
    }
    audio.onended = () => {
      //
    }
    audio.onerror = () => {
      //
    }
  }

  isPlaying(status: boolean) {
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

  playTrack() {
    this.audio.play()
    this.isPlaying(true)
  }

  pauseTrack() {
    this.audio.pause()
    this.isPlaying(false)
  }

  selectedTrack(id: string, tracks: Track[]) {
    usePlayerStore.getState().setTrackFile('')
    if (id !== undefined) {
      usePlayerStore.getState().setTrackFile(id)

      usePlayerStore.getState().setQueues(tracks)
    }
  }

  playAll() {
    this.fileTrack = ''
  }

  nextTrack() {}

  previousTrack() {}

  shuffleTrack() {}
}

const pcManager = new PlayerControlManager()
export default pcManager
