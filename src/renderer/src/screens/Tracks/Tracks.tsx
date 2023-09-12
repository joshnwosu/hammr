import { Text } from '@mantine/core'
import pcManager from '@renderer/core/PlayerControlManager'
import { usePlayerStore } from '@renderer/store/playerStore/playerStore'

const Tracks = () => {
  const { tracks, trackFile } = usePlayerStore((state) => state)

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
      <div>{/* Volume */}</div>
    </div>
  )
}

export default Tracks
