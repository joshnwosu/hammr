import { Button, Flex, Slider, Text, rem } from '@mantine/core'
import { useDebouncedValue } from '@mantine/hooks'
import pcManager from '@renderer/core/PlayerControlManager'
import { usePlayerStore } from '@renderer/store/playerStore/playerStore'
import trackUtils from '@renderer/utils/TrackUtils'
import { useEffect, useState } from 'react'

const Tracks = () => {
  const { tracks, playerStatus, trackFile } = usePlayerStore((state) => state)

  const [isSeeking, setIsSeeking] = useState(false)

  const [sliderValue, setSliderValue] = useState(playerStatus.seekPosition || 0)

  const [debounced] = useDebouncedValue(sliderValue, 200)

  const handleSliderChange = (newValue) => {
    setSliderValue(newValue)
    setIsSeeking(true)
  }

  useEffect(() => {
    pcManager.seekBar(debounced)
    setIsSeeking(false)
  }, [debounced])

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
          value={isSeeking ? sliderValue : playerStatus.seekPosition || 0}
          labelTransition="skew-down"
          labelTransitionDuration={150}
          labelTransitionTimingFunction="ease"
          label={trackUtils.formatDuration(playerStatus.currentTime)}
          mt={'xl'}
          onChange={handleSliderChange}
          size={2}
          styles={(theme) => ({
            track: {
              backgroundColor:
                theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.blue[1]
            },
            mark: {
              width: rem(6),
              height: rem(6),
              borderRadius: rem(6),
              transform: `translateX(-${rem(3)}) translateY(-${rem(2)})`,
              borderColor:
                theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.blue[1]
            },
            markFilled: {
              borderColor: theme.colors.blue[6]
            },
            markLabel: { fontSize: theme.fontSizes.xs, marginBottom: rem(5), marginTop: 0 },
            thumb: {
              height: rem(16),
              width: rem(16),
              backgroundColor: theme.white,
              borderWidth: rem(1),
              boxShadow: theme.shadows.sm
            }
          })}
        />
      </div>
    </div>
  )
}

export default Tracks
