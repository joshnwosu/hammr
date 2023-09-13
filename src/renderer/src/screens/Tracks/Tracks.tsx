import { Button, Text } from '@mantine/core'
import pcManager from '@renderer/core/PlayerControlManager'
import { usePlayerStore } from '@renderer/store/playerStore/playerStore'
import { usePlaylistStore } from '@renderer/store/playlistStore/playlistStore'
import playlistUtils from '@renderer/utils/PlaylistUtils'
import { useEffect } from 'react'

const Tracks = () => {
  const { tracks, trackFile } = usePlayerStore((state) => state)

  const { playlist } = usePlaylistStore((state) => state)

  useEffect(() => {
    console.log('Tahtah', playlist)
  }, [playlist])

  return (
    <div>
      <Text>This is where the tracks lies.</Text>
      <div>
        {tracks.map((track, index) => {
          return (
            <div
              key={index}
              style={{
                backgroundColor: trackFile === track.r_fileLocation ? 'blue' : 'transparent'
              }}
            >
              <p
                onClick={() => {
                  pcManager.selectedTrack(track.r_fileLocation, tracks)
                }}
              >
                {track.title}
              </p>
            </div>
          )
        })}
      </div>
      <div>
        <Button onClick={() => playlistUtils.createPlaylist('Joshua')}>Create playlist</Button>

        {/* {playlist.map((item, index) => {
          return (
            <div key={index.toString()}>
              <p>{item.name}</p>
            </div>
          )
        })} */}
      </div>
    </div>
  )
}

export default Tracks
