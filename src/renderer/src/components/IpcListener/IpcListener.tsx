import { usePlayerStore } from '@renderer/store/playerStore/playerStore'
import playlistUtils from '@renderer/utils/PlaylistUtils'
import { useEffect } from 'react'

export default function IpcListener() {
  const { restoreTracks, addTrack } = usePlayerStore((state) => state)

  useEffect(() => {
    window.api.send('playerReady')

    window.api.receive('processedFiles', (_, tracks) => {
      console.log('The Tracks Here: ', tracks)
      restoreTracks(tracks)
    })

    window.api.receive('newTrack', (_, newTrack) => {
      // console.log('The track added: ', newTrack)
      addTrack(newTrack)
    })

    window.api.receive('userPlaylists', (_, playlists) => {
      console.log('The Playlists Here: ', playlists)
      playlistUtils.restorePlaylists(playlists)
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
