import { create } from 'zustand'

interface AppStoreProps {
  nowPlayingView: boolean
  toggleNowPlayingView: (val: boolean) => void
}

export const useAppStore = create<AppStoreProps>((set) => ({
  nowPlayingView: true,
  toggleNowPlayingView: (val) => {
    set({ nowPlayingView: val })
  }
}))
