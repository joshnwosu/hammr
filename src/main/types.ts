export interface Track {
  r_fileLocation: string
  fileLocation: string
  fileName: string
  albumArt?: string
  album?: string
  title?: string
  artist?: string
  genre?: string
  year?: string
  extractedTitle?: string
  defaultTitle?: string
  extractedArtist?: string
  defaultArtist?: string
  length?: string
  date?: string
  dateAdded?: string | any
  trackNumber?: string
  folderInfo?: {
    name: string
    path: any
  }
  // Add additional properties as needed
}
