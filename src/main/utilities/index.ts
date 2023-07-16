import fs from 'fs'

interface DuplicateProps {
  targetArray: any[]
  props: string | any
}

export const removeDuplicates = ({ targetArray, props }: DuplicateProps): any[] => {
  return targetArray.filter((item, index, self) => {
    const isDuplicate = self.findIndex((t) => t[props] === item[props]) !== index
    return !isDuplicate
  })
}

export const writeImageBuffer = (imageBuffer: any, savePath: string) => {
  fs.writeFileSync(savePath, imageBuffer)
}
export const extractTitleAndArtist = (trackName: string) => {
  const split = trackName.split('-')
  let artist: string
  let title: string
  if (trackName.includes('_-')) {
    artist = split[0]
    title = split[1]
  } else if (trackName.includes('-')) {
    artist = split[1]
    title = split[0]
  } else {
    return { artist: 'unknown', title: null }
  }
  artist = artist.replace(/_/g, ' ').trim()
  title = title
    .replace(/_/g, ' ')
    .replace(/\(.*\).*/gi, '')
    .replace(/\[.*\].*/gi, '')
    .replace(/\)/, '')
    .trim()
  return { artist, title }
}

export const removeMIME = (str: string) => {
  return str.replace(/(\.mp3)|(\.m4a)|(\.ogg)|(\.wav)/gi, '')
}

export const isValidFileType = (path: string) => {
  return path.match(/\.mp3|\.webm|\.m4a|\.ogg/gi)
}
