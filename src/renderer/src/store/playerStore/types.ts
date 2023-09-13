import { Track } from './playerStore'

export enum RepeatEnum {
  All = 'all',
  Off = 'off',
  One = 'one'
}

export interface PlayerStoreProps {
  name: string
  tracks: Track[]
  queues: Track[]
  nowPlaying: Track
  trackFile: string
  playerStatus: {
    audio: HTMLAudioElement
    playing: boolean
    repeat: RepeatEnum
    shuffle: boolean
    currentTime: number
    duration: number
    lastPlayed: number[]
    nowPlaying: Track
    seekPosition: number
    volume: number
  }
  setTrackFile: (track: Track['fileLocation'] | string) => void
  setNowPlaying: (track: Track) => void
  setQueues: (track: Track[]) => void
  restoreTracks: (tracks: any[]) => void
  addTrack: (track: Track) => void
  updateTrack: (track: Track) => void
  deleteTrack: (track) => void
}
