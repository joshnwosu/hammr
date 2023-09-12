import { ActionIcon, Flex, Slider, Text, rem } from '@mantine/core'
import pcManager from '@renderer/core/PlayerControlManager'
import { usePlayerStore } from '@renderer/store/playerStore/playerStore'
import { RepeatEnum } from '@renderer/store/playerStore/types'
import trackUtils from '@renderer/utils/TrackUtils'
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
  const { playerStatus } = usePlayerStore((state) => state)

  const { playing, shuffle, repeat, currentTime, duration, seekPosition } = playerStatus
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
      <Flex gap={'sm'} align={'center'}>
        <ActionIcon
          variant="default"
          size={'lg'}
          radius={'xl'}
          onClick={() => pcManager.shuffleTrack()}
        >
          {shuffle ? (
            <TbArrowsShuffle size={'1rem'} strokeWidth={2} color={'#1FDF64'} />
          ) : (
            <TbArrowsShuffle size={'1rem'} strokeWidth={2} />
          )}
        </ActionIcon>

        <ActionIcon
          variant="default"
          size={'lg'}
          radius={'xl'}
          onClick={() => pcManager.previousTrack()}
        >
          <TbPlayerSkipBack size={'1rem'} strokeWidth={2} />
        </ActionIcon>
        <ActionIcon
          variant="default"
          size={'lg'}
          radius={'xl'}
          onClick={() => pcManager.stepBackward()}
        >
          <TbPlayerTrackPrev size={'1rem'} strokeWidth={2} />
        </ActionIcon>
        <ActionIcon
          variant="default"
          size={'xl'}
          radius={'xl'}
          onClick={() => pcManager.togglePlaying()}
        >
          {playing ? (
            <TbPlayerPause size={'1.5rem'} strokeWidth={2} />
          ) : (
            <TbPlayerPlay size={'1.5rem'} strokeWidth={2} />
          )}
        </ActionIcon>
        <ActionIcon
          variant="default"
          size={'lg'}
          radius={'xl'}
          onClick={() => pcManager.stepForward()}
        >
          <TbPlayerTrackNext size={'1rem'} strokeWidth={2} />
        </ActionIcon>
        <ActionIcon
          variant="default"
          size={'lg'}
          radius={'xl'}
          onClick={() => pcManager.nextTrack()}
        >
          <TbPlayerSkipForward size={'1rem'} strokeWidth={2} />
        </ActionIcon>

        <ActionIcon
          variant="default"
          size={'lg'}
          radius={'xl'}
          onClick={() => pcManager.repeatTrack()}
        >
          {repeat === RepeatEnum.Off && <TbRepeat size={'1rem'} strokeWidth={2} />}
          {repeat === RepeatEnum.All && <TbRepeat size={'1rem'} strokeWidth={2} color="#1FDF64" />}
          {repeat === RepeatEnum.One && (
            <TbRepeatOnce size={'1rem'} strokeWidth={2} color="#1FDF64" />
          )}
        </ActionIcon>
      </Flex>

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

        <Text size={'xs'}>{trackUtils.formatDuration(duration)}</Text>
      </Flex>
    </Flex>
  )
}
