import { Button, Flex, Slider, Text } from '@mantine/core'
import pcManager from '@renderer/core/PlayerControlManager'
import { usePlayerStore } from '@renderer/store/playerStore/playerStore'
import trackUtils from '@renderer/utils/TrackUtils'

const Tracks = () => {
  const { tracks, playerStatus, trackFile } = usePlayerStore((state) => state)

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
        <Button onClick={() => pcManager.shuffleTrack()}>
          Shuffle - {playerStatus.shuffle ? 'Yes' : 'No'}
        </Button>

        <Button onClick={() => pcManager.previousTrack()}>Previous</Button>

        <Button onClick={() => pcManager.togglePlaying()}>
          {playerStatus.playing ? 'Pause' : 'Play'}
        </Button>

        <Button onClick={() => pcManager.nextTrack()}>Next</Button>

        <Button onClick={() => pcManager.repeatTrack()}>Repeat - {playerStatus.repeat}</Button>

        {/* <Text>{debounced}</Text> */}

        <Flex mt={'xl'}>
          <Text>{trackUtils.formatDuration(playerStatus.currentTime)}</Text>
          <Text> ---------------- </Text>
          <Text>{trackUtils.formatDuration(playerStatus.duration)}</Text>
        </Flex>

        <Slider
          value={playerStatus.seekPosition || 0}
          labelTransition="skew-down"
          labelTransitionDuration={150}
          labelTransitionTimingFunction="ease"
          label={trackUtils.formatDuration(playerStatus.currentTime)}
          mt={'xl'}
          onChange={(value) => pcManager.seekBar(value)}
        />
      </div>
    </div>
  )
}

export default Tracks
