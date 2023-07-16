import { app } from 'electron'
import path from 'path'
import fs from 'fs'

const APP_DATA_DIRECTORY = app.getPath('userData')
const MUSIC_DIRECTORY = path.join(app.getPath('home'), 'Music')
const ALBUM_COVER_ART_DIRECTORY = path.join(APP_DATA_DIRECTORY, 'Album Cover')
const ARTIST_PICTURE_DIRECTORY = path.join(APP_DATA_DIRECTORY, 'Artist Pictures')

if (!fs.existsSync(ALBUM_COVER_ART_DIRECTORY)) {
  fs.mkdirSync(ALBUM_COVER_ART_DIRECTORY)
}
if (!fs.existsSync(ARTIST_PICTURE_DIRECTORY)) {
  fs.mkdirSync(ARTIST_PICTURE_DIRECTORY)
}

export const directories = {
  appDirectory: APP_DATA_DIRECTORY,
  musicDirectory: MUSIC_DIRECTORY,
  albumCover: ALBUM_COVER_ART_DIRECTORY,
  artistPicture: ARTIST_PICTURE_DIRECTORY,
  filesTrackerLocation: path.join(APP_DATA_DIRECTORY, 'processedFiles.json'),
  playlistsLocation: path.join(APP_DATA_DIRECTORY, 'playlists.json'),
  playbackStatLocation: path.join(APP_DATA_DIRECTORY, 'playbackStats.json'),
  settingsLocation: path.join(APP_DATA_DIRECTORY, 'settings.json')
}
