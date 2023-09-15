import { usePlaylistStore } from '@renderer/store/playlistStore/playlistStore'

class PlaylistUtils {
  constructor() {}

  private updateStore(payload) {
    usePlaylistStore.setState((prevState) => ({
      playlist: [...prevState.playlist, ...payload]
    }))
    // console.log('The payload: ', payload)
  }

  createPlaylist(name: string) {
    const newPlaylist = [
      {
        name: name,
        tracks: []
      }
    ]

    this.updateStore(newPlaylist)

    // window.api.send('updatePlaylists', usePlaylistStore.getState().playlist)
  }

  addSelectedTracksToPlaylist(payload) {
    if (payload) {
      // TODO
    }
  }

  deleteSelectedTracksFromPlaylist(payload) {
    // TODO
  }

  restorePlaylists(payload) {
    this.updateStore(payload)
  }
}

const playlistUtils = new PlaylistUtils()
export default playlistUtils
