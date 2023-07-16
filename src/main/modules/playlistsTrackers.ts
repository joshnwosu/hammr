import fs from 'fs'
import { directories } from './directories'

class PlaylistsTracker {
  playlists: { name: string; tracks: any[] }[] = [{ name: 'Favorites', tracks: [] }]

  constructor() {
    if (fs.existsSync(directories.playlistsLocation)) {
      try {
        const data = JSON.parse(fs.readFileSync(directories.playlistsLocation, 'utf-8'))
        this.playlists = data
      } catch (error) {
        console.log('An error occurred while reading playlistTracker file')
      }
    }
  }

  updatePlaylists(playlists: { name: string; tracks: any[] }[]) {
    this.playlists = playlists
    this.saveChanges()
  }

  deleteFile(pathToTrack: string) {
    // Only works for the "Favorites" playlist
    const indexOfDeletedTrack = this.playlists[0].tracks.findIndex(
      (track) => track.fileLocation === pathToTrack
    )
    this.playlists[0].tracks.splice(indexOfDeletedTrack, 1)
    this.saveChanges()
  }

  saveChanges() {
    fs.writeFile(directories.playlistsLocation, JSON.stringify(this.playlists), (err) => {
      if (err) console.log(err)
    })
  }

  get getPlaylists() {
    return this.playlists
  }
}

export const playlistsTracker = new PlaylistsTracker()
