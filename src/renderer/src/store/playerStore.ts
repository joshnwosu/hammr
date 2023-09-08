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
  amount: number
  tracks: Track[]
  nowPlaying: Track
  selectedTrack: string
  increaseByTen: (value: number) => void
  restoreTracks: (tracks: any[]) => void
  setSelectedTrack: (track: Track['fileLocation'] | string) => void
}

export const usePlayerStore = create<PlayerStoreProps>((set, get) => ({
  name: 'player',
  amount: 0,
  tracks: [],
  nowPlaying: {} as Track,
  selectedTrack: '',
  increaseByTen: (value: number) => {
    const amountState = get().amount
    set({ amount: value + amountState })
  },
  restoreTracks: (tracks) => {
    set({ tracks })
  },
  setSelectedTrack: (track) => {
    set({ selectedTrack: track })
  }
}))
