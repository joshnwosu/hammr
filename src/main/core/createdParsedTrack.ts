import fs from 'fs'
import path from 'path'
import NodeID3, { Tags } from 'node-id3'

function createParsedTrack(fileLocation: string) {
  return new Promise((resolve, reject) => {
    const track = {
      r_fileLocation: ''
    }
    track.r_fileLocation = 'file://' + fileLocation

    NodeID3.read(fileLocation, async (error: any, tags: Tags) => {
      // @ts-expect-error
      if (tags && tags.image && tags.image?.imageBuffer) {
        // @ts-expect-error
        tags.image.mime = tags.image?.mime.replace(/image\//g, '') || 'jpg'
        const albumArtPath = path.join()
      }

      resolve(track)
    })
  })
}

export default createParsedTrack
