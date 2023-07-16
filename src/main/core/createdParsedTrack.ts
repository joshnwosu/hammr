import fs from 'fs'
import path, { parse } from 'path'
import NodeID3, { Tags } from 'node-id3'
import { directories } from '../modules/directories'
import { extractTitleAndArtist, removeMIME, writeImageBuffer } from '../utilities'
import { filesTracker } from '../modules/filesTracker'
import { Track } from '../types'

function createParsedTrack(fileLocation: string) {
  return new Promise((resolve, _) => {
    // const track: Track = {
    //   r_fileLocation: '',
    //   fileLocation: '',
    //   fileName: '',
    //   albumArt: '',
    //   album: '',
    //   title: '',
    //   artist: '',
    //   genre: '',
    //   year: '',
    //   extractedTitle: '',
    //   defaultTitle: '',
    //   extractedArtist: '',
    //   defaultArtist: '',
    //   length: '',
    //   date: '',
    //   dateAdded: 0,
    //   trackNumber: '',
    //   folderInfo: {
    //     name: path.parse(path.parse(fileLocation).dir).base,
    //     path: path.parse(fileLocation).dir
    //   }
    // }

    const track: Track = {
      r_fileLocation: 'file://' + fileLocation,
      fileLocation: fileLocation,
      fileName: parse(fileLocation).name
    }

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

      track.title = tags.title || track.fileName
      track.extractedTitle = extractTitleAndArtist(track.fileName).title

      track.artist = tags.artist || 'Unknown Artist'
      track.extractedArtist = extractTitleAndArtist(track.fileName).artist

      track.album = tags.album ? tags.album.trim() : 'Unknown Album'
      track.genre = tags.genre ? tags.genre.trim() : 'Unknown Genre'

      track.year = tags.year

      fs.stat(track.fileLocation, (_, stats) => {
        track.dateAdded = stats.ctimeMs
      })

      filesTracker.addFile(track)

      resolve(track)
    })
  })
}

export default createParsedTrack
