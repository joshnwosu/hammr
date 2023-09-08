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
  nowPlaying: Track
  selectedTrack: string
  setSelectedTrack: (track: Track['fileLocation'] | string) => void
  setNowPlaying: (track: Track) => void
  restoreTracks: (tracks: any[]) => void
  addTrack: (track: Track) => void
}

export const usePlayerStore = create<PlayerStoreProps>((set, get) => ({
  name: 'player',
  tracks: [],
  nowPlaying: {} as Track,
  selectedTrack: '',
  restoreTracks: (tracks) => {
    set({ tracks })
  },
  setSelectedTrack: (track) => {
    set({ selectedTrack: track })
  },
  setNowPlaying: (track) => {
    set({ nowPlaying: track })
  },
  addTrack: (payload) => {
    set((state) => {
      const trackAlreadyAdded = state.tracks.some(
        (track) => track.fileLocation === payload.fileLocation
      )
      if (!trackAlreadyAdded) {
        return { tracks: [...state.tracks, payload] }
      }
      return { tracks: [...state.tracks] }
    })
  }
}))
