import { create } from 'zustand'
import { PlaylistStoreProps } from './types'

export const usePlaylistStore = create<PlaylistStoreProps>((set, get) => ({
  name: 'playlist',
  playlist: []
}))
