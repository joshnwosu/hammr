import { create } from 'zustand'
import { PlayerStoreProps } from './types'

export interface Track {
  r_fileLocation: string
  fileLocation: string
  fileName: string
  albumArt: string
  album: string
  title: string
  artist: string
  genre: string
  year: string
  extractedTitle: string
  defaultTitle: string
  extractedArtist: string
  defaultArtist: string
  length: string
  date: string
  dateAdded: string | any
  trackNumber: string
  folderInfo: {
    name: string
    path: any
  }
}

export const usePlayerStore = create<PlayerStoreProps>((set, get) => ({
  name: 'player',
  tracks: [],
  queues: [],
  nowPlaying: {} as Track,
  trackFile: '',
  player: {
    playing: false,
    repeat: 0,
    shuffle: false,
    currentTime: 0,
    duration: 0,
    lastPlayed: [],
    nowPlaying: {} as Track
  },
  restoreTracks: (tracks) => {
    set({ tracks })
  },
  setTrackFile: (track) => {
    set({ trackFile: track })
  },
  setQueues: (tracks) => {
    set({ queues: tracks })
  },
  setNowPlaying: (track) => {
    set({ nowPlaying: track })
  },
  addTrack: (payload) => {
    set((state) => {
      const trackAlreadyAdded = get().tracks.some(
        (track) => track.fileLocation === payload.fileLocation
      )
      if (!trackAlreadyAdded) {
        return { tracks: [...state.tracks, payload] }
      }
      return { tracks: [...state.tracks] }
    })
  },
  updateTrack: (payload) => {
    console.log('UpdateTrack Payload: ', payload)
  },
  deleteTrack(track) {
    const trackIndex = track
    console.log(trackIndex)
  }
}))
