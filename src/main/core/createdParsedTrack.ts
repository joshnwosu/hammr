import fs from 'fs'
import path from 'path'
import NodeID3, { Tags } from 'node-id3'
import { directories } from '../modules/directories'
import { removeMIME, writeImageBuffer } from '../utilities'
import { filesTracker } from '../modules/filesTracker'

function createParsedTrack(fileLocation: string) {
  return new Promise((resolve, _) => {
    const track = {
      r_fileLocation: '',
      fileLocation: '',
      albumArt: '',
      album: '',
      title: '',
      artist: '',
      genre: '',
      year: '',
      extractedTitle: '',
      defaultTitle: '',
      extractedArtist: '',
      defaultArtist: '',
      fileName: '',
      length: '',
      date: '',
      dateAdded: 0,
      trackNumber: '',
      folderInfo: {
        name: path.parse(path.parse(fileLocation).dir).base,
        path: path.parse(fileLocation).dir
      }
    }
    track.r_fileLocation = 'file://' + fileLocation

    NodeID3.read(fileLocation, async (_: any, tags: Tags) => {
      // @ts-expect-error
      if (tags && tags.image && tags.image?.imageBuffer) {
        // @ts-expect-error
        tags.image.mime = tags.image?.mime.replace(/image\//g, '') || 'jpg'

        const albumArtPath = path.join(
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

      fs.stat(track.r_fileLocation, (_, stats) => {
        track.dateAdded = stats.ctimeMs
      })

      filesTracker.addFile(track)

      resolve(track)
    })
  })
}

export default createParsedTrack
