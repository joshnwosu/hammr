import { ActionIcon, Flex, Slider, Text, Tooltip, rem } from '@mantine/core'
import pcManager from '@renderer/core/PlayerControlManager'
import { usePlayerStore } from '@renderer/store/playerStore/playerStore'
import { RepeatEnum } from '@renderer/store/playerStore/types'
import trackUtils from '@renderer/utils/TrackUtils'
import { useEffect, useState } from 'react'
import {
  TbPlayerPause,
  TbPlayerPlay,
  TbArrowsShuffle,
  TbRepeat,
  TbRepeatOnce,
  TbPlayerTrackPrev,
  TbPlayerTrackNext,
  TbPlayerSkipBack,
  TbPlayerSkipForward
} from 'react-icons/tb'

export default function PlaybackControls() {
  const { playerStatus, trackFile } = usePlayerStore((state) => state)

  const { playing, shuffle, repeat, duration, audio } = playerStatus

  //   const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0)
  const [seekPosition, setSeekPosition] = useState(0)
  const [isSeeking, setIsSeeking] = useState(false)

  useEffect(() => {
    // let animationFrameId: number
    function handleTimeUpdate() {
      if (!audio || !audio.duration) return

      const newTime = audio.currentTime
      const newSeekPosition = (newTime / audio.duration) * 100

      setCurrentTime(newTime)
      setSeekPosition(newSeekPosition)

      //   animationFrameId = requestAnimationFrame(handleTimeUpdate)
    }

    // Attach the timeupdate event listener
    audio.addEventListener('timeupdate', handleTimeUpdate)
    // animationFrameId = requestAnimationFrame(handleTimeUpdate)

    // Cleanup when the component unmounts
    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      //   cancelAnimationFrame(animationFrameId)
    }
  }, [isSeeking])

  // Function to handle seek bar changes
  function handleSeekBarChange(event) {
    const newSeekPosition = parseFloat(event.target.value)
    const newTime = (newSeekPosition / 100) * audio.duration

    setSeekPosition(newSeekPosition)
    setCurrentTime(newTime)

    // Seek to the new time in the audio
    audio.currentTime = newTime
  }

  return (
    <Flex
      style={{
        height: '100%'
      }}
      align={'center'}
      justify={'space-between'}
      direction={'column'}
      gap={5}
    >
      {/* <Text>{currentTime}</Text> */}
      <Flex gap={'sm'} align={'center'}>
        <Tooltip
          label={shuffle ? 'Disable shuffle' : 'Enable shuffle'}
          fz={'xs'}
          fw={600}
          color="gray"
        >
          <ActionIcon
            variant="default"
            size={'lg'}
            radius={'xl'}
            onClick={() => pcManager.shuffleTrack()}
            disabled={trackFile == ''}
          >
            {shuffle ? (
              <TbArrowsShuffle size={'1rem'} strokeWidth={2} color={'#1FDF64'} />
            ) : (
              <TbArrowsShuffle size={'1rem'} strokeWidth={2} />
            )}
          </ActionIcon>
        </Tooltip>

        <Tooltip label={'Previous'} fz={'xs'} fw={600} color="gray">
          <ActionIcon
            variant="default"
            size={'lg'}
            radius={'xl'}
            onClick={() => pcManager.previousTrack()}
            disabled={trackFile == ''}
          >
            <TbPlayerSkipBack size={'1rem'} strokeWidth={2} />
          </ActionIcon>
        </Tooltip>

        <Tooltip label={'Step backward'} fz={'xs'} fw={600} color="gray">
          <ActionIcon
            variant="default"
            size={'lg'}
            radius={'xl'}
            onClick={() => pcManager.stepBackward()}
            disabled={trackFile == ''}
          >
            <TbPlayerTrackPrev size={'1rem'} strokeWidth={2} />
          </ActionIcon>
        </Tooltip>

        <Tooltip label={playing ? 'Pause' : 'Play'} fz={'xs'} fw={600} color="gray">
          <ActionIcon
            variant="default"
            size={'xl'}
            radius={'xl'}
            onClick={() => pcManager.togglePlaying()}
            // disabled={trackFile == ''}
          >
            {playing ? (
              <TbPlayerPause size={'1.5rem'} strokeWidth={2} />
            ) : (
              <TbPlayerPlay size={'1.5rem'} strokeWidth={2} />
            )}
          </ActionIcon>
        </Tooltip>

        <Tooltip label={'Step forward'} fz={'xs'} fw={600} color="gray">
          <ActionIcon
            variant="default"
            size={'lg'}
            radius={'xl'}
            onClick={() => pcManager.stepForward()}
            disabled={trackFile == ''}
          >
            <TbPlayerTrackNext size={'1rem'} strokeWidth={2} />
          </ActionIcon>
        </Tooltip>

        <Tooltip label={'Next'} fz={'xs'} fw={600} color="gray">
          <ActionIcon
            variant="default"
            size={'lg'}
            radius={'xl'}
            onClick={() => pcManager.nextTrack()}
            disabled={trackFile == ''}
          >
            <TbPlayerSkipForward size={'1rem'} strokeWidth={2} />
          </ActionIcon>
        </Tooltip>

        <Tooltip
          label={
            repeat === RepeatEnum.Off
              ? 'Enable repeat'
              : repeat === RepeatEnum.All
              ? 'Enable repeat one'
              : 'Disable repeat'
          }
          fz={'xs'}
          fw={600}
          color="gray"
        >
          <ActionIcon
            variant="default"
            size={'lg'}
            radius={'xl'}
            onClick={() => pcManager.repeatTrack()}
            disabled={trackFile == ''}
          >
            {repeat === RepeatEnum.Off && <TbRepeat size={'1rem'} strokeWidth={2} />}
            {repeat === RepeatEnum.All && (
              <TbRepeat size={'1rem'} strokeWidth={2} color="#1FDF64" />
            )}
            {repeat === RepeatEnum.One && (
              <TbRepeatOnce size={'1rem'} strokeWidth={2} color="#1FDF64" />
            )}
          </ActionIcon>
        </Tooltip>
      </Flex>

      <Flex gap={'sm'} align={'center'} justify={'center'} w={'100%'}>
        <Text size={'xs'}>{trackUtils.formatDuration(currentTime)}</Text>

        {/* <input
          type="range"
          min="0"
          max="100"
          value={seekPosition}
          onChange={handleSeekBarChange}
          onMouseDown={() => setIsSeeking(true)}
          onMouseUp={() => setIsSeeking(false)}
        /> */}

        <Slider
          value={seekPosition || 0}
          labelTransition="skew-down"
          labelTransitionDuration={150}
          labelTransitionTimingFunction="ease"
          label={trackUtils.formatDuration(currentTime)}
          w={'60%'}
          onChange={(value) => {
            // pcManager.pause()
            // pcManager.seekBar(value)
            setIsSeeking(true)
            handleSeekBarChange(value)
          }}
          onChangeEnd={() => {
            // pcManager.play()
            setIsSeeking(false)
          }}
          size={3.5}
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

        <Text size={'xs'}>{trackUtils.formatDuration(duration)}</Text>
      </Flex>
    </Flex>
  )
}
