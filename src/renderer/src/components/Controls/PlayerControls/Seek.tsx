import { Flex, Slider, Text, rem } from '@mantine/core'
// @ts-ignore
import pcManager from '@renderer/core/PlayerControlManager'
import { usePlayerStore } from '@renderer/store/playerStore/playerStore'
import trackUtils from '@renderer/utils/TrackUtils'
import { useEffect, useState } from 'react'

export default function Seek() {
  const { playerStatus } = usePlayerStore((state) => state)
  const { duration, audio } = playerStatus

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
  function handleSeekBarChange(value) {
    const newSeekPosition = parseFloat(value)
    const newTime = (newSeekPosition / 100) * audio.duration

    setSeekPosition(newSeekPosition)
    setCurrentTime(newTime)

    // Seek to the new time in the audio
    audio.currentTime = newTime
  }

  return (
    <>
      <Flex gap={0} align={'center'} justify={'center'} w={'100%'}>
        <Text w={50} size={'xs'} align={'left'}>
          {trackUtils.formatDuration(currentTime)}
        </Text>

        <Slider
          // value={seekPosition || 0}
          labelTransition="skew-down"
          labelTransitionDuration={150}
          labelTransitionTimingFunction="ease"
          label={trackUtils.formatDuration(currentTime)}
          w={'60%'}
          // onChange={(value) => {
          //   // pcManager.pause()
          //   // pcManager.seekBar(value)
          //   setIsSeeking(true)
          //   handleSeekBarChange(value)
          // }}
          // onChangeEnd={() => {
          //   // pcManager.play()
          //   setIsSeeking(false)
          // }}
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

        <Text w={50} size={'xs'} align={'right'}>
          {trackUtils.formatDuration(duration)}
        </Text>
      </Flex>
    </>
  )
}
