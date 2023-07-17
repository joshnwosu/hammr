import { usePlayerStore } from '@renderer/store/playerStore'
import { useEffect } from 'react'
import path from 'path-browserify'

export function encodeTrackFile(track) {
  let prefix = 'file://'
  let trackExtension = path.extname(track.fileLocation)
  let trackPath = track.folderInfo.path
  let encodedFileName = encodeURIComponent(path.basename(track.fileName))

  return prefix + path.join(trackPath, encodedFileName) + trackExtension
}

export default function IpcListener() {
  let audio: HTMLAudioElement

  audio = new Audio()

  const { restoreTracks } = usePlayerStore((state) => state)

  const initPlayer = (track: any) => {
    console.log('The track:', encodeTrackFile(track))
    audio.src = encodeTrackFile(track)

    // audio.onloadeddata = () => {
    //   audio.play()
    // }
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
