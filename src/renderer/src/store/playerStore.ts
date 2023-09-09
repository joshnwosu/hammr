import { create } from 'zustand'

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
  // Add additional properties as needed
}

interface PlayerStoreProps {
  name: string
  tracks: Track[]
  queues: Track[]
  nowPlaying: Track
  trackFile: string
  setTrackFile: (track: Track['fileLocation'] | string) => void
  setNowPlaying: (track: Track) => void
  setQueues: (track: Track[]) => void
  restoreTracks: (tracks: any[]) => void
  addTrack: (track: Track) => void
  updateTrack: (track: Track) => void
  deleteTrack: (track) => void
}

export const usePlayerStore = create<PlayerStoreProps>((set, get) => ({
  name: 'player',
  tracks: [],
  queues: [],
  nowPlaying: {} as Track,
  trackFile: '',
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
