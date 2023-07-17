import { usePlayerStore } from '@renderer/store/playerStore'
import { useEffect } from 'react'
// import path from 'path'

function encodeTrackFile(track) {
  let prefix = 'file://'
  let trackExtension = getFileExtension(track.fileLocation)
  let trackPath = track.folderInfo.path
  let encodedFileName = encodeURIComponent(getFileName(track.fileName))

  return `${prefix}${trackPath}/${encodedFileName}${trackExtension}`
}

function getFileExtension(filePath) {
  const lastDotIndex = filePath.lastIndexOf('.')
  if (lastDotIndex !== -1) {
    return filePath.substr(lastDotIndex)
  }
  return ''
}

function getFileName(filePath) {
  const fileName = filePath.split('/').pop()
  if (fileName) {
    return fileName
  }
  return ''
}

export default function IpcListener() {
  // let audio: LegacyRef<HTMLAudioElement> | undefined
  let audioElement: HTMLAudioElement = document.createElement('audio')

  const { restoreTracks, tracks } = usePlayerStore((state) => state)

  const initPlayer = (track) => {
    audioElement.src = encodeTrackFile(tracks)

    audioElement.onloadeddata = () => {
      audioElement.play()
    }

    console.log('Holla: ', track)
  }

  useEffect(() => {
    window.api.send('playerReady')

    window.api.receive('processedFiles', (_, tracks) => {
      console.log('The Tracks Here: ', tracks)
      restoreTracks(tracks)

      setTimeout(() => {
        initPlayer(tracks[0])
      }, 2000)
    })

    window.api.receive('userPlaylists', (_, playlists) => {
      console.log('The Playlists Here: ', playlists)
    })

    window.api.receive('recentlyPlayed', (_, tracks) => {
      console.log('The Reecently Played Track Here: ', tracks)
    })

    window.api.receive('playStats', (_, payload) => {
      console.log('The Play Stats Here: ', payload)
    })
  }, [])

  return (
    <div>
      {/* <audio ref={audio} src={encodeTrackFile(tracks[0])} autoPlay /> */}
      <svg
        style={{ visibility: 'hidden', position: 'absolute' }}
        width="0"
        height="0"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
      >
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>
    </div>
  )
}
