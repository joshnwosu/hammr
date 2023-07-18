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
  increaseByTen: (value: number) => void
  tracks: Track[]
  nowPlaying: Track
  restoreTracks: (tracks: any[]) => void
  selectedTrack: string
  setSelectedTrack: (track: Track['fileLocation'] | string) => void
}

export const usePlayerStore = create<PlayerStoreProps>((set, get) => ({
  name: 'player',
  amount: 0,
  increaseByTen: (value: number) => {
    const amountState = get().amount
    set({ amount: value + amountState })
  },
  tracks: [],
  nowPlaying: {} as Track,
  restoreTracks: (tracks) => {
    set({ tracks })
  },
  selectedTrack: '',
  setSelectedTrack: (track) => {
    set({ selectedTrack: track })
  }
}))
