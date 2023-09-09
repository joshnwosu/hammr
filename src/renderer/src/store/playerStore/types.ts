import { Track } from './playerStore'

export interface PlayerStoreProps {
  name: string
  tracks: Track[]
  queues: Track[]
  nowPlaying: Track
  trackFile: string
  playerStatus: {
    playing: boolean
    repeat: number
    shuffle: boolean
    currentTime: number
    duration: number
    lastPlayed: number[]
    nowPlaying: Track | null
  }
  setTrackFile: (track: Track['fileLocation'] | string) => void
  setNowPlaying: (track: Track) => void
  setQueues: (track: Track[]) => void
  restoreTracks: (tracks: any[]) => void
  addTrack: (track: Track) => void
  updateTrack: (track: Track) => void
  deleteTrack: (track) => void
}
