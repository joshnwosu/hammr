// import fs from 'fs'
import { parse, join } from 'path'
import NodeID3, { Tags } from 'node-id3'
import { directories } from '../modules/Directory/Directory'
import { extractTitleAndArtist, removeMIME, writeImageBuffer } from '../utilities'
import { filesTracker } from '../modules/FilesTracker/FilesTracker'
import { Track } from '../types'

function createParsedTrack(fileLocation: string) {
  return new Promise((resolve, _) => {
    const track: Track = {
      r_fileLocation: 'file://' + fileLocation,
      fileLocation: fileLocation,
      fileName: parse(fileLocation).name,
      folderInfo: {
        name: parse(parse(fileLocation).dir).base,
        path: parse(fileLocation).dir
      }
    }

    NodeID3.read(fileLocation, async (_: any, tags: Tags) => {
      // @ts-expect-error
      if (tags && tags.image && tags.image?.imageBuffer) {
        // @ts-expect-error
        tags.image.mime = tags.image?.mime.replace(/image\//g, '') || 'jpg'

        const albumArtPath = join(
          directories.albumCover,
          `${removeMIME(decodeURI(track.fileName).replace(/[^a-zA-Z0-9-_]/g, ''))}.${
            // @ts-expect-error
            tags.image.mime
          }`
        )
        // @ts-expect-error
        writeImageBuffer(tags.image.imageBuffer, albumArtPath)

        track.albumArt = albumArtPath
      }

      track.title = tags.title || track.fileName
      track.extractedTitle = extractTitleAndArtist(track.fileName).title

      track.artist = tags.artist || 'Unknown Artist'
      track.extractedArtist = extractTitleAndArtist(track.fileName).artist

      track.album = tags.album ? tags.album.trim() : 'Unknown Album'
      track.genre = tags.genre ? tags.genre.trim() : 'Unknown Genre'

      track.year = tags.year

      track.defaultTitle = track.title || track.extractedTitle || track.fileName
      track.defaultArtist = track.artist || track.extractedArtist

      track.length = tags.length

      track.date = tags.date

      track.trackNumber = tags.trackNumber

      // fs.stat(track.fileLocation, (_, stats) => {
      //   track.dateAdded = stats.ctimeMs
      // })

      filesTracker.addFile(track)

      resolve(track)
    })
  })
}

export default createParsedTrack
