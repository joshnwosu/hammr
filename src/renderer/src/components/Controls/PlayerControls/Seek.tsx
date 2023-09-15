import { Flex, Slider, Text, rem } from '@mantine/core'
import pcManager from '@renderer/core/PlayerControlManager'
import { usePlayerStore } from '@renderer/store/playerStore/playerStore'
import trackUtils from '@renderer/utils/TrackUtils'

export default function Seek() {
  const { playerStatus } = usePlayerStore((state) => state)
  const { currentTime, duration, seekPosition } = playerStatus
  return (
    <>
      <Flex gap={'sm'} align={'center'} justify={'center'} w={'100%'}>
        <Text size={'xs'}>{trackUtils.formatDuration(currentTime)}</Text>

        <Slider
          value={seekPosition || 0}
          labelTransition="skew-down"
          labelTransitionDuration={150}
          labelTransitionTimingFunction="ease"
          label={trackUtils.formatDuration(currentTime)}
          w={'60%'}
          onChange={(value) => {
            pcManager.pause()
            pcManager.seekBar(value)
          }}
          onChangeEnd={() => pcManager.play()}
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
    </>
  )
}
